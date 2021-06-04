'use strict'

const { makeResourceName } = require('./util')

const kinesisAlarmTypes = {
  StreamIteratorAge: 'GetRecords.IteratorAgeMilliseconds',
  StreamReadThroughput: 'ReadProvisionedThroughputExceeded',
  StreamWriteThroughput: 'WriteProvisionedThroughputExceeded',
  StreamPutRecordSuccess: 'PutRecord.Success',
  StreamPutRecordsSuccess: 'PutRecords.Success',
  StreamGetRecordsSuccess: 'GetRecords.Success'
}

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
      for (const [type, metric] of Object.entries(kinesisAlarmTypes)) {
        if (kinesisAlarmConfig[metric].enabled) {
          const alarm = createStreamAlarm(
            streamResourceName,
            streamResource,
            type,
            metric,
            kinesisAlarmConfig[metric]
          )
          cfTemplate.addResource(alarm.resourceName, alarm.resource)
        }
      }
    }
  }

  function createStreamAlarm (streamResourceName, streamResource, type, metric, config) {
    const streamName = streamResource.Properties.Name // TODO: Allow for Ref usage in resource names (see #14)
    const threshold = config.Threshold
    const metricProperties = {
      Dimensions: [{ Name: 'StreamName', Value: streamName }],
      MetricName: metric,
      Namespace: 'AWS/Kinesis',
      Period: config.Period,
      Statistic: config.Statistic,
      ExtendedStatistic: config.ExtendedStatistic
    }

    const resource = {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: [context.topicArn],
        AlarmName: `${type}_${streamName}`,
        AlarmDescription: `Kinesis ${config.Statistic} ${metric} for ${streamName} breaches ${threshold} milliseconds`,
        EvaluationPeriods: config.EvaluationPeriods,
        ComparisonOperator: config.ComparisonOperator,
        Threshold: config.Threshold,
        TreatMissingData: config.TreatMissingData,
        ...metricProperties
      }
    }
    return {
      resourceName: makeResourceName('kinesis', streamName, type),
      resource
    }
  }
}
