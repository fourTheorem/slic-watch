'use strict'

import { getResourcesByType, addResource } from '../cf-template'
import { type Context, createAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

export interface ApiGwAlarmProperties {
  enabled?: boolean
  '5XXError': DefaultAlarmsProperties
  '4XXError': DefaultAlarmsProperties
  Latency: DefaultAlarmsProperties
}

/**
 * Given a CloudFormation resource for an API Gateway REST API, derive CloudFormation syntax for
 * the API name.
 * The API name can be provided as a `Name` property or in the OpenAPI specification as
 * `Body.info.title`
 *
 * In either case, the name can be a string literal or use a CloudFormation intrinsic function
 * (Sub, Ref or GetAtt)
 *
 * @param restApiResource CloudFormation resource for a REST API
 * @param restApiLogicalId The logical ID for the resouce
 * @returns CloudFormation syntax for the API name
 */
export function resolveRestApiNameAsCfn (restApiResource: Resource, restApiLogicalId: string) {
  const apiName = restApiResource.Properties?.Name ?? restApiResource.Properties?.Body?.info?.title
  if (apiName === undefined) {
    throw new Error(`No API name specified for REST API ${restApiLogicalId}. Either Name or Body.info.title should be specified`)
  }
  return apiName
}

/**
 * Given a CloudFormation resource for an API Gateway REST API, derive a string value or
 * CloudFormation 'Fn::Sub' variable syntax for the cluster's name
 *
 * The API name can be provided as a `Name` property or in the OpenAPI specification as
 * `Body.info.title`
 *
 * In either case, the name can be a string literal or use a CloudFormation intrinsic function
 * (Sub, Ref or GetAtt)
 *
 * @param restApiResource CloudFormation resource for a REST API
 * @param restApiLogicalId The logical ID for the resouce
 * @returns Literal string or Sub variable syntax
 */
export function resolveRestApiNameForSub (restApiResource: Resource, restApiLogicalId: string) {
  const name = (restApiResource.Properties?.Name) ?? (restApiResource.Properties?.Body?.info?.title)
  if (name === false) {
    throw new Error(`No API name specified for REST API ${restApiLogicalId}. Either Name or Body.info.title should be specified`)
  }

  if (name.GetAtt != null && name.GetAtt[1] === 'Arn') {
    return { Ref: name.GetAtt[0] }
  } else if (name.Ref != null) {
    return { Ref: name.Ref }
  } else if (name['Fn::Sub'] != null) {
    return name['Fn::Sub']
  }
  return name
}
type ApiMetrics = '5XXError' | '4XXError' | 'Latency'

const executionMetrics: ApiMetrics[] = [
  '5XXError',
  '4XXError',
  'Latency'
]

/**
 * apiGwAlarmProperties The fully resolved alarm configuration
 */
export default function createApiGatewayAlarms (apiGwAlarmProperties: ApiGwAlarmProperties, context: Context, compiledTemplate: Template): void {
  /**
   * Add all required API Gateway alarms to the provided CloudFormation template
   * based on the resources found within
   *A CloudFormation template object
   */
  const apiResources = getResourcesByType('AWS::ApiGateway::RestApi', compiledTemplate)

  for (const [apiResourceName, apiResource] of Object.entries(apiResources)) {
    for (const metric of executionMetrics) {
      const config = apiGwAlarmProperties[metric]
      console.log(metric)
      if (config.enabled !== false) {
        delete config.enabled
        const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
        const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
        const apiAlarmProperties: AlarmProperties = {
          AlarmName: `APIGW_${metric}_${apiNameForSub}`,
          AlarmDescription: `API Gateway ${metric} ${getStatisticName(config)} for ${apiNameForSub} breaches ${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/ApiGateway',
          Dimensions: [{ Name: 'ApiName', Value: apiName }],
          ...config
        }
        const resourceName = makeResourceName('Api', apiName, metric)
        const resource = createAlarm(apiAlarmProperties, context)
        addResource(resourceName, resource, compiledTemplate)
      }
    }
  }
}
