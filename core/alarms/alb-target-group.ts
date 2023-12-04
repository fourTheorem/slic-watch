import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm, getStatisticName, makeAlarmLogicalId } from './alarm-utils'
import type { ResourceType } from '../cf-template'
import { getResourceAlarmConfigurationsByType, getResourcesByType } from '../cf-template'
import { ConfigType } from '../inputs/config-types'

export type SlicWatchAlbTargetAlarmsConfig<T extends InputOutput> = T & {
  HTTPCode_Target_5XX_Count: T
  UnHealthyHostCount: T
  LambdaInternalError: T
  LambdaUserError: T
}

const executionMetrics = [
  'HTTPCode_Target_5XX_Count',
  'UnHealthyHostCount'
]

const executionMetricsLambda = ['LambdaInternalError', 'LambdaUserError']

/**
 * For a given target group defined by its CloudFormation resources Logical ID, find any load balancer
 * that relates to the target group by finding associated ListenerRules, their Listener and each Listener's
 * referenced load balancer.
 *
 * @param targetGroupLogicalId The CloudFormation Logical ID of the ALB Target Group
 * @param compiledTemplate A CloudFormation template objec
 *
 * @returns A list of load balancer Logical IDs relating to the target group
 */
export function findLoadBalancersForTargetGroup (targetGroupLogicalId: string, compiledTemplate: Template): string[] {
  const allLoadBalancerLogicalIds: any = new Set()
  const listenerResources = getResourcesByType('AWS::ElasticLoadBalancingV2::Listener', compiledTemplate)

  // First, find Listeners with _default actions_ referencing the target group
  for (const listener of Object.values(listenerResources)) {
    for (const action of listener.Properties?.DefaultActions ?? []) {
      const targetGroupArn = action?.TargetGroupArn
      if (targetGroupArn?.Ref === targetGroupLogicalId) {
        const loadBalancerLogicalId = listener.Properties?.LoadBalancerArn?.Ref
        if (loadBalancerLogicalId != null) {
          allLoadBalancerLogicalIds.add(loadBalancerLogicalId)
        }
      }
    }
  }

  const allListenerRules: ResourceType = {}
  // Second, find ListenerRules with actions referencing the target group, then follow to the rules' listeners
  const listenerRuleResources = getResourcesByType('AWS::ElasticLoadBalancingV2::ListenerRule', compiledTemplate)
  for (const [listenerRuleLogicalId, listenerRule] of Object.entries(listenerRuleResources)) {
    for (const action of listenerRule.Properties?.Actions ?? []) {
      const targetGroupArn = action.TargetGroupArn
      if (targetGroupArn.Ref === targetGroupLogicalId) {
        allListenerRules[listenerRuleLogicalId] = listenerRule
        break
      }
    }
  }

  for (const listenerRule of Object.values(allListenerRules)) {
    const listenerLogicalId = listenerRule.Properties?.ListenerArn.Ref
    const listener = compiledTemplate?.Resources?.[listenerLogicalId]
    if (listener != null) {
      const loadBalancerLogicalId = listener.Properties?.LoadBalancerArn?.Ref
      if (loadBalancerLogicalId != null) {
        allLoadBalancerLogicalIds.add(loadBalancerLogicalId)
      }
    }
  }
  return [...allLoadBalancerLogicalIds]
}

/**
 * Create CloudFormation CloudWatch Metric alarms that are specific to the specified Application Load Balancer Target Group resources
 *
 * @param targetGroupLogicalId The CloudFormation Logical ID of the ALB Target Group
 * @param metrics The Target Group metric names
 * @param loadBalancerLogicalIds The CloudFormation Logical IDs of the ALB resource
 * @param albTargetAlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 *
 * @returns ALB Target Group-specific CloudFormation Alarm resources
 */
function createAlbTargetCfAlarm (
  targetGroupLogicalId: string, metrics: string[], loadBalancerLogicalIds: string[], albTargetAlarmsConfig: SlicWatchAlbTargetAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig
): CloudFormationResources {
  const resources: CloudFormationResources = {}
  for (const metric of metrics) {
    for (const loadBalancerLogicalId of loadBalancerLogicalIds) {
      const config: SlicWatchMergedConfig = albTargetAlarmsConfig[metric]
      if (config.enabled) {
        const { enabled, ...rest } = config
        const albTargetAlarmProperties: AlarmProperties = {
          AlarmName: `LoadBalancer_${metric.replaceAll('_', '')}Alarm_${targetGroupLogicalId}`,
          AlarmDescription: `LoadBalancer ${metric} ${getStatisticName(config)} for ${targetGroupLogicalId} breaches ${config.Threshold}`,
          MetricName: metric,
          Statistic: config.Statistic,
          Namespace: 'AWS/ApplicationELB',
          Dimensions: [
            { Name: 'TargetGroup', Value: Fn.GetAtt(targetGroupLogicalId, 'TargetGroupFullName') },
            { Name: 'LoadBalancer', Value: Fn.GetAtt(loadBalancerLogicalId, 'LoadBalancerFullName') }
          ],
          ...rest
        }
        const alarmLogicalId = makeAlarmLogicalId('LoadBalancer', targetGroupLogicalId, metric)
        const resource = createAlarm(albTargetAlarmProperties, alarmActionsConfig)
        resources[alarmLogicalId] = resource
      }
    }
  }
  return resources
}

/**
 * Add all required Application Load Balancer alarms for a Target Group to the provided CloudFormation template
 * based on the resources found within
 *
 * @param albTargetAlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns ALB Target Group-specific CloudFormation Alarm resources
 */
export default function createAlbTargetAlarms (
  albTargetAlarmsConfig: SlicWatchAlbTargetAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  const resourceConfigs = getResourceAlarmConfigurationsByType(ConfigType.ApplicationELBTarget, compiledTemplate, albTargetAlarmsConfig)
  const resources: CloudFormationResources = {}
  for (const [targetGroupLogicalId, targetGroupResource] of Object.entries(resourceConfigs.resources)) {
    const mergedConfig = resourceConfigs.alarmConfigurations[targetGroupLogicalId]
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(targetGroupLogicalId, compiledTemplate)
    Object.assign(resources, createAlbTargetCfAlarm(targetGroupLogicalId, executionMetrics, loadBalancerLogicalIds, mergedConfig, alarmActionsConfig))

    if (targetGroupResource.Properties?.TargetType === 'lambda') {
      // Create additional alarms for Lambda-specific ALB metrics
      Object.assign(resources, createAlbTargetCfAlarm(targetGroupLogicalId, executionMetricsLambda, loadBalancerLogicalIds, mergedConfig, alarmActionsConfig))
    }
  }
  return resources
}
