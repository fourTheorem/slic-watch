'use strict'

import { CfResource, CloudFormationTemplate } from '../cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'


export type KinesisAlarmConfig = {
  enabled?: boolean
  'GetRecords.IteratorAgeMilliseconds': AlarmConfig,
  ReadProvisionedThroughputExceeded: AlarmConfig
  WriteProvisionedThroughputExceeded: AlarmConfig
  'PutRecord.Success': AlarmConfig
  'PutRecords.Success': AlarmConfig
  'GetRecords.Success': AlarmConfig
}

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
export default function KinesisAlarms (kinesisAlarmConfig: KinesisAlarmConfig, context: Context) {
  return {
    createKinesisAlarms
  }

  /**
   * Add all required Kinesis Data Stream alarms to the provided CloudFormation template
   * based on the resources found within
   *
   *  A CloudFormation template object
   */
  function createKinesisAlarms (cfTemplate: CloudFormationTemplate) {
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

  function createStreamAlarm (streamLogicalId: string, streamResource: CfResource, type: string, metric: string, config: AlarmConfig) {
    const threshold = config.Threshold
    const kinesisAlarmConfig: Alarm = {
      alarmName: { 'Fn::Sub': `Kinesis_${type}_\${${streamLogicalId}}` },
      alarmDescription: { 'Fn::Sub': `Kinesis ${getStatisticName(config)} ${metric} for \${${streamLogicalId}} breaches ${threshold} milliseconds` },
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: metric,
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/Kinesis',
      dimensions:[{ Name: 'StreamName', Value: { Ref: streamLogicalId } }]
    }

    return {
      resourceName: makeResourceName('Kinesis', streamLogicalId, type),
      resource: createAlarm(kinesisAlarmConfig, context)
    }
  }
}
