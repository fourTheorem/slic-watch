import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import { getResourcesByType } from '../cf-template'
import type { Context, InputOutput, SlicWatchAlarmConfig, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm, getStatisticName, makeResourceName } from './alarm-utils'

export interface SlicWatchKinesisAlarmsConfig<T extends InputOutput> extends SlicWatchAlarmConfig {
  'GetRecords.IteratorAgeMilliseconds': T
  ReadProvisionedThroughputExceeded: T
  WriteProvisionedThroughputExceeded: T
  'PutRecord.Success': T
  'PutRecords.Success': T
  'GetRecords.Success': T
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
export default function createKinesisAlarms (kinesisAlarmsConfig: SlicWatchKinesisAlarmsConfig<SlicWatchMergedConfig>, context: Context, compiledTemplate: Template) {
  const resources = {}
  const streamResources = getResourcesByType('AWS::Kinesis::Stream', compiledTemplate)

  for (const [streamLogicalId] of Object.entries(streamResources)) {
    for (const [type, metric] of Object.entries(kinesisAlarmTypes)) {
      const config: SlicWatchMergedConfig = kinesisAlarmsConfig[metric]
      if (config.enabled !== false) {
        const { enabled, ...rest } = config
        const kinesisAlarmProperties: AlarmProperties = {
          AlarmName: Fn.Sub(`Kinesis_${type}_\${${streamLogicalId}}`, {}),
          AlarmDescription: Fn.Sub(`Kinesis ${getStatisticName(config)} ${metric} for \${${streamLogicalId}} breaches ${config.Threshold} milliseconds`, {}),
          MetricName: metric,
          Namespace: 'AWS/Kinesis',
          Dimensions: [{ Name: 'StreamName', Value: Fn.Ref(streamLogicalId) }],
          ...rest
        }
        const resourceName = makeResourceName('Kinesis', streamLogicalId, type)
        const resource = createAlarm(kinesisAlarmProperties, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}
