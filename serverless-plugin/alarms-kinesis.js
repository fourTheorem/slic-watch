'use strict'

const { makeResourceName } = require('./util')

/**
 * @param {object} kinesisAlarmConfig The fully resolved alarm configuration for Kinesis Data Streams
 */
module.exports = function KinesisAlarms (kinesisAlarmConfig, context) {
  return {
    createKinesisAlarms
  }

  /**
   * Add all required Kinesis Data Stream alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createKinesisAlarms (cfTemplate) {
    const streamResources = cfTemplate.getResourcesByType(
      'AWS::Kinesis::Stream'
    )

    for (const [streamResourceName, streamResource] of Object.entries(streamResources)) {
      const alarms = []

      if (kinesisAlarmConfig['GetRecords.IteratorAgeMilliseconds'].enabled) {
        alarms.push(createIteratorAgeAlarm(
          streamResourceName,
          streamResource,
          kinesisAlarmConfig['GetRecords.IteratorAgeMilliseconds']
        ))
      }

      for (const alarm of alarms) {
        cfTemplate.addResource(alarm.resourceName, alarm.resource)
      }
    }
  }

  function createStreamAlarm (
    alarmName,
    alarmDescription,
    streamName,
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    extendedStatistic
  ) {
    const metricProperties = {
      Dimensions: [{ Name: 'StreamName', Value: streamName }],
      MetricName: metricName,
      Namespace: 'AWS/Kinesis',
      Period: period,
      Statistic: statistic,
      ExtendedStatistic: extendedStatistic
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

  function createIteratorAgeAlarm (streamResourceName, streamResource, config) {
    const streamName = streamResource.Properties.Name // TODO: Allow for Ref usage in resource names (see #14)
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('kinesis', streamName, 'IteratorAge'),
      resource: createStreamAlarm(
        `StreamIteratorAge_${streamName}`,
        `Kinesis ${config.Statistic} IteratorAge for ${streamName} breaches ${threshold} milliseconds`,
        streamName,
        config.ComparisonOperator,
        threshold,
        'GetRecords.IteratorAgeMilliseconds',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic
      )
    }
  }
}
