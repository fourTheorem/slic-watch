'use strict'

import { CloudFormationTemplate } from '../cf-template'
import Resource from "cloudform-types/types/resource"
import { Context, createAlarm } from './default-config-alarms'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"

export type SqsAlarmsConfig = AlarmProperties& {
  AgeOfOldestMessage: AlarmProperties,
  InFlightMessagesPc: AlarmProperties
}

export type SqsAlarm= AlarmProperties & {
  QueueName: string
}

/**
 * @param {object} sqsAlarmsConfig The fully resolved alarm configuration
 */
export default function sqsAlarms (sqsAlarmsConfig: SqsAlarmsConfig, context: Context) {
  return {
    createSQSAlarms
  }

  /**
   * Add all required SQS alarms to the provided CloudFormation template
   * based on the SQS resources found within
   *
   * A CloudFormation template object
   */
  function createSQSAlarms (cfTemplate: CloudFormationTemplate) {
    const queueResources = cfTemplate.getResourcesByType(
      'AWS::SQS::Queue'
    )

    for (const [queueResourceName, queueResource] of Object.entries(
      queueResources
    )) {
      if (sqsAlarmsConfig.InFlightMessagesPc.ActionsEnabled) {
        const inFlightMsgsAlarm = createInFlightMsgsAlarm(
          queueResourceName,
          queueResource,
          sqsAlarmsConfig.InFlightMessagesPc
        )
        cfTemplate.addResource(inFlightMsgsAlarm.resourceName, inFlightMsgsAlarm.resource)
      }

      if (sqsAlarmsConfig.AgeOfOldestMessage.ActionsEnabled) {
        if (sqsAlarmsConfig.AgeOfOldestMessage.Threshold == null) {
          throw new Error('SQS AgeOfOldestMessage alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.')
        }

        const oldestMsgAgeAlarm = createOldestMsgAgeAlarm(
          queueResourceName,
          queueResource,
          sqsAlarmsConfig.AgeOfOldestMessage
        )
        cfTemplate.addResource(
          oldestMsgAgeAlarm.resourceName,
          oldestMsgAgeAlarm.resource
        )
      }
    }
  }

  function createInFlightMsgsAlarm (logicalId: string, queueResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold

    // TODO: verify if there is a way to reference these hard limits directly as variables in the alarm
    //        so that in case AWS changes them, the rule will still be valid
    const hardLimit = queueResource.Properties?.FifoQueue ? 20000 : 120000
    //@ts-ignore
    const thresholdValue = Math.floor(hardLimit * threshold / 100)
    const sqsAlarmProperties: SqsAlarm = {
      AlarmName: `SQS_ApproximateNumberOfMessagesNotVisible_\${${logicalId}.QueueName}`,
      AlarmDescription: `SQS in-flight messages for \${${logicalId}.QueueName} breaches ${thresholdValue} (${threshold}% of the hard limit of ${hardLimit})`,
      QueueName: `\${${logicalId}.QueueName}`, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: thresholdValue,
      MetricName: 'ApproximateNumberOfMessagesNotVisible',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/SQS',
      Dimensions: [{ Name: 'QueueName', Value: `\${${logicalId}.QueueName}` }]
    }
    return {
      resourceName: `slicWatchSQSInFlightMsgsAlarm${logicalId}`,
      resource: createAlarm(sqsAlarmProperties, context)
   }
  }

  function createOldestMsgAgeAlarm (logicalId: string, queueResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold
    const sqsAlarmProperties: SqsAlarm = {
      AlarmName: `SQS_ApproximateAgeOfOldestMessage_\${${logicalId}.QueueName}`,
      AlarmDescription: `SQS age of oldest message in the queue \${${logicalId}.QueueName} breaches ${threshold}`,
      QueueName: `\${${logicalId}.QueueName}`, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'ApproximateAgeOfOldestMessage',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/SQS',
      Dimensions: [{ Name: 'QueueName', Value: `\${${logicalId}.QueueName}` }]
    }
    return {
      resourceName: `slicWatchSQSOldestMsgAgeAlarm${logicalId}`,
      resource: createAlarm(sqsAlarmProperties, context)
    }
  }
}
