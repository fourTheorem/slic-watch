'use strict'

import { CfResource, CloudFormationTemplate, Statistic } from '../utils/cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'

export type SnsAlarmsConfig = {
  enabled?: boolean
  'NumberOfNotificationsFilteredOut-InvalidAttributes': AlarmConfig,
  NumberOfNotificationsFailed: AlarmConfig
}

export type SnsAlarm= Alarm & {
  topicName: object
}

/**
 * snsAlarmsConfig The fully resolved alarm configuration
 */
export default function snsAlarms (snsAlarmsConfig: SnsAlarmsConfig, context: Context) {
  return {
    createSNSAlarms
  }

  /**
   * Add all required SNS alarms to the provided CloudFormation template
   * based on the SNS resources found within
   *
   * A CloudFormation template object
   */
  function createSNSAlarms (cfTemplate: CloudFormationTemplate) {
    const topicResources = cfTemplate.getResourcesByType(
      'AWS::SNS::Topic'
    )

    for (const [topicLogicalId, topicResource] of Object.entries(topicResources)) {
      if (snsAlarmsConfig['NumberOfNotificationsFilteredOut-InvalidAttributes'].enabled) {
        const numberOfNotificationsFilteredOutInvalidAttributes = createNumberOfNotificationsFilteredOutInvalidAttributesAlarm(
          topicLogicalId,
          topicResource,
          snsAlarmsConfig['NumberOfNotificationsFilteredOut-InvalidAttributes']
        )
        cfTemplate.addResource(numberOfNotificationsFilteredOutInvalidAttributes.resourceName, numberOfNotificationsFilteredOutInvalidAttributes.resource)
      }

      if (snsAlarmsConfig.NumberOfNotificationsFailed.enabled) {
        const numberOfNotificationsFailed = createNumberOfNotificationsFailedAlarm(
          topicLogicalId,
          topicResource,
          snsAlarmsConfig.NumberOfNotificationsFailed
        )
        cfTemplate.addResource(numberOfNotificationsFailed.resourceName, numberOfNotificationsFailed.resource)
      }
    }
  }

  function createNumberOfNotificationsFilteredOutInvalidAttributesAlarm (topicLogicalId: string, topicResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const snsAlarmConfig: SnsAlarm = {
      alarmName: { 'Fn::Sub': `SNS_NumberOfNotificationsFilteredOutInvalidAttributesAlarm_\${${topicLogicalId}.TopicName}` },
      alarmDescription: { 'Fn::Sub': `Number of SNS Notifications Filtered out Invalid Attributes for \${${topicLogicalId}.TopicName} breaches (${threshold}` },
      topicName: { 'Fn::GetAtt': [topicLogicalId, 'TopicName'] }, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'NumberOfNotificationsFilteredOut-InvalidAttributes',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/SNS',
      dimensions: [{ Name: 'TopicName', Value: { 'Fn::GetAtt': [topicLogicalId, 'TopicName'] } }]
    }
    return {
      resourceName: `slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarm${topicLogicalId}`,
      resource: createAlarm(snsAlarmConfig, context)
    }
  }

  function createNumberOfNotificationsFailedAlarm (topicLogicalId: string, topicResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const snsAlarmConfig: SnsAlarm = {
      alarmName: { 'Fn::Sub': `SNS_NumberOfNotificationsFailedAlarm_\${${topicLogicalId}.TopicName}` },
      alarmDescription: { 'Fn::Sub': `Number of Notifications failed for \${${topicLogicalId}.TopicName} breaches (${threshold}` },
      topicName: { 'Fn::GetAtt': [topicLogicalId, 'TopicName'] }, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'NumberOfNotificationsFailed',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/SNS',
      dimensions: [{ Name: 'TopicName', Value: { 'Fn::GetAtt': [topicLogicalId, 'TopicName'] } }]
    }
    return {
      resourceName: `slicWatchSNSNumberOfNotificationsFailedAlarm${topicLogicalId}`,
      resource: createAlarm(snsAlarmConfig, context)
    }
  }
}
