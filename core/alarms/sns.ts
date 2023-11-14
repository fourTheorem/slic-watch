import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createCfAlarms } from './alarm-utils'

export type SlicWatchSnsAlarmsConfig<T extends InputOutput> = T & {
  'NumberOfNotificationsFilteredOut-InvalidAttributes': T
  NumberOfNotificationsFailed: T
}

const executionMetrics = ['NumberOfNotificationsFilteredOut-InvalidAttributes', 'NumberOfNotificationsFailed']

/**
 * Create CloudFormation CloudWatch Metric alarm properties that are specific to SNS Topic resources
 * @param metric The SNS metric name
 * @param snsLogicalId The CloudFormation Logical ID of the Topic resource
 * @param config The alarm config for this specific metric
 *
 * @returns SNS-specific CloudFormation Alarm properties
 */
function createSnsTopicAlarmCfProperties (metric: string, snsLogicalId: string, config: SlicWatchMergedConfig) {
  return {
    Namespace: 'AWS/SNS',
    Dimensions: [{ Name: 'TopicName', Value: Fn.GetAtt(snsLogicalId, 'TopicName') }],
    AlarmName: Fn.Sub(`SNS_${metric.replaceAll(/[-]/g, '')}_Alarm_\${${snsLogicalId}.TopicName}`, {}),
    AlarmDescription: Fn.Sub(`SNS ${metric.replaceAll(/[-]/g, '')} for \${${snsLogicalId}.TopicName} breaches ${config.Threshold}`, {})
  }
}

/**
 * Add all required SNS alarms to the provided CloudFormation template
 *
 * @param snsAlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate A CloudFormation template object
 *
 * @returns SNS-specific CloudFormation Alarm resources
 */
export default function createSnsAlarms (
  snsAlarmsConfig: SlicWatchSnsAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  return createCfAlarms(
    'AWS::SNS::Topic',
    'SNS',
    executionMetrics,
    snsAlarmsConfig,
    alarmActionsConfig,
    compiledTemplate,
    createSnsTopicAlarmCfProperties
  )
}
