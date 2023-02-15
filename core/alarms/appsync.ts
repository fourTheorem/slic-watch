'use strict'

import { makeResourceName, getStatisticName } from '../util'
import { CfResource, CloudFormationTemplate, Statistic }  from '../cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'


export type AppSyncAlarmConfig = {
  enabled?: boolean
  '5XXError': AlarmConfig
  Latency: AlarmConfig
}

export type AppSyncAlarm= Alarm & {
  appSyncResourceName: string 
}

/**
 * appSyncAlarmConfig The fully resolved alarm configuration
 */
export default function appSyncAlarms (appSyncAlarmConfig: AppSyncAlarmConfig, context: Context) {
  return {
    createAppSyncAlarms
  }

  /**
   * Add all required AppSync alarms to the provided CloudFormation template
   * based on the AppSync resources found within
   *
   * A CloudFormation template object
   */
  function createAppSyncAlarms (cfTemplate: CloudFormationTemplate) {
    const appSyncResources = cfTemplate.getResourcesByType(
      'AWS::AppSync::GraphQLApi'
    )

    for (const [appSyncResourceName, appSyncResource] of Object.entries(appSyncResources)) {
      const alarms = []
      if (appSyncAlarmConfig['5XXError'].enabled) {
        alarms.push(create5XXAlarm(
          appSyncResourceName,
          appSyncResource,
          appSyncAlarmConfig['5XXError']
        ))
      }

      if (appSyncAlarmConfig.Latency.enabled) {
        alarms.push(createLatencyAlarm(
          appSyncResourceName,
          appSyncResource,
          appSyncAlarmConfig.Latency
        ))
      }
      for (const alarm of alarms) {
        cfTemplate.addResource(alarm.resourceName, alarm.resource)
      }
    }
  }

  function create5XXAlarm (appSyncResourceName: string, appSyncResource: CfResource, config: AlarmConfig) {
    const graphQLName = appSyncResource.Properties.Name
    const threshold = config.Threshold
    const appSyncAlarmConfig:AppSyncAlarm = {
      alarmName:`AppSync5XXErrorAlarm_${graphQLName}` ,
      alarmDescription: `AppSync 5XX Error ${getStatisticName(config)} for ${graphQLName} breaches ${threshold}`,
      appSyncResourceName, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: '5XXError',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/AppSync',
      dimensions: [
        { Name: 'GraphQLAPIId', Value: { 'Fn::GetAtt': [appSyncResourceName, 'ApiId'] } }
      ]
    }
    return {
      resourceName: makeResourceName('AppSync', graphQLName, '5XXError'),
      resource: createAlarm(appSyncAlarmConfig, context)
    }
  }

  function createLatencyAlarm (appSyncResourceName: string, appSyncResource: CfResource, config: AlarmConfig) {
    const graphQLName = appSyncResource.Properties.Name
    const threshold = config.Threshold
    const appSyncAlarmConfig:AppSyncAlarm = {
      alarmName:`AppSyncLatencyAlarm_${graphQLName}` ,
      alarmDescription: `AppSync Latency ${getStatisticName(config)} for ${graphQLName} breaches ${threshold}`,
      appSyncResourceName, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'Latency',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/AppSync',
      dimensions: [
        { Name: 'GraphQLAPIId', Value: { 'Fn::GetAtt': [appSyncResourceName, 'ApiId'] } }
      ]
    }
    return {
      resourceName: makeResourceName('AppSync', graphQLName, 'Latency'),
      resource: createAlarm(appSyncAlarmConfig, context)
    }
  }
}
