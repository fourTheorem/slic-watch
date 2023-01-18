'use strict'

import { CfResource, CloudFormationTemplate } from "./cf-template.d";
import { AlarmConfig, Context } from './default-config-alarms'

export type SqsAlarmsConfig = {
  enabled?: boolean
  AgeOfOldestMessage: AlarmConfig,
  InFlightMessagesPc: AlarmConfig
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
      if (sqsAlarmsConfig.InFlightMessagesPc.enabled) {
        const inFlightMsgsAlarm = createInFlightMsgsAlarm(
          queueResourceName,
          queueResource,
          sqsAlarmsConfig.InFlightMessagesPc
        )
        cfTemplate.addResource(inFlightMsgsAlarm.resourceName, inFlightMsgsAlarm.resource)
      }

      if (sqsAlarmsConfig.AgeOfOldestMessage.enabled) {
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

  function createSqsAlarm (
    alarmName: string,
    alarmDescription: string,
    queueName: string,
    comparisonOperator: string,
    threshold: number,
    metricName: string,
    statistic: string,
    period: number,
    evaluationPeriods: number,
    treatMissingData: string
  ) {
    const metricProperties = {
      Dimensions: [{ Name: 'QueueName', Value: queueName }],
      MetricName: metricName,
      Namespace: 'AWS/SQS',
      Period: period,
      Statistic: statistic
    }

    return {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: context.alarmActions,
        AlarmName: alarmName,
        AlarmDescription: alarmDescription,
        EvaluationPeriods: evaluationPeriods,
        ComparisonOperator: comparisonOperator,
        Threshold: threshold,
        TreatMissingData: treatMissingData,
        ...metricProperties
      }
    }
  }

  function createInFlightMsgsAlarm (logicalId: string, queueResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold

    // TODO: verify if there is a way to reference these hard limits directly as variables in the alarm
    //        so that in case AWS changes them, the rule will still be valid
    const hardLimit = queueResource.Properties?.FifoQueue ? 20000 : 120000
    const thresholdValue = Math.floor(hardLimit * threshold / 100)
    return {
      resourceName: `slicWatchSQSInFlightMsgsAlarm${logicalId}`,
      resource: createSqsAlarm(
        // @ts-ignore
        { 'Fn::Sub': `SQS_ApproximateNumberOfMessagesNotVisible_\${${logicalId}.QueueName}` }, // alarmName
        { 'Fn::Sub': `SQS in-flight messages for \${${logicalId}.QueueName} breaches ${thresholdValue} (${threshold}% of the hard limit of ${hardLimit})` }, // alarmDescription
        { 'Fn::GetAtt': [logicalId, 'QueueName'] },
        config.ComparisonOperator, // comparisonOperator
        thresholdValue, // threshold
        'ApproximateNumberOfMessagesNotVisible', // metricName
        config.Statistic, // statistic
        config.Period, // period
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createOldestMsgAgeAlarm (logicalId: string, queueResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchSQSOldestMsgAgeAlarm${logicalId}`,
      resource: createSqsAlarm(
        // @ts-ignore
        { 'Fn::Sub': `SQS_ApproximateAgeOfOldestMessage_\${${logicalId}.QueueName}` }, // alarmName
        { 'Fn::Sub': `SQS age of oldest message in the queue \${${logicalId}.QueueName} breaches ${threshold}` }, // alarmDescription
        { 'Fn::GetAtt': [logicalId, 'QueueName'] },
        config.ComparisonOperator, // comparisonOperator
        threshold, // threshold
        'ApproximateAgeOfOldestMessage', // metricName
        config.Statistic, // statistic
        config.Period, // period
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }
}
