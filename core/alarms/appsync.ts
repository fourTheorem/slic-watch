'use strict'

import { CfResource, CloudFormationTemplate }  from '../cf-template'
import { Context, createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"


export type AppSyncAlarmConfig = AlarmProperties & {
  '5XXError': AlarmProperties
  Latency: AlarmProperties
}

export type AppSyncAlarm= AlarmProperties & {
  appSyncResourceName: string 
}

/**
 * appSyncAlarmProperties The fully resolved alarm configuration
 */
export default function appSyncAlarms (appSyncAlarmProperties: AppSyncAlarmConfig, context: Context) {
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
      if (appSyncAlarmProperties['5XXError'].ActionsEnabled) {
        alarms.push(create5XXAlarm(
          appSyncResourceName,
          appSyncResource,
          appSyncAlarmProperties['5XXError']
        ))
      }

      if (appSyncAlarmProperties.Latency.ActionsEnabled) {
        alarms.push(createLatencyAlarm(
          appSyncResourceName,
          appSyncResource,
          appSyncAlarmProperties.Latency
        ))
      }
      for (const alarm of alarms) {
        cfTemplate.addResource(alarm.resourceName, alarm.resource)
      }
    }
  }

  function create5XXAlarm (appSyncResourceName: string, appSyncResource: CfResource, config: AlarmProperties) {
    const graphQLName = appSyncResource.Properties.Name
    const threshold = config.Threshold
    const appSyncAlarmProperties:AppSyncAlarm = {
      AlarmName:`AppSync5XXErrorAlarm_${graphQLName}` ,
      AlarmDescription: `AppSync 5XX Error ${getStatisticName(config)} for ${graphQLName} breaches ${threshold}`,
      appSyncResourceName, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: '5XXError',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/AppSync',
      Dimensions: [
        { Name: 'GraphQLAPIId', Value: `\${$appSyncResourceName.ApiId}` }
      ]
    }
    return {
      // @ts-ignore
      resourceName: makeResourceName('AppSync', graphQLName, '5XXError'),
      resource: createAlarm(appSyncAlarmProperties, context)
    }
  }

  function createLatencyAlarm (appSyncResourceName: string, appSyncResource: CfResource, config: AlarmProperties) {
    const graphQLName = appSyncResource.Properties.Name
    const threshold = config.Threshold
    const appSyncAlarmProperties:AppSyncAlarm = {
      AlarmName:`AppSyncLatencyAlarm_${graphQLName}` ,
      AlarmDescription: `AppSync Latency ${getStatisticName(config)} for ${graphQLName} breaches ${threshold}`,
      appSyncResourceName, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'Latency',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/AppSync',
      Dimensions: [
        { Name: 'GraphQLAPIId', Value: `\${$appSyncResourceName.ApiId}` }
      ]
    }
    return {
      // @ts-ignore
      resourceName: makeResourceName('AppSync', graphQLName, 'Latency'),
      resource: createAlarm(appSyncAlarmProperties, context)
    }
  }
}
