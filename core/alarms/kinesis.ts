'use strict'

import { getResourcesByType } from '../cf-template'
import type { Context, DefaultAlarmsProperties, CfAlarmsProperties } from './default-config-alarms'
import { createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import type Template from 'cloudform-types/types/template'

export interface KinesisAlarmsConfig {
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
 * Add all required Kinesis Data Stream alarms to the provided CloudFormation template
 * based on the resources found within
 *  A CloudFormation template object
 */
export default function createKinesisAlarms (kinesisAlarmsConfig: KinesisAlarmsConfig, context: Context, compiledTemplate: Template) {
  const resources = {}
  const streamResources = getResourcesByType('AWS::Kinesis::Stream', compiledTemplate)

  for (const [streamResourceName] of Object.entries(streamResources)) {
    for (const [type, metric] of Object.entries(kinesisAlarmTypes)) {
      const config: DefaultAlarmsProperties = kinesisAlarmsConfig[metric]
      const { enabled, ...rest } = config
      if (config.enabled !== false) {
        const KinesisAlarmsConfig: CfAlarmsProperties = {
          AlarmName: `Kinesis_${type}_${streamResourceName}`,
          AlarmDescription: `Kinesis ${getStatisticName(config)} ${metric} for ${streamResourceName} breaches ${config.Threshold} milliseconds`,
          MetricName: metric,
          Namespace: 'AWS/Kinesis',
          Dimensions: [{ Name: 'StreamName', Value: { Ref: streamResourceName } as any }],
          ...rest
        }
        const resourceName = makeResourceName('Kinesis', streamResourceName, type)
        const resource = createAlarm(KinesisAlarmsConfig, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}
