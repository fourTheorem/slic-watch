import type Template from 'cloudform-types/types/template'
import type Resource from 'cloudform-types/types/resource'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createCfAlarms } from './alarm-utils'
import { getResourceAlarmConfigurationsByType, getResourcesByType } from '../cf-template'
import { filterObject } from '../filter-object'
import { getLogger } from '../logging'
import { ConfigType } from '../inputs/config-types'

export type SlicWatchS3AlarmsConfig<T extends InputOutput> = T & {
  FirstByteLatency: T
  HeadRequests: T
  '5xxErrors': T
  '4xxErrors': T
  TotalRequestLatency: T
  AllRequests: T
  GetRequests: T
  PutRequests: T
  DeleteRequests: T
  PostRequests: T
  ListRequests: T
  BytesDownloaded: T
  BytesUploaded: T
}

const logger = getLogger()

const executionMetrics = ['FirstByteLatency', 'HeadRequests', '5xxErrors', '4xxErrors', 'TotalRequestLatency', 'AllRequests', 'GetRequests', 'PutRequests', 'DeleteRequests', 'PostRequests', 'ListRequests', 'BytesDownloaded', 'BytesUploaded']

/**
 * The FilterId the S3 console uses for request metrics covering the entire bucket
 */
export const DEFAULT_S3_METRICS_FILTER_ID = 'EntireBucket'

export interface S3BucketMetricsFilters {
  entireBucket?: string
  all: string[]
}

/**
 * Convert a metrics configuration Id to a string usable in Fn::Sub. Literal Ids are returned as they are, and
 * Ref, Fn::GetAtt and string Fn::Sub Ids are converted to their Fn::Sub equivalent.
 *
 * @param id The Id of a bucket metrics configuration
 * @returns The Id as an Fn::Sub string, or undefined if it uses an unsupported intrinsic function
 */
function resolveFilterId (id: unknown): string | undefined {
  if (typeof id === 'string') {
    return id
  }
  if (id == null || typeof id !== 'object') {
    return undefined
  }
  const { Ref: ref, 'Fn::GetAtt': getAtt, 'Fn::Sub': sub } = id as Record<string, unknown>
  if (typeof ref === 'string') {
    return `\${${ref}}`
  }
  if (Array.isArray(getAtt) && getAtt.length === 2 && getAtt.every(part => typeof part === 'string')) {
    return `\${${getAtt.join('.')}}`
  }
  if (typeof getAtt === 'string') {
    return `\${${getAtt}}`
  }
  if (typeof sub === 'string') {
    return sub
  }
  return undefined
}

/**
 * Find the FilterIds of a bucket's request metrics configurations. A configuration with no Prefix, TagFilters
 * or AccessPointArn covers the entire bucket. Buckets without MetricsConfigurations, or whose
 * MetricsConfigurations cannot be resolved before deployment, are assumed to use the S3 console default.
 *
 * @param bucket The S3 bucket resource
 * @returns The entire-bucket FilterId, if any, and all FilterIds with the entire-bucket one first. FilterIds
 *          may contain Fn::Sub variables, such as ${AWS::StackName}.
 */
export function getS3BucketMetricsFilters (bucket: Resource): S3BucketMetricsFilters {
  const metricsConfigurations = bucket.Properties?.MetricsConfigurations
  if (!Array.isArray(metricsConfigurations)) {
    return { entireBucket: DEFAULT_S3_METRICS_FILTER_ID, all: [DEFAULT_S3_METRICS_FILTER_ID] }
  }
  const configurations = metricsConfigurations
    .map(config => ({ config, id: resolveFilterId(config?.Id) }))
    .filter((entry): entry is { config: any, id: string } => entry.id !== undefined)
  const entireBucket = configurations.find(({ config }) =>
    (config.Prefix == null || config.Prefix === '') &&
    (config.TagFilters == null || (Array.isArray(config.TagFilters) && config.TagFilters.length === 0)) &&
    config.AccessPointArn == null
  )
  const partial = configurations.filter(entry => entry !== entireBucket).map(({ id }) => id)
  return {
    entireBucket: entireBucket?.id,
    all: entireBucket !== undefined ? [entireBucket.id, ...partial] : partial
  }
}

/**
 * Check that every enabled S3 alarm has a threshold, for every bucket in the template
 *
 * @param s3AlarmsConfig The fully resolved alarm configuration
 * @param compiledTemplate A CloudFormation template object
 */
function assertThresholdsSpecified (s3AlarmsConfig: SlicWatchS3AlarmsConfig<SlicWatchMergedConfig>, compiledTemplate: Template) {
  const { alarmConfigurations } = getResourceAlarmConfigurationsByType(ConfigType.S3, compiledTemplate, s3AlarmsConfig)
  for (const bucketConfig of Object.values(alarmConfigurations)) {
    for (const metric of executionMetrics) {
      const config = bucketConfig[metric] as SlicWatchMergedConfig
      if (config.enabled && config.Threshold == null) {
        throw new Error(`S3 ${metric} alarm is enabled but \`Threshold\` is not specified. Please specify a threshold or disable the alarm.`)
      }
    }
  }
}

/**
 * Create CloudFormation CloudWatch Metric alarm properties that are specific to S3 resources
 * @param metric The S3 metric name
 * @param s3LogicalId The CloudFormation Logical ID of the S3 resource
 * @param filterId The FilterId of the bucket's entire-bucket metrics configuration
 * @param config The alarm config for this specific metric
 *
 * @returns S3-specific CloudFormation Alarm properties
 */
function createS3BucketAlarmCfProperties (metric: string, s3LogicalId: string, filterId: string, config: SlicWatchMergedConfig) {
  return {
    Namespace: 'AWS/S3',
    Dimensions: [
      { Name: 'BucketName', Value: Fn.Ref(s3LogicalId) },
      { Name: 'FilterId', Value: filterId.includes('${') ? Fn.Sub(filterId, {}) : filterId }
    ],
    AlarmName: Fn.Sub(`S3_${metric.replaceAll(/[-]/g, '')}_Alarm_\${${s3LogicalId}}`, {}),
    AlarmDescription: Fn.Sub(`S3 ${metric.replaceAll(/[-]/g, '')} for \${${s3LogicalId}} breaches ${config.Threshold as number}`, {})
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
  assertThresholdsSpecified(s3AlarmsConfig, compiledTemplate)
  const filterIds: Record<string, string> = {}
  for (const [bucketLogicalId, bucket] of Object.entries(getResourcesByType('AWS::S3::Bucket', compiledTemplate))) {
    const { entireBucket } = getS3BucketMetricsFilters(bucket)
    if (entireBucket !== undefined) {
      filterIds[bucketLogicalId] = entireBucket
    } else {
      logger.warn(`S3 bucket ${bucketLogicalId} has no resolvable metrics configuration covering the entire bucket. No S3 alarms will be created for it.`)
    }
  }
  const templateWithMeteredBuckets: Template = {
    Resources: filterObject(compiledTemplate.Resources ?? {}, (_, logicalId: string) => logicalId in filterIds)
  }
  return createCfAlarms(
    ConfigType.S3,
    'S3',
    executionMetrics,
    s3AlarmsConfig,
    alarmActionsConfig,
    templateWithMeteredBuckets,
    (metric, s3LogicalId, config) => createS3BucketAlarmCfProperties(metric, s3LogicalId, filterIds[s3LogicalId], config)
  )
}
