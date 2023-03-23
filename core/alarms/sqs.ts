import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'

import type { Context, SlicWatchAlarmConfig } from './alarm-types'
import { createAlarm } from './alarm-utils'
import { getResourcesByType } from '../cf-template'

export interface SqsAlarmsConfig {
  enabled?: boolean
  InFlightMessagesPc: SlicWatchAlarmConfig
  AgeOfOldestMessage: SlicWatchAlarmConfig
}

/**
 * Add all required SQS alarms to the provided CloudFormation template
 * based on the SQS resources found within
 *
 * @param sqsAlarmsConfig The fully resolved alarm configuration
 * @param context Deployment context (alarmActions)
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns SQS-specific CloudFormation Alarm resources
 */
export default function createSQSAlarms (sqsAlarmsConfig: SqsAlarmsConfig, context: Context, compiledTemplate: Template) {
  const resources = {}
  const queueResources = getResourcesByType('AWS::SQS::Queue', compiledTemplate)

  for (const [queueLogicalId, queueResource] of Object.entries(queueResources)) {
    if (sqsAlarmsConfig.enabled === false) continue
    if (sqsAlarmsConfig.InFlightMessagesPc.enabled !== false) {
      // TODO: verify if there is a way to reference these hard limits directly as variables in the alarm
      //        so that in case AWS changes them, the rule will still be valid
      const config: SlicWatchAlarmConfig = sqsAlarmsConfig.InFlightMessagesPc
      const { enabled, ...rest } = config
      const alarmProps = rest as AlarmProperties // All mandatory properties are set following cascading
      const hardLimit = (queueResource.Properties?.FifoQueue != null) ? 20000 : 120000
      const thresholdValue = Math.floor(hardLimit * (config.Threshold as any) / 100)
      const sqsAlarmProperties: AlarmProperties = {
        AlarmName: `SQS_ApproximateNumberOfMessagesNotVisible_\${${queueLogicalId}.QueueName}`,
        AlarmDescription: `SQS in-flight messages for \${${queueLogicalId}.QueueName} breaches ${thresholdValue} (${config.Threshold}% of the hard limit of ${hardLimit})`,
        MetricName: 'ApproximateNumberOfMessagesNotVisible',
        Namespace: 'AWS/SQS',
        Dimensions: [{ Name: 'QueueName', Value: `\${${queueLogicalId}.QueueName}` }],
        ...alarmProps,
        Threshold: thresholdValue
      }
      const resourceName = `slicWatchSQSInFlightMsgsAlarm${queueLogicalId}`
      const resource = createAlarm(sqsAlarmProperties, context)
      resources[resourceName] = resource
    }

    if (sqsAlarmsConfig.AgeOfOldestMessage.enabled !== false) {
      if (sqsAlarmsConfig.AgeOfOldestMessage.Threshold == null) {
        throw new Error('SQS AgeOfOldestMessage alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.')
      }
      const config: SlicWatchAlarmConfig = sqsAlarmsConfig.AgeOfOldestMessage
      const { enabled, ...rest } = config
      const alarmProps = rest as AlarmProperties // All mandatory properties are set following cascading
      const sqsAlarmProperties: AlarmProperties = {
        AlarmName: `SQS_ApproximateAgeOfOldestMessage_\${${queueLogicalId}.QueueName}`,
        AlarmDescription: `SQS age of oldest message in the queue \${${queueLogicalId}.QueueName} breaches ${config.Threshold}`,
        MetricName: 'ApproximateAgeOfOldestMessage',
        Namespace: 'AWS/SQS',
        Dimensions: [{ Name: 'QueueName', Value: `\${${queueLogicalId}.QueueName}` }],
        ...alarmProps
      }
      const resourceName = `slicWatchSQSOldestMsgAgeAlarm${queueLogicalId}`
      const resource = createAlarm(sqsAlarmProperties, context)
      resources[resourceName] = resource
    }
  }
  return resources
}
