'use strict'

import { makeResourceName, getStatisticName, resolveRestApiNameAsCfn, resolveRestApiNameForSub } from '../utils/util'
import { CfResource, CloudFormationTemplate, Statistic } from '../utils/cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'

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
