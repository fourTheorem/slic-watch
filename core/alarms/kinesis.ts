import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'
import { pascal } from 'case'

import { getResourceAlarmConfigurationsByType } from '../cf-template'
import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm, getStatisticName, makeAlarmLogicalId } from './alarm-utils'
import { ConfigType } from '../inputs/config-types'

export type SlicWatchKinesisAlarmsConfig<T extends InputOutput> = T & {
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
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns Kinesis Data Stream-specific CloudFormation Alarm resources
 */
export default function createKinesisAlarms (
  kinesisAlarmsConfig: SlicWatchKinesisAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  const resources: CloudFormationResources = {}
  const configuredResources = getResourceAlarmConfigurationsByType(ConfigType.Kinesis, compiledTemplate, kinesisAlarmsConfig)

  for (const [streamLogicalId] of Object.entries(configuredResources.resources)) {
    for (const [type, metric] of Object.entries(kinesisAlarmTypes)) {
      const config: SlicWatchMergedConfig = configuredResources.alarmConfigurations[streamLogicalId][metric]
      const { enabled, ...rest } = config
      if (enabled) {
        const kinesisAlarmProperties: AlarmProperties = {
          AlarmName: Fn.Sub(`Kinesis_${type}_\${${streamLogicalId}}`, {}),
          AlarmDescription: Fn.Sub(`Kinesis ${getStatisticName(config)} ${metric} for \${${streamLogicalId}} breaches ${config.Threshold} milliseconds`, {}),
          MetricName: metric,
          Namespace: 'AWS/Kinesis',
          Dimensions: [{ Name: 'StreamName', Value: Fn.Ref(streamLogicalId) }],
          ...rest
        }
        const alarmLogicalId = makeAlarmLogicalId('Kinesis', pascal(streamLogicalId), type)
        const resource = createAlarm(kinesisAlarmProperties, alarmActionsConfig)
        resources[alarmLogicalId] = resource
      }
    }
  }
  return resources
}
