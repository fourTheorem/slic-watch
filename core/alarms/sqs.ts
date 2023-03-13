'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type ReturnAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
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
    if (sqsAlarmsConfig.InFlightMessagesPc.enabled === true) {
      const inFlightMsgsAlarm = createInFlightMsgsAlarm(
        queueResourceName,
        queueResource,
        sqsAlarmsConfig.InFlightMessagesPc
      )
      addResource(inFlightMsgsAlarm.resourceName, inFlightMsgsAlarm.resource, compiledTemplate)
    }

    if (sqsAlarmsConfig.AgeOfOldestMessage.enabled === true) {
      if (sqsAlarmsConfig.AgeOfOldestMessage.Threshold == null) {
        throw new Error('SQS AgeOfOldestMessage alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.')
      }

      const oldestMsgAgeAlarm = createOldestMsgAgeAlarm(
        queueResourceName,
        queueResource,
        sqsAlarmsConfig.AgeOfOldestMessage
      )
      addResource(oldestMsgAgeAlarm.resourceName, oldestMsgAgeAlarm.resource, compiledTemplate)
    }
  }

  function createInFlightMsgsAlarm (logicalId: string, queueResource: Resource, config: DefaultAlarmsProperties): ReturnAlarm {
    const threshold = config.Threshold

    // TODO: verify if there is a way to reference these hard limits directly as variables in the alarm
    //        so that in case AWS changes them, the rule will still be valid
    const hardLimit = (queueResource.Properties?.FifoQueue != null) ? 20000 : 120000
    const thresholdValue = Math.floor(hardLimit * threshold / 100)
    const sqsAlarmProperties: SqsAlarm = {
      AlarmName: `SQS_ApproximateNumberOfMessagesNotVisible_\${${logicalId}.QueueName}`,
      AlarmDescription: `SQS in-flight messages for \${${logicalId}.QueueName} breaches ${thresholdValue} (${threshold}% of the hard limit of ${hardLimit})`,
      QueueName: `\${${logicalId}.QueueName}`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: thresholdValue,
      MetricName: 'ApproximateNumberOfMessagesNotVisible',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/SQS',
      Dimensions: [{ Name: 'QueueName', Value: `\${${logicalId}.QueueName}` }]
    }
    return {
      resourceName: `slicWatchSQSInFlightMsgsAlarm${logicalId}`,
      resource: createAlarm(sqsAlarmProperties, context)
    }
  }

  function createOldestMsgAgeAlarm (logicalId: string, queueResource: Resource, config: DefaultAlarmsProperties): ReturnAlarm {
    const threshold = config.Threshold
    const sqsAlarmProperties: SqsAlarm = {
      AlarmName: `SQS_ApproximateAgeOfOldestMessage_\${${logicalId}.QueueName}`,
      AlarmDescription: `SQS age of oldest message in the queue \${${logicalId}.QueueName} breaches ${threshold}`,
      QueueName: `\${${logicalId}.QueueName}`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'ApproximateAgeOfOldestMessage',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/SQS',
      Dimensions: [{ Name: 'QueueName', Value: `\${${logicalId}.QueueName}` }]
    }
    return {
      resourceName: `slicWatchSQSOldestMsgAgeAlarm${logicalId}`,
      resource: createAlarm(sqsAlarmProperties, context)
    }
  }
}
