import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { Context, InputOutput, SlicWatchAlarmConfig, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm, getStatisticName, makeResourceName } from './alarm-utils'
import type { ResourceType } from '../cf-template'
import { getResourcesByType } from '../cf-template'

export interface SlicWatchAlbTargetAlarmsConfig<T extends InputOutput> extends SlicWatchAlarmConfig {
  HTTPCode_Target_5XX_Count: T
  UnHealthyHostCount: T
  LambdaInternalError: T
  LambdaUserError: T
}

function getResourceByName (resourceName: string, compiledTemplate: Template) {
  return compiledTemplate?.Resources?.[resourceName] ?? null
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
 * @param compiledTemplate A CloudFormation template object
 */
export function findLoadBalancersForTargetGroup (targetGroupLogicalId: string, compiledTemplate: Template): string[] {
  const allLoadBalancerLogicalIds: any = new Set()
  const allListenerRules: ResourceType = {}
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
  const listenerRuleResources = getResourcesByType('AWS::ElasticLoadBalancingV2::ListenerRule', compiledTemplate)

  // Second, find ListenerRules with actions referncing the target group, then follow to the rules' listeners
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
    const listener = getResourceByName(listenerLogicalId, compiledTemplate)
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
 * Create CloudFormation CloudWatch Metric alarm properties that are specific to Application Load Balancer Target Group resources
 *
 * @param targetGroupLogicalId The CloudFormation Logical ID of the ALB Target Group
 * @param metrics The Target Group metris name
 * @param loadBalancerLogicalIds The CloudFormation Logical IDs of the ALB resource
 * @param albTargetAlarmsConfig The fully resolved alarm configuration
 * @param context Deployment context (alarmActions)
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns ALB Target Group-specific CloudFormation Alarm resources
 */
function createAlbTargetCfAlarm (targetGroupLogicalId: string, metrics: string[], loadBalancerLogicalIds: string[], albTargetAlarmsConfig: SlicWatchAlbTargetAlarmsConfig<SlicWatchMergedConfig>, compiledTemplate: Template, context: Context) {
  const resources = {}
  for (const metric of metrics) {
    for (const loadBalancerLogicalId of loadBalancerLogicalIds) {
      const config: SlicWatchMergedConfig = albTargetAlarmsConfig[metric]
      if (config.enabled !== false) {
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
        const resourceName = makeResourceName('LoadBalancer', targetGroupLogicalId, metric.replaceAll('_', ''))
        const resource = createAlarm(albTargetAlarmProperties, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}

/**
 * Add all required Application Load Balancer alarms for Target Group to the provided CloudFormation template
 * based on the resources found within
 *
 * @param albTargetAlarmsConfig The fully resolved alarm configuration
 * @param context Deployment context (alarmActions)
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns ALB Target Group-specific CloudFormation Alarm resources
 */
export default function createALBTargetAlarms (albTargetAlarmsConfig: SlicWatchAlbTargetAlarmsConfig<SlicWatchMergedConfig>, context: Context, compiledTemplate: Template) {
  const targetGroupResources = getResourcesByType('AWS::ElasticLoadBalancingV2::TargetGroup', compiledTemplate)
  const resources = {}
  for (const [targetGroupResourceName, targetGroupResource] of Object.entries(targetGroupResources)) {
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(targetGroupResourceName, compiledTemplate)
    Object.assign(resources, createAlbTargetCfAlarm(targetGroupResourceName, executionMetrics, loadBalancerLogicalIds, albTargetAlarmsConfig, compiledTemplate, context))

    if (targetGroupResource.Properties?.TargetType === 'lambda') {
      Object.assign(resources, createAlbTargetCfAlarm(targetGroupResourceName, executionMetricsLambda, loadBalancerLogicalIds, albTargetAlarmsConfig, compiledTemplate, context))
    }
  }
  return resources
}
