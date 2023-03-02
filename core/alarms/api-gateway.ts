'use strict'

import { getResourcesByType, addResource, ResourceType } from '../cf-template'
import { Context, createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import Resource from 'cloudform-types/types/resource'
import Template from 'cloudform-types/types/template'

export type ApiGwAlarmProperties = AlarmProperties &{
  '5XXError': AlarmProperties
  '4XXError': AlarmProperties
  Latency: AlarmProperties
}

export type ApiAlarm= AlarmProperties & {
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
export function resolveRestApiNameAsCfn (restApiResource, restApiLogicalId: string) {
  const apiName = restApiResource.Properties.Name || restApiResource.Properties?.Body?.info?.title
  if (!apiName) {
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
export function resolveRestApiNameForSub (restApiResource, restApiLogicalId: string) {
  const name = restApiResource.Properties.Name || restApiResource.Properties.Body?.info?.title
  if (!name) {
    throw new Error(`No API name specified for REST API ${restApiLogicalId}. Either Name or Body.info.title should be specified`)
  }

  if (name.GetAtt) {
    return `\${${name.GetAtt[0]}.${name.GetAtt[1]}}`
  } else if (name.Ref) {
    return `\${${name.Ref}}`
  } else if (name['Fn::Sub']) {
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
      const alarms = []

      if (apiGwAlarmProperties['5XXError'].ActionsEnabled) {
        alarms.push(create5XXAlarm(
          apiResourceName,
          apiResource,
          apiGwAlarmProperties['5XXError']
        ))
      }

      if (apiGwAlarmProperties['4XXError'].ActionsEnabled) {
        alarms.push(create4XXAlarm(
          apiResourceName,
          apiResource,
          apiGwAlarmProperties['4XXError']
        ))
      }

      if (apiGwAlarmProperties.Latency.ActionsEnabled) {
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

  function create5XXAlarm (apiResourceName: string, apiResource: Resource, config: AlarmProperties) {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    const apiAlarmProperties:ApiAlarm = {
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

  function create4XXAlarm (apiResourceName: string, apiResource: Resource, config: AlarmProperties) {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    const apiAlarmProperties:ApiAlarm = {
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

  function createLatencyAlarm (apiResourceName: string, apiResource: Resource, config: AlarmProperties) {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    const apiAlarmProperties:ApiAlarm = {
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
