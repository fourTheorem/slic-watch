'use strict'

import { makeResourceName, getStatisticName } from './util'
import { CloudFormationTemplate } from "./cf-template.d";

const kinesisAlarmTypes = {
  StreamIteratorAge: 'GetRecords.IteratorAgeMilliseconds',
  StreamReadThroughput: 'ReadProvisionedThroughputExceeded',
  StreamWriteThroughput: 'WriteProvisionedThroughputExceeded',
  StreamPutRecordSuccess: 'PutRecord.Success',
  StreamPutRecordsSuccess: 'PutRecords.Success',
  StreamGetRecordsSuccess: 'GetRecords.Success'
}

/**
 * The fully resolved alarm configuration for Kinesis Data Streams
 */
export default function KinesisAlarms (kinesisAlarmConfig , context) {
  return {
    createKinesisAlarms
  }

  /**
   * Add all required Kinesis Data Stream alarms to the provided CloudFormation template
   * based on the resources found within
   *
   *  A CloudFormation template object
   */
  function createKinesisAlarms (cfTemplate:CloudFormationTemplate) {
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

  function createStreamAlarm (streamLogicalId: string, streamResource, type: string, metric: string, config) {
    const threshold = config.Threshold
    const metricProperties = {
      Dimensions: [{ Name: 'StreamName', Value: { Ref: streamLogicalId } }],
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
        AlarmActions: context.alarmActions,
        AlarmName: { 'Fn::Sub': `Kinesis_${type}_\${${streamLogicalId}}` },
        AlarmDescription: { 'Fn::Sub': `Kinesis ${getStatisticName(config)} ${metric} for \${${streamLogicalId}} breaches ${threshold} milliseconds` },
        EvaluationPeriods: config.EvaluationPeriods,
        ComparisonOperator: config.ComparisonOperator,
        Threshold: config.Threshold,
        TreatMissingData: config.TreatMissingData,
        ...metricProperties
      }
    }
    return {
      resourceName: makeResourceName('Kinesis', streamLogicalId, type),
      resource
    }
  }
}
