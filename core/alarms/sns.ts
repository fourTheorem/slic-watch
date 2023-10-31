import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchAlarmConfig, SlicWatchMergedConfig } from './alarm-types'
import { createCfAlarms } from './alarm-utils'

export interface SlicWatchSnsAlarmsConfig<T extends InputOutput> extends SlicWatchAlarmConfig {
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
    AlarmName: Fn.Sub(`SNS_${metric.replaceAll(/[-]/g, '')}Alarm_\${${snsLogicalId}.TopicName}`, {}),
    AlarmDescription: Fn.Sub(`SNS of  ${metric.replaceAll(/[-]/g, '')} for \${${snsLogicalId}.TopicName} breaches ${config.Threshold}`, {})
  }
}

/**
 * Add all required SNS alarms to the provided CloudFormation template
 *
 * @param snsAlarmsConfig The fully resolved alarm configuration
 * @param context Deployment context (alarmActions)
 * @param compiledTemplate A CloudFormation template object
 *
 * @returns SNS-specific CloudFormation Alarm resources
 */
export default function createSnsAlarms (
  snsAlarmsConfig: SlicWatchSnsAlarmsConfig<SlicWatchMergedConfig>, context: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  return createCfAlarms(
    'AWS::SNS::Topic',
    'SNS',
    executionMetrics,
    snsAlarmsConfig,
    context,
    compiledTemplate,
    createSnsTopicAlarmCfProperties
  )
}
