import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'

import { getResourcesByType } from '../cf-template'
import type { Context, SlicWatchAlarmConfig } from './alarm-types'
import { createAlarm, getStatisticName, makeResourceName } from './alarm-utils'

export interface KinesisAlarmsConfig {
  enabled?: boolean
  'GetRecords.IteratorAgeMilliseconds': SlicWatchAlarmConfig
  ReadProvisionedThroughputExceeded: SlicWatchAlarmConfig
  WriteProvisionedThroughputExceeded: SlicWatchAlarmConfig
  'PutRecord.Success': SlicWatchAlarmConfig
  'PutRecords.Success': SlicWatchAlarmConfig
  'GetRecords.Success': SlicWatchAlarmConfig
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
 * Add all required Kinesis Data Stream alarms to the provided CloudFormation template
 * based on the resources found within
 *
 * @param kinesisAlarmsConfig The fully resolved alarm configuration for Kinesis Data Streams
 * @param context Deployment context (alarmActions)
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns Kinesis Data Stream-specific CloudFormation Alarm resources
 */
export default function createKinesisAlarms (kinesisAlarmsConfig: KinesisAlarmsConfig, context: Context, compiledTemplate: Template) {
  const resources = {}
  const streamResources = getResourcesByType('AWS::Kinesis::Stream', compiledTemplate)

  for (const [streamLogicalId] of Object.entries(streamResources)) {
    for (const [type, metric] of Object.entries(kinesisAlarmTypes)) {
      const config: SlicWatchAlarmConfig = kinesisAlarmsConfig[metric]
      if (config.enabled !== false) {
        const { enabled, ...rest } = config
        const alarmProps = rest as AlarmProperties // All mandatory properties are set following cascading
        const kinesisAlarmProperties: AlarmProperties = {
          AlarmName: `Kinesis_${type}_${streamLogicalId}`,
          AlarmDescription: `Kinesis ${getStatisticName(config)} ${metric} for ${streamLogicalId} breaches ${config.Threshold} milliseconds`,
          MetricName: metric,
          Namespace: 'AWS/Kinesis',
          Dimensions: [{ Name: 'StreamName', Value: { Ref: streamLogicalId } as any }],
          ...alarmProps
        }
        const resourceName = makeResourceName('Kinesis', streamLogicalId, type)
        const resource = createAlarm(kinesisAlarmProperties, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}
