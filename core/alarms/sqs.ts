'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'

export interface SqsAlarmsConfig {
  enabled?: boolean
  InFlightMessagesPc: DefaultAlarmsProperties
  AgeOfOldestMessage: DefaultAlarmsProperties
}

export type SqsAlarm = AlarmProperties & {
  QueueName: string
}

/**
 * @param {object} sqsAlarmsConfig The fully resolved alarm configuration
 */
export default function createSQSAlarms (sqsAlarmsConfig: SqsAlarmsConfig, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required SQS alarms to the provided CloudFormation template
   * based on the SQS resources found within
   *
   * A CloudFormation template object
   */
  const queueResources = getResourcesByType('AWS::SQS::Queue', compiledTemplate, additionalResources)

  for (const [queueResourceName, queueResource] of Object.entries(queueResources)) {
    if (sqsAlarmsConfig.InFlightMessagesPc.enabled !== false) {
      // TODO: verify if there is a way to reference these hard limits directly as variables in the alarm
      //        so that in case AWS changes them, the rule will still be valid
      const config: DefaultAlarmsProperties = sqsAlarmsConfig.InFlightMessagesPc
      const hardLimit = (queueResource.Properties?.FifoQueue != null) ? 20000 : 120000
      const thresholdValue = Math.floor(hardLimit * config.Threshold / 100)
      const sqsAlarmProperties: SqsAlarm = {
        AlarmName: `SQS_ApproximateNumberOfMessagesNotVisible_\${${queueResourceName}.QueueName}`,
        AlarmDescription: `SQS in-flight messages for \${${queueResourceName}.QueueName} breaches ${thresholdValue} (${config.Threshold}% of the hard limit of ${hardLimit})`,
        QueueName: `\${${queueResourceName}.QueueName}`,
        MetricName: 'ApproximateNumberOfMessagesNotVisible',
        Namespace: 'AWS/SQS',
        Dimensions: [{ Name: 'QueueName', Value: `\${${queueResourceName}.QueueName}` }],
        ...config,
        Threshold: thresholdValue
      }
      const resourceName = `slicWatchSQSInFlightMsgsAlarm${queueResourceName}`
      const resource = createAlarm(sqsAlarmProperties, context)
      addResource(resourceName, resource, compiledTemplate)
    }

    if (sqsAlarmsConfig.AgeOfOldestMessage.enabled !== false) {
      if (sqsAlarmsConfig.AgeOfOldestMessage.Threshold == null) {
        throw new Error('SQS AgeOfOldestMessage alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.')
      }
      const config: DefaultAlarmsProperties = sqsAlarmsConfig.AgeOfOldestMessage
      const sqsAlarmProperties: SqsAlarm = {
        AlarmName: `SQS_ApproximateAgeOfOldestMessage_\${${queueResourceName}.QueueName}`,
        AlarmDescription: `SQS age of oldest message in the queue \${${queueResourceName}.QueueName} breaches ${config.Threshold}`,
        QueueName: `\${${queueResourceName}.QueueName}`,
        MetricName: 'ApproximateAgeOfOldestMessage',
        Namespace: 'AWS/SQS',
        Dimensions: [{ Name: 'QueueName', Value: `\${${queueResourceName}.QueueName}` }],
        ...config
      }
      const resourceName = `slicWatchSQSOldestMsgAgeAlarm${queueResourceName}`
      const resource = createAlarm(sqsAlarmProperties, context)
      addResource(resourceName, resource, compiledTemplate)
    }
  }
}
