'use strict'

import { CfResource, CloudFormationTemplate } from '../cf-template'
import { AlarmConfig, Context, createAlarm } from './default-config-alarms'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"

export type SnsAlarmsConfig = {
  enabled?: boolean
  'NumberOfNotificationsFilteredOut-InvalidAttributes': AlarmConfig,
  NumberOfNotificationsFailed: AlarmConfig
}

export type SnsAlarm= AlarmProperties & {
  topicName: string
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
      AlarmName:  `SNS_NumberOfNotificationsFilteredOutInvalidAttributesAlarm_\${${topicLogicalId}.TopicName}`,
      AlarmDescription: `Number of SNS Notifications Filtered out Invalid Attributes for \${${topicLogicalId}.TopicName} breaches (${threshold}`,
      topicName: `\${${topicLogicalId}.TopicName}`,  
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'NumberOfNotificationsFilteredOut-InvalidAttributes',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/SNS',
      Dimensions: [{ Name: 'TopicName', Value: `\${${topicLogicalId}.TopicName}` }]
    }
    return {
      resourceName: `slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarm${topicLogicalId}`,
      resource: createAlarm(snsAlarmConfig, context)
    }
  }

  function createNumberOfNotificationsFailedAlarm (topicLogicalId: string, topicResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const snsAlarmConfig: SnsAlarm = {
      AlarmName: `SNS_NumberOfNotificationsFailedAlarm_\${${topicLogicalId}.TopicName}`,
      AlarmDescription: `Number of Notifications failed for \${${topicLogicalId}.TopicName} breaches (${threshold}`,
      topicName: `\${${topicLogicalId}.TopicName}`, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'NumberOfNotificationsFailed',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/SNS',
      Dimensions: [{ Name: 'TopicName', Value: `\${${topicLogicalId}.TopicName}` }]
    }
    return {
      resourceName: `slicWatchSNSNumberOfNotificationsFailedAlarm${topicLogicalId}`,
      resource: createAlarm(snsAlarmConfig, context)
    }
  }
}
