'use strict'

import { CfResource, CloudFormationTemplate } from '../cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'

export type ApiGwAlarmConfig = {
  enabled?: boolean
  '5XXError': AlarmConfig
  '4XXError': AlarmConfig
  Latency: AlarmConfig
}

export type ApiAlarm= Alarm & {
  apiName: string
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
 * apiGwAlarmConfig The fully resolved alarm configuration
 */
export default function ApiGatewayAlarms (apiGwAlarmConfig: ApiGwAlarmConfig, context: Context) {
  return {
    createApiGatewayAlarms
  }

  /**
   * Add all required API Gateway alarms to the provided CloudFormation template
   * based on the resources found within
   *A CloudFormation template object
   */
  function createApiGatewayAlarms (cfTemplate: CloudFormationTemplate) {
    const apiResources = cfTemplate.getResourcesByType(
      'AWS::ApiGateway::RestApi'
    )

    for (const [apiResourceName, apiResource] of Object.entries(apiResources)) {
      const alarms = []

      if (apiGwAlarmConfig['5XXError'].enabled) {
        alarms.push(create5XXAlarm(
          apiResourceName,
          apiResource,
          apiGwAlarmConfig['5XXError']
        ))
      }

      if (apiGwAlarmConfig['4XXError'].enabled) {
        alarms.push(create4XXAlarm(
          apiResourceName,
          apiResource,
          apiGwAlarmConfig['4XXError']
        ))
      }

      if (apiGwAlarmConfig.Latency.enabled) {
        alarms.push(createLatencyAlarm(
          apiResourceName,
          apiResource,
          apiGwAlarmConfig.Latency
        ))
      }

      for (const alarm of alarms) {
        cfTemplate.addResource(alarm.resourceName, alarm.resource)
      }
    }
  }

  function create5XXAlarm (apiResourceName: string, apiResource: CfResource, config: AlarmConfig) {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    const apiAlarmConfig:ApiAlarm = {
      alarmName: { 'Fn::Sub': `APIGW_5XXError_${apiNameForSub}` } ,
      alarmDescription: { 'Fn::Sub': `API Gateway 5XXError ${getStatisticName(config)} for ${apiNameForSub} breaches ${threshold}` },
      apiName, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: '5XXError',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/ApiGateway',
      dimensions: [{ Name: 'ApiName', Value: apiName }]
    } 
    return {
      resourceName: makeResourceName('Api', apiName, 'Availability'),
      resource: createAlarm(apiAlarmConfig, context)
    }
  }

  function create4XXAlarm (apiResourceName: string, apiResource: CfResource, config: AlarmConfig) {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    const apiAlarmConfig:ApiAlarm = {
      alarmName: { 'Fn::Sub': `APIGW_4XXError_${apiNameForSub}` } ,
      alarmDescription: { 'Fn::Sub': `API Gateway 4XXError ${getStatisticName(config)} for ${apiNameForSub} breaches ${threshold}` },
      apiName, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: '4XXError',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/ApiGateway',
      dimensions: [{ Name: 'ApiName', Value: apiName }]
    }
    return {
      resourceName: makeResourceName('Api', apiName, '4XXError'),
      resource: createAlarm(apiAlarmConfig, context)
    }
  }

  function createLatencyAlarm (apiResourceName: string, apiResource: CfResource, config: AlarmConfig) {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    const apiAlarmConfig:ApiAlarm = {
      alarmName: { 'Fn::Sub': `APIGW_Latency_${apiNameForSub}` } ,
      alarmDescription: { 'Fn::Sub': `API Gateway Latency ${getStatisticName(config)} for ${apiNameForSub} breaches ${threshold}` },
      apiName, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'Latency',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/ApiGateway',
      dimensions: [{ Name: 'ApiName', Value: apiName }]
    }
    return {
      resourceName: makeResourceName('Api', apiName, 'Latency'),
      resource: createAlarm(apiAlarmConfig, context)
    }
  }
}
