'use strict'

import { type ResourceType, getResourcesByType, addResource } from '../cf-template'
import { type Context, createAlarm, type ReturnAlarm, type SlicWatchAlarmProperties } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

export interface AlbTargetAlarmProperties {
  enabled: boolean
  HTTPCode_Target_5XX_Count: SlicWatchAlarmProperties
  UnHealthyHostCount: SlicWatchAlarmProperties
  LambdaInternalError: SlicWatchAlarmProperties
  LambdaUserError: SlicWatchAlarmProperties
}

export type AlbTargetAlarm = AlarmProperties & {
  TargetGroupResourceName: string
  LoadBalancerLogicalId: string
}
function getResourceByName (resourceName: string, compiledTemplate, additionalResources = {}): Resource {
  return compiledTemplate.Resources[resourceName] ?? additionalResources[resourceName]
}

/**
 * For a given target group defined by its CloudFormation resources Logical ID, find any load balancer
 * that relates to the target group by finding associated ListenerRules, their Listener and each Listener's
 * referenced load balancer.
 *
 * Target Group CloudFormation logicalID
 * A CloudFormation template instance
 * All Load Balancers CloudFormation logicalIDs
 */
export function findLoadBalancersForTargetGroup (targetGroupLogicalId: string, compiledTemplate: Template, additionalResources: ResourceType = {}): string[] {
  const allLoadBalancerLogicalIds: any = new Set()
  const allListenerRules: ResourceType = {}
  const listenerResources = getResourcesByType('AWS::ElasticLoadBalancingV2::Listener', compiledTemplate, additionalResources)

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
  const listenerRuleResources = getResourcesByType('AWS::ElasticLoadBalancingV2::ListenerRule', compiledTemplate, additionalResources)

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
    const listener = getResourceByName(listenerLogicalId, compiledTemplate, additionalResources)
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
 * The fully resolved alarm configuration
 */
export default function createALBTargetAlarms (albTargetAlarmProperties: AlbTargetAlarmProperties, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
/**
 * Add all required Application Load Balancer alarms for Target Group to the provided CloudFormation template
 * based on the resources found within
 *
 * A CloudFormation template object
 */
  const targetGroupResources = getResourcesByType('AWS::ElasticLoadBalancingV2::TargetGroup', compiledTemplate, additionalResources)
  for (const [targetGroupResourceName, targetGroupResource] of Object.entries(targetGroupResources)) {
    for (const tgLogicalId of Object.keys(targetGroupResources)) {
      const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(tgLogicalId, compiledTemplate, additionalResources)
      for (const loadBalancerLogicalId of loadBalancerLogicalIds) {
        if (albTargetAlarmProperties.HTTPCode_Target_5XX_Count?.enabled) {
          const httpCodeTarget5XXCount = createHTTPCodeTarget5XXCountAlarm(
            targetGroupResourceName,
            targetGroupResource,
            loadBalancerLogicalId,
            albTargetAlarmProperties.HTTPCode_Target_5XX_Count
          )
          addResource(httpCodeTarget5XXCount.resourceName, httpCodeTarget5XXCount.resource, compiledTemplate)
        }
        if (albTargetAlarmProperties.UnHealthyHostCount?.enabled) {
          const unHealthyHostCount = createUnHealthyHostCountAlarm(
            targetGroupResourceName,
            targetGroupResource,
            loadBalancerLogicalId,
            albTargetAlarmProperties.UnHealthyHostCount
          )
          addResource(unHealthyHostCount.resourceName, unHealthyHostCount.resource, compiledTemplate)
        }
        if (targetGroupResource.Properties?.TargetType === 'lambda') {
          if (albTargetAlarmProperties.LambdaInternalError?.enabled) {
            const lambdaInternalError = createLambdaInternalErrorAlarm(
              targetGroupResourceName,
              targetGroupResource,
              loadBalancerLogicalId,
              albTargetAlarmProperties.LambdaInternalError
            )
            addResource(lambdaInternalError.resourceName, lambdaInternalError.resource, compiledTemplate)
          }
          if (albTargetAlarmProperties.LambdaUserError?.enabled) {
            const lambdaUserError = createLambdaUserErrorAlarm(
              targetGroupResourceName,
              targetGroupResource,
              loadBalancerLogicalId,
              albTargetAlarmProperties.LambdaUserError
            )
            addResource(lambdaUserError.resourceName, lambdaUserError.resource, compiledTemplate)
          }
        }
      }
    }
  }

  function createHTTPCodeTarget5XXCountAlarm (targetGroupResourceName: string, targetGroupResource: Resource, loadBalancerLogicalId: string, config: AlarmProperties): ReturnAlarm {
    const threshold = config.Threshold
    const albTargetAlarmProperties: AlbTargetAlarm = {
      AlarmName: `LoadBalancerHTTPCodeTarget5XXCountAlarm_${targetGroupResourceName}`,
      AlarmDescription: `LoadBalancer HTTP Code Target 5XX Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      TargetGroupResourceName: targetGroupResourceName,
      LoadBalancerLogicalId: loadBalancerLogicalId,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'HTTPCode_Target_5XX_Count',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ApplicationELB',
      Dimensions: [
        { Name: 'TargetGroup', Value: `\${${targetGroupResourceName}.TargetGroupFullName}` },
        { Name: 'LoadBalancer', Value: `\${${loadBalancerLogicalId}.LoadBalancerFullName}` }
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'HTTPCodeTarget5XXCount'),
      resource: createAlarm(albTargetAlarmProperties, context)
    }
  }

  function createUnHealthyHostCountAlarm (targetGroupResourceName: string, targetGroupResource: Resource, loadBalancerLogicalId: string, config: AlarmProperties): ReturnAlarm {
    const threshold = config.Threshold
    const albTargetAlarmProperties: AlbTargetAlarm = {
      AlarmName: `LoadBalancerUnHealthyHostCountAlarm_${targetGroupResourceName}`,
      AlarmDescription: `LoadBalancer UnHealthy Host Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      TargetGroupResourceName: targetGroupResourceName,
      LoadBalancerLogicalId: loadBalancerLogicalId,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'UnHealthyHostCount',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ApplicationELB',
      Dimensions: [
        { Name: 'TargetGroup', Value: `\${${targetGroupResourceName}.TargetGroupFullName}` },
        { Name: 'LoadBalancer', Value: `\${${loadBalancerLogicalId}.LoadBalancerFullName}` }
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'UnHealthyHostCount'),
      resource: createAlarm(albTargetAlarmProperties, context)
    }
  }

  function createLambdaInternalErrorAlarm (targetGroupResourceName: string, targetGroupResource: Resource, loadBalancerLogicalId: string, config: AlarmProperties): ReturnAlarm {
    const threshold = config.Threshold
    const albTargetAlarmProperties: AlbTargetAlarm = {
      AlarmName: `LoadBalancerLambdaInternalErrorAlarm_${targetGroupResourceName}`,
      AlarmDescription: `LoadBalancer Lambda Internal Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      TargetGroupResourceName: targetGroupResourceName,
      LoadBalancerLogicalId: loadBalancerLogicalId,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'LambdaInternalError',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ApplicationELB',
      Dimensions: [
        { Name: 'TargetGroup', Value: `\${${targetGroupResourceName}.TargetGroupFullName}` },
        { Name: 'LoadBalancer', Value: `\${${loadBalancerLogicalId}.LoadBalancerFullName}` }
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaInternalError'),
      resource: createAlarm(albTargetAlarmProperties, context)
    }
  }

  function createLambdaUserErrorAlarm (targetGroupResourceName: string, targetGroupResource: Resource, loadBalancerLogicalId: string, config: AlarmProperties): ReturnAlarm {
    const threshold = config.Threshold
    const albTargetAlarmProperties: AlbTargetAlarm = {
      AlarmName: `LoadBalancerLambdaUserErrorAlarm_${targetGroupResourceName}`,
      AlarmDescription: `LoadBalancer Lambda User Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      TargetGroupResourceName: targetGroupResourceName,
      LoadBalancerLogicalId: loadBalancerLogicalId,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'LambdaUserError',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ApplicationELB',
      Dimensions: [
        { Name: 'TargetGroup', Value: `\${${targetGroupResourceName}.TargetGroupFullName}` },
        { Name: 'LoadBalancer', Value: `\${${loadBalancerLogicalId}.LoadBalancerFullName}` }
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaUserError'),
      resource: createAlarm(albTargetAlarmProperties, context)
    }
  }
}
