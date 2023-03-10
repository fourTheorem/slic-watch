'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type ReturnAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

export type KinesisAlarmProperties = AlarmProperties & {
  'GetRecords.IteratorAgeMilliseconds': AlarmProperties
  ReadProvisionedThroughputExceeded: AlarmProperties
  WriteProvisionedThroughputExceeded: AlarmProperties
  'PutRecord.Success': AlarmProperties
  'PutRecords.Success': AlarmProperties
  'GetRecords.Success': AlarmProperties
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
export default function createKinesisAlarms (kinesisAlarmProperties: KinesisAlarmProperties, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required Kinesis Data Stream alarms to the provided CloudFormation template
   * based on the resources found within
   *
   *  A CloudFormation template object
   */
  const streamResources = getResourcesByType('AWS::Kinesis::Stream', compiledTemplate, additionalResources)

  for (const [streamResourceName, streamResource] of Object.entries(streamResources)) {
    for (const [type, metric] of Object.entries(kinesisAlarmTypes)) {
      if (kinesisAlarmProperties[metric].ActionsEnabled === true) {
        const alarm = createStreamAlarm(
          streamResourceName,
          streamResource,
          type,
          metric,
          kinesisAlarmProperties[metric]
        )
        addResource(alarm.resourceName, alarm.resource, compiledTemplate)
      }
    }
  }

  function createStreamAlarm (streamLogicalId: string, streamResource: Resource, type: string, metric: string, config: AlarmProperties): ReturnAlarm {
    const threshold = config.Threshold
    const kinesisAlarmProperties: AlarmProperties = {
      AlarmName: `Kinesis_${type}_${streamLogicalId}`,
      AlarmDescription: `Kinesis ${getStatisticName(config)} ${metric} for ${streamLogicalId} breaches ${threshold} milliseconds`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: metric,
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/Kinesis',
      Dimensions: [{ Name: 'StreamName', Value: { Ref: streamLogicalId } as any }]
    }

    return {
      resourceName: makeResourceName('Kinesis', streamLogicalId, type),
      resource: createAlarm(kinesisAlarmProperties, context)
    }
  }
}
