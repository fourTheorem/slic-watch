'use strict'

import { getResourcesByType, addResource, ResourceType } from '../cf-template'
import { Context, createAlarm } from './default-config-alarms'
import { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import Resource from 'cloudform-types/types/resource'
import Template from 'cloudform-types/types/template'

export type SnsAlarmsConfig = AlarmProperties & {
  'NumberOfNotificationsFilteredOut-InvalidAttributes': AlarmProperties
  NumberOfNotificationsFailed: AlarmProperties
}

export type SnsAlarm = AlarmProperties & {
  TopicName: string
}

/**
 * snsAlarmsConfig The fully resolved alarm configuration
 */
export default function createSNSAlarms (snsAlarmsConfig: SnsAlarmsConfig, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required SNS alarms to the provided CloudFormation template
   * based on the SNS resources found within
   *
   * A CloudFormation template object
   */
  const topicResources = getResourcesByType('AWS::SNS::Topic', compiledTemplate, additionalResources)

  for (const [topicLogicalId, topicResource] of Object.entries(topicResources)) {
    if (snsAlarmsConfig['NumberOfNotificationsFilteredOut-InvalidAttributes'].ActionsEnabled) {
      const numberOfNotificationsFilteredOutInvalidAttributes = createNumberOfNotificationsFilteredOutInvalidAttributesAlarm(
        topicLogicalId,
        topicResource,
        snsAlarmsConfig['NumberOfNotificationsFilteredOut-InvalidAttributes']
      )
      addResource(numberOfNotificationsFilteredOutInvalidAttributes.resourceName, numberOfNotificationsFilteredOutInvalidAttributes.resource, compiledTemplate)
    }

    if (snsAlarmsConfig.NumberOfNotificationsFailed.ActionsEnabled) {
      const numberOfNotificationsFailed = createNumberOfNotificationsFailedAlarm(
        topicLogicalId,
        topicResource,
        snsAlarmsConfig.NumberOfNotificationsFailed
      )
      addResource(numberOfNotificationsFailed.resourceName, numberOfNotificationsFailed.resource, compiledTemplate)
    }
  }

  function createNumberOfNotificationsFilteredOutInvalidAttributesAlarm (topicLogicalId: string, topicResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold
    const snsAlarmProperties: SnsAlarm = {
      AlarmName: `SNS_NumberOfNotificationsFilteredOutInvalidAttributesAlarm_\${${topicLogicalId}.TopicName}`,
      AlarmDescription: `Number of SNS Notifications Filtered out Invalid Attributes for \${${topicLogicalId}.TopicName} breaches (${threshold}`,
      TopicName: `\${${topicLogicalId}.TopicName}`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'NumberOfNotificationsFilteredOut-InvalidAttributes',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/SNS',
      Dimensions: [{ Name: 'TopicName', Value: `\${${topicLogicalId}.TopicName}` }]
    }
    return {
      resourceName: `slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarm${topicLogicalId}`,
      resource: createAlarm(snsAlarmProperties, context)
    }
  }

  function createNumberOfNotificationsFailedAlarm (topicLogicalId: string, topicResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold
    const snsAlarmProperties: SnsAlarm = {
      AlarmName: `SNS_NumberOfNotificationsFailedAlarm_\${${topicLogicalId}.TopicName}`,
      AlarmDescription: `Number of Notifications failed for \${${topicLogicalId}.TopicName} breaches (${threshold}`,
      TopicName: `\${${topicLogicalId}.TopicName}`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'NumberOfNotificationsFailed',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/SNS',
      Dimensions: [{ Name: 'TopicName', Value: `\${${topicLogicalId}.TopicName}` }]
    }
    return {
      resourceName: `slicWatchSNSNumberOfNotificationsFailedAlarm${topicLogicalId}`,
      resource: createAlarm(snsAlarmProperties, context)
    }
  }
}
