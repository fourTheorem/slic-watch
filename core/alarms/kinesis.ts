'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'

export interface KinesisAlarmProperties {
  enabled?: boolean
  'GetRecords.IteratorAgeMilliseconds': DefaultAlarmsProperties
  ReadProvisionedThroughputExceeded: DefaultAlarmsProperties
  WriteProvisionedThroughputExceeded: DefaultAlarmsProperties
  'PutRecord.Success': DefaultAlarmsProperties
  'PutRecords.Success': DefaultAlarmsProperties
  'GetRecords.Success': DefaultAlarmsProperties
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

  for (const [streamResourceName] of Object.entries(streamResources)) {
    for (const [type, metric] of Object.entries(kinesisAlarmTypes)) {
      const config: DefaultAlarmsProperties = kinesisAlarmProperties[metric]
      if (config.enabled !== false) {
        const threshold = config.Threshold
        const kinesisAlarmProperties: AlarmProperties = {
          AlarmName: `Kinesis_${type}_${streamResourceName}`,
          AlarmDescription: `Kinesis ${getStatisticName(config)} ${metric} for ${streamResourceName} breaches ${threshold} milliseconds`,
          MetricName: metric,
          Namespace: 'AWS/Kinesis',
          Dimensions: [{ Name: 'StreamName', Value: { Ref: streamResourceName } as any }],
          ...config
        }
        const resourceName = makeResourceName('Kinesis', streamResourceName, type)
        const resource = createAlarm(kinesisAlarmProperties, context)
        addResource(resourceName, resource, compiledTemplate)
      }
    }
  }
}
