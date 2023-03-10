'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type ReturnAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

export type AppSyncAlarmProperties = AlarmProperties & {
  '5XXError': AlarmProperties
  Latency: AlarmProperties
}

export type AppSyncAlarm = AlarmProperties & {
  AppSyncResourceName: string
}

/**
 * appSyncAlarmProperties The fully resolved alarm configuration
 */
export default function createAppSyncAlarms (appSyncAlarmProperties: AppSyncAlarmProperties, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required AppSync alarms to the provided CloudFormation template
   * based on the AppSync resources found within
   *
   * A CloudFormation template object
   */
  const appSyncResources = getResourcesByType('AWS::AppSync::GraphQLApi', compiledTemplate, additionalResources)

  for (const [appSyncResourceName, appSyncResource] of Object.entries(appSyncResources)) {
    const alarms: any = []
    if (appSyncAlarmProperties['5XXError'].ActionsEnabled === true) {
      alarms.push(create5XXAlarm(
        appSyncResourceName,
        appSyncResource,
        appSyncAlarmProperties['5XXError']
      ))
    }

    if (appSyncAlarmProperties.Latency.ActionsEnabled === true) {
      alarms.push(createLatencyAlarm(
        appSyncResourceName,
        appSyncResource,
        appSyncAlarmProperties.Latency
      ))
    }
    for (const alarm of alarms) {
      addResource(alarm.resourceName, alarm.resource, compiledTemplate)
    }
  }

  function create5XXAlarm (appSyncResourceName: string, appSyncResource: Resource, config: AlarmProperties): ReturnAlarm {
    const graphQLName = appSyncResource.Properties?.Name
    const threshold = config.Threshold
    const appSyncAlarmProperties: AppSyncAlarm = {
      AlarmName: `AppSync5XXErrorAlarm_${graphQLName}`,
      AlarmDescription: `AppSync 5XX Error ${getStatisticName(config)} for ${graphQLName} breaches ${threshold}`,
      AppSyncResourceName: appSyncResourceName,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: '5XXError',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/AppSync',
      Dimensions: [
        { Name: 'GraphQLAPIId', Value: `\${${appSyncResourceName}.ApiId}}` }
      ]
    }
    return {
      resourceName: makeResourceName('AppSync', graphQLName, '5XXError'),
      resource: createAlarm(appSyncAlarmProperties, context)
    }
  }

  function createLatencyAlarm (appSyncResourceName: string, appSyncResource: Resource, config: AlarmProperties): ReturnAlarm {
    const graphQLName = appSyncResource.Properties?.Name
    const threshold = config.Threshold
    const appSyncAlarmProperties: AppSyncAlarm = {
      AlarmName: `AppSyncLatencyAlarm_${graphQLName}`,
      AlarmDescription: `AppSync Latency ${getStatisticName(config)} for ${graphQLName} breaches ${threshold}`,
      AppSyncResourceName: appSyncResourceName,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'Latency',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/AppSync',
      Dimensions: [
        { Name: 'GraphQLAPIId', Value: `\${${appSyncResourceName}.ApiId}}` }
      ]
    }
    return {
      resourceName: makeResourceName('AppSync', graphQLName, 'Latency'),
      resource: createAlarm(appSyncAlarmProperties, context)
    }
  }
}
