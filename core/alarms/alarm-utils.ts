import stringcase from 'case'

import type { Template } from 'cloudform'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import type { Context, SlicWatchAlarmConfig, CfAlarmProperties, AlarmTemplate } from './alarm-types'
import { getResourcesByType } from '../cf-template'

/**
 * Alarm properties such as the description and dimensions vary according to the
 * specific resource and metric type. These can only be provided when we have all
 * properties for the underlying resource. This function type can be used
 * generate these properties from the underlying CloudFormation resource.
 *
 * For example, if we are creating an alarm for an Application Load Balancer, we
 * can generate a description and dimensions from the CloudFormation resource for the
 * load balancer, referencing that load balancer's logical ID, name or "LoadBalancerFullName"
 */
type SpecificAlarmPropertiesGeneratorFunction = (metric: string, resourceName: string, config: SlicWatchAlarmConfig) => CfAlarmProperties

/**
 * Create CloudFormation 'AWS::CloudWatch::Alarm' resources based on metrics for a specfic resources type
 *
 * @param type The resource CloudFormation type, e.g., `AWS::Lambda::Function`
 * @param service A human readable name for the service, e.g., 'Lambda'
 * @param metrics A list of metric names to use in the alarms
 * @param config The alarm configuration for this specific resource type
 * @param context Alarm actions // TODO - see if we can refactor and maybe roll into config
 * @param compiledTemplate The CloudFormation template to use in finding matching resources
 * @param genSpecificAlarmProps A callback function used to construct alarm properties from the specific resource's properties
 *
 * @returns An object containing the alarm resources in CloudFormation syntax by logical ID
 */
export function createCfAlarms (type: string, service: string, metrics: string[], config: SlicWatchAlarmConfig, context: Context, compiledTemplate: Template, genSpecificAlarmProps: SpecificAlarmPropertiesGeneratorFunction) {
  const resources = {}
  const resourcesOfType = getResourcesByType(type, compiledTemplate)

  for (const resourceLogicalId of Object.keys(resourcesOfType)) {
    for (const metric of metrics) {
      const { enabled, ...rest } = config[metric]
      if (enabled !== false) {
        const alarm = genSpecificAlarmProps(metric, resourceLogicalId, rest)
        const name = makeResourceName(service, resourceLogicalId, metric.replaceAll(/[_-]/g, ''))
        const resource = createAlarm({
          AlarmName: `${service}_${metric.replaceAll(/[_-]/g, '')}Alarm_${resourceLogicalId}`,
          AlarmDescription: `${service} ${metric.replaceAll(/[_-]/g, '')} ${getStatisticName(rest)} for ${resourceLogicalId}  breaches ${rest.Threshold}`,
          MetricName: metric,
          ...alarm,
          ...rest
        }, context)
        resources[name] = resource
      }
    }
  }
  return resources
}
/**
 * Create CloudFormation template for alarm properties
 * @param alarmProperties The alarm configuration for this specific resource type
 * @param context Alarm actions
 *
 * @returns An template object for Cloudformation alarm
 */

export function createAlarm (alarmProperties: AlarmProperties, context?: Context): AlarmTemplate {
  return {
    Type: 'AWS::CloudWatch::Alarm',
    Properties: {
      ActionsEnabled: true,
      AlarmActions: context?.alarmActions,
      ...alarmProperties
    }
  }
}

export function makeResourceName (service: string, givenName: string, alarm: string) {
  const normalisedName = stringcase.pascal(givenName)
  return `slicWatch${service}${alarm}Alarm${normalisedName}`
}

/**
 * Determine the presentation name for an alarm statistic
 *
 * @param alarmConfig The alarm configuration for this specific resource type
 * @returns  An statistic type for specific resource
 */
export function getStatisticName (alarmConfig: SlicWatchAlarmConfig) {
  return alarmConfig.Statistic ?? alarmConfig.ExtendedStatistic
}
