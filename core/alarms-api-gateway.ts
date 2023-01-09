'use strict'

import { makeResourceName, getStatisticName, resolveRestApiNameAsCfn, resolveRestApiNameForSub } from './util'
import { CloudFormationTemplate } from "./cf-template.d";
import { AlarmConfig, Context } from './default-config-alarms'

export type ApiGwAlarmConfig = {
  config?: AlarmConfig
  '5XXError': AlarmConfig
  '4XXError': AlarmConfig
  Latency: AlarmConfig
}

/**
 * apiGwAlarmConfig The fully resolved alarm configuration
 */
export default function ApiGatewayAlarms (apiGwAlarmConfig:ApiGwAlarmConfig ,  context: Context) {
  return {
    createApiGatewayAlarms
  }

  /**
   * Add all required API Gateway alarms to the provided CloudFormation template
   * based on the resources found within
   *A CloudFormation template object
   */
  function createApiGatewayAlarms (cfTemplate:CloudFormationTemplate) {
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

  function createApiAlarm (
    alarmName: string,
    alarmDescription: string,
    apiName: string,
    comparisonOperator: string,
    threshold: number,
    metricName: string,
    statistic: string,
    period: number,
    extendedStatistic: string,
    evaluationPeriods: number,
    treatMissingData: string
  ) {
    const metricProperties = {
      Dimensions: [{ Name: 'ApiName', Value: apiName }],
      MetricName: metricName,
      Namespace: 'AWS/ApiGateway',
      Period: period,
      Statistic: statistic,
      ExtendedStatistic: extendedStatistic
    }

    return {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: context.alarmActions,
        AlarmName: alarmName,
        AlarmDescription: alarmDescription,
        EvaluationPeriods: evaluationPeriods,
        ComparisonOperator: comparisonOperator,
        Threshold: threshold,
        TreatMissingData: treatMissingData,
        ...metricProperties
      }
    }
  }

  function create5XXAlarm (apiResourceName: string, apiResource, config) {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('Api', apiName, 'Availability'),
      resource: createApiAlarm(
         // @ts-ignore
        { 'Fn::Sub': `APIGW_5XXError_${apiNameForSub}` },
        { 'Fn::Sub': `API Gateway 5XXError ${getStatisticName(config)} for ${apiNameForSub} breaches ${threshold}` },
        apiName,
        config.ComparisonOperator,
        threshold,
        '5XXError',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function create4XXAlarm (apiResourceName: string, apiResource, config) {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('Api', apiName, '4XXError'),
      resource: createApiAlarm(
         // @ts-ignore
        { 'Fn::Sub': `APIGW_4XXError_${apiNameForSub}` },
        { 'Fn::Sub': `API Gateway 4XXError ${getStatisticName(config)} for ${apiNameForSub} breaches ${threshold}` },
        apiName,
        config.ComparisonOperator,
        threshold,
        '4XXError',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createLatencyAlarm (apiResourceName: string, apiResource, config) {
    const apiName = resolveRestApiNameAsCfn(apiResource, apiResourceName)
    const apiNameForSub = resolveRestApiNameForSub(apiResource, apiResourceName)
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('Api', apiName, 'Latency'),
      resource: createApiAlarm(
         // @ts-ignore
        { 'Fn::Sub': `APIGW_Latency_${apiNameForSub}` },
        { 'Fn::Sub': `API Gateway Latency ${getStatisticName(config)} for ${apiNameForSub} breaches ${threshold}` },
        apiName,
        config.ComparisonOperator,
        threshold,
        'Latency',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }
}
