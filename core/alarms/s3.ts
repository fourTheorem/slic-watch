import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createCfAlarms } from './alarm-utils'
import { ConfigType } from '../inputs/config-types'

export type SlicWatchS3AlarmsConfig<T extends InputOutput> = T & {
  FirstByteLatency: T
  HeadRequests: T
  '5xxErrors': T
  '4xxErrors': T
  TotalRequestLatency: T
  AllRequests: T
}

const executionMetrics = ['FirstByteLatency', 'HeadRequests', '5xxErrors', '4xxErrors', 'TotalRequestLatency', 'AllRequests']

/**
 * Create CloudFormation CloudWatch Metric alarm properties that are specific to S3 resources
 * @param metric The S3 metric name
 * @param s3LogicalId The CloudFormation Logical ID of the S3 resource
 * @param config The alarm config for this specific metric
 *
 * @returns S3-specific CloudFormation Alarm properties
 */
function createS3BucketAlarmCfProperties (metric: string, s3LogicalId: string, config: SlicWatchMergedConfig) {
  return {
    Namespace: 'AWS/S3',
      Dimensions: [
      { Name: 'BucketName', Value: Fn.Ref(s3LogicalId) },
      { Name: 'FilterId', Value: 'EntireBucket' }
    ],
    AlarmName: Fn.Sub(`S3_${metric.replaceAll(/[-]/g, '')}_Alarm_\${${s3LogicalId}}`, {}),
    AlarmDescription: Fn.Sub(`S3 ${metric.replaceAll(/[-]/g, '')} for \${${s3LogicalId}} breaches ${config.Threshold}`, {})
  }
}

/**
 * Add all required S3 alarms to the provided CloudFormation template
 *
 * @param s3AlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate A CloudFormation template object
 *
 * @returns S3-specific CloudFormation Alarm resources
 */
export default function createS3Alarms (
  s3AlarmsConfig: SlicWatchS3AlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  return createCfAlarms(
    ConfigType.S3,
    'S3',
    executionMetrics,
    s3AlarmsConfig,
    alarmActionsConfig,
    compiledTemplate,
    createS3BucketAlarmCfProperties
  )
}
