
import type { ResourceType } from '../cf-template'
import { getResourcesByType } from '../cf-template'
import type { Context, DefaultAlarmsProperties, CfAlarmsProperties } from './default-config-alarms'
import { createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

export interface AlbTargetAlarmsConfig {
  enabled?: boolean
  HTTPCode_Target_5XX_Count: DefaultAlarmsProperties
  UnHealthyHostCount: DefaultAlarmsProperties
  LambdaInternalError: DefaultAlarmsProperties
  LambdaUserError: DefaultAlarmsProperties
}

type TargetGroupMetrics = 'HTTPCode_Target_5XX_Count' | 'UnHealthyHostCount'

type TargetGroupLambdaMetrics = 'LambdaInternalError' | 'LambdaUserError'

function getResourceByName (resourceName: string, compiledTemplate): Resource {
  return compiledTemplate.Resources[resourceName]
}

const executionMetrics: TargetGroupMetrics[] = [
  'HTTPCode_Target_5XX_Count',
  'UnHealthyHostCount'
]

const executionMetricsLambda: TargetGroupLambdaMetrics[] = [
  'LambdaInternalError',
  'LambdaUserError'
]

/**
 * For a given target group defined by its CloudFormation resources Logical ID, find any load balancer
 * that relates to the target group by finding associated ListenerRules, their Listener and each Listener's
 * referenced load balancer.
 *
 * Target Group CloudFormation logicalID
 * A CloudFormation template instance
 * All Load Balancers CloudFormation logicalIDs
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

function alarmProperty (targetGroupResourceName: string, metrics: string[], loadBalancerLogicalIds: string[], AlbTargetAlarmsConfig: AlbTargetAlarmsConfig, compiledTemplate: Template, context: Context) {
  const resources = {}
  for (const metric of metrics) {
    for (const loadBalancerLogicalId of loadBalancerLogicalIds) {
      const config: DefaultAlarmsProperties = AlbTargetAlarmsConfig[metric]
      if (config.enabled !== false) {
        const { enabled, ...rest } = config
        const AlbTargetAlarmsConfig: CfAlarmsProperties = {
          AlarmName: `LoadBalancer${metric.replaceAll('_', '')}Alarm_${targetGroupResourceName}`,
          AlarmDescription: `LoadBalancer ${metric} ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${config.Threshold}`,
          MetricName: metric,
          Statistic: config.Statistic,
          Namespace: 'AWS/ApplicationELB',
          Dimensions: [
            { Name: 'TargetGroup', Value: `\${${targetGroupResourceName}.TargetGroupFullName}` },
            { Name: 'LoadBalancer', Value: `\${${loadBalancerLogicalId}.LoadBalancerFullName}` }
          ],
          ...rest
        }
        const resourceName = makeResourceName('LoadBalancer', targetGroupResourceName, metric)
        const resource = createAlarm(AlbTargetAlarmsConfig, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}

/**
 * The fully resolved alarm configuration
 */
export default function createALBTargetAlarms (albTargetAlarmsConfig: AlbTargetAlarmsConfig, context: Context, compiledTemplate: Template) {
/**
 * Add all required Application Load Balancer alarms for Target Group to the provided CloudFormation template
 * based on the resources found within
 *
 * A CloudFormation template object
 */

  const targetGroupResources = getResourcesByType('AWS::ElasticLoadBalancingV2::TargetGroup', compiledTemplate)
  const resources = {}
  for (const [targetGroupResourceName, targetGroupResource] of Object.entries(targetGroupResources)) {
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(targetGroupResourceName, compiledTemplate)
    Object.assign(resources, alarmProperty(targetGroupResourceName, executionMetrics, loadBalancerLogicalIds, albTargetAlarmsConfig, compiledTemplate, context))

    if (targetGroupResource.Properties?.TargetType === 'lambda') {
      Object.assign(resources, alarmProperty(targetGroupResourceName, executionMetricsLambda, loadBalancerLogicalIds, albTargetAlarmsConfig, compiledTemplate, context))
    }
  }
  return resources
}
