import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm } from './alarm-utils'
import { getResourceAlarmConfigurationsByType } from '../cf-template'

export type SlicWatchSqsAlarmsConfig<T extends InputOutput> = T & {
  InFlightMessagesPc: T
  AgeOfOldestMessage: T
}

/**
 * Add all required SQS alarms to the provided CloudFormation template
 * based on the SQS resources found within
 *
 * @param sqsAlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns SQS-specific CloudFormation Alarm resources
 */
export default function createSQSAlarms (
  sqsAlarmsConfig: SlicWatchSqsAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  const resources: CloudFormationResources = {}
  const configuredResources = getResourceAlarmConfigurationsByType('AWS::SQS::Queue', compiledTemplate, sqsAlarmsConfig)

  for (const [queueLogicalId, queueResource] of Object.entries(configuredResources.resources)) {
    const mergedConfig = configuredResources.alarmConfigurations[queueLogicalId]
    if (!mergedConfig.enabled) {
      continue
    }

    const inFlightMessagesPcConfig = mergedConfig.InFlightMessagesPc
    if (inFlightMessagesPcConfig.enabled) {
      const { enabled, ...rest } = inFlightMessagesPcConfig
      const hardLimit = (queueResource.Properties?.FifoQueue != null) ? 20000 : 120000
      const thresholdValue = Math.floor(hardLimit * (inFlightMessagesPcConfig.Threshold as any) / 100)
      const sqsAlarmProperties: AlarmProperties = {
        AlarmName: Fn.Sub(`SQS_ApproximateNumberOfMessagesNotVisible_\${${queueLogicalId}.QueueName}`, {}),
        AlarmDescription: Fn.Sub(`SQS in-flight messages for \${${queueLogicalId}.QueueName} breaches ${thresholdValue} (${inFlightMessagesPcConfig.Threshold}% of the hard limit of ${hardLimit})`, {}),
        MetricName: 'ApproximateNumberOfMessagesNotVisible',
        Namespace: 'AWS/SQS',
        Dimensions: [{ Name: 'QueueName', Value: Fn.GetAtt(`${queueLogicalId}`, 'QueueName') }],
        ...rest,
        Threshold: thresholdValue
      }
      const resourceName = `slicWatchSQSInFlightMsgsAlarm${queueLogicalId}`
      const resource = createAlarm(sqsAlarmProperties, alarmActionsConfig)
      resources[resourceName] = resource
    }

    const ageOfOldestMessageConfig = mergedConfig.AgeOfOldestMessage
    if (ageOfOldestMessageConfig.enabled) {
      if (ageOfOldestMessageConfig.Threshold == null) {
        throw new Error('SQS AgeOfOldestMessage alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.')
      }
      const { enabled, ...rest } = ageOfOldestMessageConfig
      const alarmProps = rest as AlarmProperties // All mandatory properties are set following cascading
      const sqsAlarmProperties: AlarmProperties = {
        AlarmName: Fn.Sub(`SQS_ApproximateAgeOfOldestMessage_\${${queueLogicalId}.QueueName}`, {}),
        AlarmDescription: Fn.Sub(`SQS age of oldest message in the queue \${${queueLogicalId}.QueueName} breaches ${ageOfOldestMessageConfig.Threshold as number}`, {}),
        MetricName: 'ApproximateAgeOfOldestMessage',
        Namespace: 'AWS/SQS',
        Dimensions: [{ Name: 'QueueName', Value: Fn.GetAtt(`${queueLogicalId}`, 'QueueName') }],
        ...alarmProps
      }
      const resourceName = `slicWatchSQSOldestMsgAgeAlarm${queueLogicalId}`
      const resource = createAlarm(sqsAlarmProperties, alarmActionsConfig)
      resources[resourceName] = resource
    }
  }
  return resources
}
