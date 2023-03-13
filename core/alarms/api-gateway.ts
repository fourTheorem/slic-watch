'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type ReturnAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
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

export type ApiAlarm = AlarmProperties & {
  ApiName: string
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

/**
 * apiGwAlarmProperties The fully resolved alarm configuration
 */
export default function createApiGatewayAlarms (apiGwAlarmProperties: ApiGwAlarmProperties, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required API Gateway alarms to the provided CloudFormation template
   * based on the resources found within
   *A CloudFormation template object
   */
  const apiResources = getResourcesByType('AWS::ApiGateway::RestApi', compiledTemplate, additionalResources)

  for (const [apiResourceName, apiResource] of Object.entries(apiResources)) {
    const alarms: any = []

    if (apiGwAlarmProperties['5XXError'].enabled === true) {
      alarms.push(create5XXAlarm(
        apiResourceName,
        apiResource,
        apiGwAlarmProperties['5XXError']
      ))
    }

    if (apiGwAlarmProperties['4XXError'].enabled === true) {
      alarms.push(create4XXAlarm(
        apiResourceName,
        apiResource,
        apiGwAlarmProperties['4XXError']
      ))
    }

    if (apiGwAlarmProperties.Latency.enabled === true) {
      alarms.push(createLatencyAlarm(
        apiResourceName,
        apiResource,
        apiGwAlarmProperties.Latency
      ))
    }

    for (const alarm of alarms) {
      addResource(alarm.resourceName, alarm.resource, compiledTemplate)
    }
  }

  function create5XXAlarm (apiResourceName: string, apiResource: Resource, config: DefaultAlarmsProperties): ReturnAlarm {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    const apiAlarmProperties: ApiAlarm = {
      AlarmName: `APIGW_5XXError_${apiNameForSub}`,
      AlarmDescription: `API Gateway 5XXError ${getStatisticName(config)} for ${apiNameForSub} breaches ${threshold}`,
      ApiName: apiName,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: '5XXError',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ApiGateway',
      Dimensions: [{ Name: 'ApiName', Value: apiName }]
    }
    return {
      resourceName: makeResourceName('Api', apiName, 'Availability'),
      resource: createAlarm(apiAlarmProperties, context)
    }
  }

  function create4XXAlarm (apiResourceName: string, apiResource: Resource, config: DefaultAlarmsProperties): ReturnAlarm {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    const apiAlarmProperties: ApiAlarm = {
      AlarmName: `APIGW_4XXError_${apiNameForSub}`,
      AlarmDescription: `API Gateway 4XXError ${getStatisticName(config)} for ${apiNameForSub} breaches ${threshold}`,
      ApiName: apiName,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: '4XXError',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ApiGateway',
      Dimensions: [{ Name: 'ApiName', Value: apiName }]
    }
    return {
      resourceName: makeResourceName('Api', apiName, '4XXError'),
      resource: createAlarm(apiAlarmProperties, context)
    }
  }

  function createLatencyAlarm (apiResourceName: string, apiResource: Resource, config: DefaultAlarmsProperties): ReturnAlarm {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    const apiAlarmProperties: ApiAlarm = {
      AlarmName: `APIGW_Latency_${apiNameForSub}`,
      AlarmDescription: `API Gateway Latency ${getStatisticName(config)} for ${apiNameForSub} breaches ${threshold}`,
      ApiName: apiName,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'Latency',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ApiGateway',
      Dimensions: [{ Name: 'ApiName', Value: apiName }]
    }
    return {
      resourceName: makeResourceName('Api', apiName, 'Latency'),
      resource: createAlarm(apiAlarmProperties, context)
    }
  }
}
