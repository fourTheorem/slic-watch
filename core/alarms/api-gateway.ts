import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm, getStatisticName, makeAlarmLogicalId } from './alarm-utils'
import { getResourceAlarmConfigurationsByType } from '../cf-template'

export type SlicWatchApiGwAlarmsConfig<T extends InputOutput> = T & {
  '5XXError': T
  '4XXError': T
  Latency: T
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
 *
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
 *
 * @returns Literal string or Sub variable syntax
 */
export function resolveRestApiNameForSub (restApiResource: Resource, restApiLogicalId: string): string {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const name = (restApiResource.Properties?.Name) || (restApiResource.Properties?.Body?.info?.title)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!name) {
    throw new Error(`No API name specified for REST API ${restApiLogicalId}. Either Name or Body.info.title should be specified`)
  }

  if (name.GetAtt != null) {
    return `\${${name.GetAtt[0]}.${name.GetAtt[1]}}`
  } else if (name.Ref != null) {
    return `\${${name.Ref}}`
  } else if (name['Fn::Sub'] != null) {
    return name['Fn::Sub']
  }
  return name
}

const executionMetrics = ['5XXError', '4XXError', 'Latency']

/**
 * Add all required API Gateway REST API alarms to the provided CloudFormation template based on the resources found within
 *
 * @param apiGwAlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns API Gateway-specific CloudFormation Alarm resources
 */
export default function createApiGatewayAlarms (
  apiGwAlarmsConfig: SlicWatchApiGwAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  const resources: CloudFormationResources = {}
  const configuredResources = getResourceAlarmConfigurationsByType('AWS::ApiGateway::RestApi', compiledTemplate, apiGwAlarmsConfig)

  for (const [apiLogicalId, apiResource] of Object.entries(configuredResources.resources)) {
    for (const metric of executionMetrics) {
      const mergedConfig: SlicWatchMergedConfig = configuredResources.alarmConfigurations[apiLogicalId][metric]
      if (mergedConfig.enabled) {
        const { enabled, ...rest } = mergedConfig
        const apiName = resolveRestApiNameAsCfn(apiResource, apiLogicalId)
        const apiNameForSub = resolveRestApiNameForSub(apiResource, apiLogicalId)
        const apiAlarmProperties: AlarmProperties = {
          AlarmName: Fn.Sub(`ApiGW_${metric}_${apiNameForSub}`, {}),
          AlarmDescription: Fn.Sub(`API Gateway ${metric} ${getStatisticName(mergedConfig)} for ${apiNameForSub} breaches ${mergedConfig.Threshold}`, {}),
          MetricName: metric,
          Namespace: 'AWS/ApiGateway',
          Dimensions: [{ Name: 'ApiName', Value: apiName }],
          ...rest
        }
        const alarmLogicalId = makeAlarmLogicalId('Api', apiNameForSub, metric)
        const resource = createAlarm(apiAlarmProperties, alarmActionsConfig)
        resources[alarmLogicalId] = resource
      }
    }
  }
  return resources
}
