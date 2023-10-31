import * as stringcase from 'case'

import type { Template } from 'cloudform'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import type { AlarmActionsConfig, AlarmTemplate, CloudFormationResources, OptionalAlarmProps, SlicWatchMergedConfig } from './alarm-types'
import { getResourcesByType } from '../cf-template'
import type { SlicWatchAlbAlarmsConfig } from './alb'
import type { SlicWatchDynamoDbAlarmsConfig } from './dynamodb'
import type { SlicWatchEventsAlarmsConfig } from './eventbridge'
import type { SlicWatchSnsAlarmsConfig } from './sns'
import type { SlicWatchSfAlarmsConfig } from './step-functions'

/*
 * RegEx to filter out invalid CloudFormation Logical ID characters
 */
const LOGICAL_ID_FILTER_REGEX = /[^a-z0-9]/gi

/**
 * Alarm properties such as the description and dimensions vary according to the
 * specific resource and metric type. These can only be provided when we have all
 * properties for the underlying resource. This function type can be used to
 * generate these properties from the underlying CloudFormation resource.
 *
 * For example, if we are creating an alarm for an Application Load Balancer, we
 * can generate a description and dimensions from the CloudFormation resource for the
 * load balancer, referencing that load balancer's logical ID, name or "LoadBalancerFullName"
 */
type SpecificAlarmPropertiesGeneratorFunction = (metric: string, resourceName: string, config: SlicWatchMergedConfig) => Omit<AlarmProperties, OptionalAlarmProps>

type CommonAlarmsConfigs = SlicWatchAlbAlarmsConfig<SlicWatchMergedConfig> | SlicWatchDynamoDbAlarmsConfig<SlicWatchMergedConfig> | SlicWatchEventsAlarmsConfig<SlicWatchMergedConfig> | SlicWatchSnsAlarmsConfig<SlicWatchMergedConfig> | SlicWatchSfAlarmsConfig<SlicWatchMergedConfig>

/**
 * Create CloudFormation 'AWS::CloudWatch::Alarm' resources based on metrics for a specfic resources type
 *
 * @param type The resource CloudFormation type, e.g., `AWS::Lambda::Function`
 * @param service A human readable name for the service, e.g., 'Lambda'
 * @param metrics A list of metric names to use in the alarms
 * @param config The alarm configuration for this specific resource type
 * @param alarmActionsConfig Alarm actions // TODO - see if we can refactor and maybe roll into config
 * @param compiledTemplate The CloudFormation template to use in finding matching resources
 * @param genSpecificAlarmProps A callback function used to construct alarm properties from the specific resource's properties
 *
 * @returns An object containing the alarm resources in CloudFormation syntax by logical ID
 */
export function createCfAlarms (
  type: string, service: string, metrics: string[], config: CommonAlarmsConfigs, alarmActionsConfig: AlarmActionsConfig,
  compiledTemplate: Template, genSpecificAlarmProps: SpecificAlarmPropertiesGeneratorFunction
): CloudFormationResources {
  const resources: CloudFormationResources = {}
  const resourcesOfType = getResourcesByType(type, compiledTemplate)

  for (const resourceLogicalId of Object.keys(resourcesOfType)) {
    for (const metric of metrics) {
      const { enabled, ...rest } = config[metric]
      if (enabled !== false) {
        const alarm = genSpecificAlarmProps(metric, resourceLogicalId, rest)
        const alarmLogicalId = makeAlarmLogicalId(service, resourceLogicalId, metric)
        const resource = createAlarm({
          MetricName: metric,
          ...alarm,
          ...rest
        }, alarmActionsConfig)
        resources[alarmLogicalId] = resource
      }
    }
  }
  return resources
}
/**
 * Create a CloudFormation Alarm resourc
 *
 * @param alarmProperties The alarm configuration for this specific resource type
 * @param context Alarm actions
 *
 * @returns An template object for the Cloudformation alarm
 */

export function createAlarm (alarmProperties: AlarmProperties, context?: AlarmActionsConfig): AlarmTemplate {
  return {
    Type: 'AWS::CloudWatch::Alarm',
    Properties: {
      ActionsEnabled: true,
      AlarmActions: context?.alarmActions,
      ...alarmProperties
    }
  }
}

/**
 * Generate a CloudFormation logical identifier for an Alarm resource based on the service,
 * it's "given name" (any descriptive name), and a human-readable identifier for the metrics
 *
 * @param service The AWS Service name
 * @param givenName A human-readable name for the alarm
 * @param metricIdentifier A human-readable identifier for the related metric(s)
 *
 * @returns A valid CloudFormation logicalId
 */
export function makeAlarmLogicalId (service: string, givenName: string, metricIdentifier: string) {
  let normalisedName
  if (service === 'SNS') {
    // We keep SNS logical IDs unaltered for backwards compatibility with older syntax, because altering logical IDs
    // can cause updates happening as a create-new-then-delete-old sequence. If other unique fields
    // in the resource haven't changed between the old and new version, the create will fail, causing the
    // whole deployment to fail.
    normalisedName = givenName
  } else {
    normalisedName = stringcase.pascal(givenName).replace(LOGICAL_ID_FILTER_REGEX, '')
  }
  const normalisedMetricIdentifier = metricIdentifier.replace(LOGICAL_ID_FILTER_REGEX, '')
  return `slicWatch${service}${normalisedMetricIdentifier}Alarm${normalisedName}`
}

/**
 * Determine the presentation name for an alarm statistic
 *
 * @param alarmConfig The alarm configuration for this specific resource type
 * @returns  An statistic type for specific resource
 */
export function getStatisticName (alarmConfig: AlarmProperties) {
  return alarmConfig.Statistic ?? alarmConfig.ExtendedStatistic
}
