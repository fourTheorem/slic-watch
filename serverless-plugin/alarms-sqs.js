'use strict'

/**
 * @param {object} sqsAlarmsConfig The fully resolved alarm configuration
 */
module.exports = function sqsAlarms (sqsAlarmsConfig, context) {
  return {
    createSQSAlarms
  }

  /**
   * Add all required SQS alarms to the provided CloudFormation template
   * based on the SQS resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createSQSAlarms (cfTemplate) {
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
    alarmName,
    alarmDescription,
    queueName,
    comparisonOperator,
    threshold,
    metrics,
    metricName,
    statistic,
    period
  ) {
    const metricProperties = metrics
      ? { Metrics: metrics }
      : {
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
        AlarmActions: [context.topicArn],
        AlarmName: alarmName,
        AlarmDescription: alarmDescription,
        EvaluationPeriods: 1,
        ComparisonOperator: comparisonOperator,
        Threshold: threshold,
        TreatMissingData: 'notBreaching',
        ...metricProperties
      }
    }
  }

  function createInFlightMsgsAlarm (queueResourceName, queueResource, config) {
    const queueName = queueResource.Properties.QueueName
    const threshold = config.Threshold

    // TODO: verify if there is a way to reference these hard limits directly as variables in the alarm
    //        so that in case AWS changes them, the rule will still be valid
    const hardLimit = queueResource.Properties.FifoQueue ? 18000 : 120000
    const thresholdValue = Math.floor(hardLimit * threshold / 100)

    return {
      resourceName: `slicWatchSQSInFlightMsgsAlarm${queueResourceName}`,
      resource: createSqsAlarm(
        `SQSApproximateNumberOfMessagesNotVisible_${queueName}`, // alarmName
        `In flight messages for ${queueName} exceeds ${thresholdValue} (${threshold}% of the hard limit of ${hardLimit})`, // alarmDescription
        queueName, // queueName
        config.ComparisonOperator, // comparisonOperator
        thresholdValue, // threshold
        null, // metrics
        'ApproximateNumberOfMessagesNotVisible', // metricName
        config.Statistic, // statistic
        config.Period // period
      )
    }
  }

  function createOldestMsgAgeAlarm (queueResourceName, queueResource, config) {
    const queueName = queueResource.Properties.QueueName
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchSQSOldestMsgAgeAlarm${queueResourceName}`,
      resource: createSqsAlarm(
        `SQSApproximateAgeOfOldestMessage_${queueName}`, // alarmName
        `Age of oldest message in the queue ${queueName} exceeds ${threshold}`, // alarmDescription
        queueName, // queueName
        config.ComparisonOperator, // comparisonOperator
        threshold, // threshold
        null, // metrics
        'ApproximateAgeOfOldestMessage', // metricName
        config.Statistic, // statistic
        config.Period // period
      )
    }
  }
}
