'use strict'

import { CloudFormationTemplate } from '../cf-template'
import Resource from "cloudform-types/types/resource"
import { Context, createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"


export type AlbTargetAlarmProperties = AlarmProperties & {
  HTTPCode_Target_5XX_Count: AlarmProperties
  UnHealthyHostCount: AlarmProperties
  LambdaInternalError: AlarmProperties
  LambdaUserError: AlarmProperties
}

export type AlbTargetAlarm = AlarmProperties & {
  targetGroupResourceName: string
  loadBalancerLogicalId: string 
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
export function findLoadBalancersForTargetGroup (targetGroupLogicalId: string, cfTemplate: CloudFormationTemplate): string[] {
  const allLoadBalancerLogicalIds = new Set()
  const allListenerRules = {}
  const listenerResources = cfTemplate.getResourcesByType(
    'AWS::ElasticLoadBalancingV2::Listener'
  )

  // First, find Listeners with _default actions_ referencing the target group
  for (const listener of Object.values(listenerResources)) {
    // @ts-ignore
    for (const action of listener.Properties.DefaultActions || []) {
      const targetGroupArn = action?.TargetGroupArn
      // @ts-ignore
      if (targetGroupArn?.Ref === targetGroupLogicalId) {
        // @ts-ignore
        const loadBalancerLogicalId = listener.Properties.LoadBalancerArn?.Ref
        if (loadBalancerLogicalId) {
          allLoadBalancerLogicalIds.add(loadBalancerLogicalId)
        }
      }
    }
  }
  const listenerRuleResources = cfTemplate.getResourcesByType(
    'AWS::ElasticLoadBalancingV2::ListenerRule'
  )

  // Second, find ListenerRules with actions referncing the target group, then follow to the rules' listeners
  for (const [listenerRuleLogicalId, listenerRule ] of Object.entries(listenerRuleResources)) {
    // @ts-ignore
    for (const action of listenerRule.Properties.Actions || []) {
      const targetGroupArn = action.TargetGroupArn
      // @ts-ignore
      if (targetGroupArn.Ref === targetGroupLogicalId) {
        allListenerRules[listenerRuleLogicalId] = listenerRule
        break
      }
    }
  }

  for (const listenerRule of Object.values(allListenerRules)) {
    // @ts-ignore
    const listenerLogicalId = listenerRule.Properties.ListenerArn.Ref
    if (listenerLogicalId) {
      const listener = cfTemplate.getResourceByName(listenerLogicalId)
      if (listener) {
        // @ts-ignore
        const loadBalancerLogicalId = listener.Properties.LoadBalancerArn?.Ref
        if (loadBalancerLogicalId) {
          allLoadBalancerLogicalIds.add(loadBalancerLogicalId)
        }
      }
    }
  }
  // @ts-ignore
  return [...allLoadBalancerLogicalIds]
}


/**
 * The fully resolved alarm configuration
 */
export default function ALBTargetAlarms (albTargetAlarmProperties: AlbTargetAlarmProperties, context: Context) {
  return {
    createALBTargetAlarms
  }

  /**
   * Add all required Application Load Balancer alarms for Target Group to the provided CloudFormation template
   * based on the resources found within
   *
   * A CloudFormation template object
   */
  function createALBTargetAlarms (cfTemplate: CloudFormationTemplate) {
    const targetGroupResources = cfTemplate.getResourcesByType(
      'AWS::ElasticLoadBalancingV2::TargetGroup'
    )
    for (const [targetGroupResourceName, targetGroupResource] of Object.entries(targetGroupResources)) {
      for (const tgLogicalId of Object.keys(targetGroupResources)) {
        const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(tgLogicalId, cfTemplate)
        for (const loadBalancerLogicalId of loadBalancerLogicalIds) {
          if (albTargetAlarmProperties.HTTPCode_Target_5XX_Count && albTargetAlarmProperties.HTTPCode_Target_5XX_Count.ActionsEnabled) {
            const httpCodeTarget5XXCount = createHTTPCodeTarget5XXCountAlarm(
              targetGroupResourceName,
              targetGroupResource,
              loadBalancerLogicalId,
              albTargetAlarmProperties.HTTPCode_Target_5XX_Count
            )
            cfTemplate.addResource(httpCodeTarget5XXCount.resourceName, httpCodeTarget5XXCount.resource)
          }
          if (albTargetAlarmProperties.UnHealthyHostCount && albTargetAlarmProperties.UnHealthyHostCount.ActionsEnabled) {
            const unHealthyHostCount = createUnHealthyHostCountAlarm(
              targetGroupResourceName,
              targetGroupResource,
              loadBalancerLogicalId,
              albTargetAlarmProperties.UnHealthyHostCount
            )
            cfTemplate.addResource(unHealthyHostCount.resourceName, unHealthyHostCount.resource)
          }
          if (targetGroupResource.Properties.TargetType === 'lambda') {
            if (albTargetAlarmProperties.LambdaInternalError && albTargetAlarmProperties.LambdaInternalError.ActionsEnabled) {
              const lambdaInternalError = createLambdaInternalErrorAlarm(
                targetGroupResourceName,
                targetGroupResource,
                loadBalancerLogicalId,
                albTargetAlarmProperties.LambdaInternalError
              )
              cfTemplate.addResource(lambdaInternalError.resourceName, lambdaInternalError.resource)
            }
            if (albTargetAlarmProperties.LambdaUserError && albTargetAlarmProperties.LambdaUserError.ActionsEnabled) {
              const lambdaUserError = createLambdaUserErrorAlarm(
                targetGroupResourceName,
                targetGroupResource,
                loadBalancerLogicalId,
                albTargetAlarmProperties.LambdaUserError
              )
              cfTemplate.addResource(lambdaUserError.resourceName, lambdaUserError.resource)
            }
          }
        }
      }
    }
  }



  function createHTTPCodeTarget5XXCountAlarm (targetGroupResourceName: string, targetGroupResource: Resource , loadBalancerLogicalId: string, config: AlarmProperties) {
    const threshold = config.Threshold
    const albTargetAlarmProperties: AlbTargetAlarm = {
      AlarmName: `LoadBalancerHTTPCodeTarget5XXCountAlarm_${targetGroupResourceName}`,
      AlarmDescription:  `LoadBalancer HTTP Code Target 5XX Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      targetGroupResourceName,
      loadBalancerLogicalId,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'HTTPCode_Target_5XX_Count',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace:'AWS/ApplicationELB' ,
      Dimensions: [
        { Name: 'TargetGroup', Value: `\${${targetGroupResourceName}.TargetGroupFullName}`},
        { Name: 'LoadBalancer', Value: `\${${loadBalancerLogicalId}.LoadBalancerFullName}`}
      ] 
    }
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'HTTPCodeTarget5XXCount'),
      resource: createAlarm(albTargetAlarmProperties, context)
    }
  }

  function createUnHealthyHostCountAlarm (targetGroupResourceName: string, targetGroupResource: Resource, loadBalancerLogicalId:string, config: AlarmProperties) {
    const threshold = config.Threshold
    const albTargetAlarmProperties: AlbTargetAlarm = {
      AlarmName: `LoadBalancerUnHealthyHostCountAlarm_${targetGroupResourceName}`,
      AlarmDescription:  `LoadBalancer UnHealthy Host Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      targetGroupResourceName,
      loadBalancerLogicalId,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'UnHealthyHostCount',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace:'AWS/ApplicationELB' ,
      Dimensions: [
        { Name: 'TargetGroup', Value: `\${${targetGroupResourceName}.TargetGroupFullName}`},
        { Name: 'LoadBalancer', Value: `\${${loadBalancerLogicalId}.LoadBalancerFullName}`}
      ] 
    } 
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'UnHealthyHostCount'),
      resource: createAlarm(albTargetAlarmProperties, context)
    }
  }

  function createLambdaInternalErrorAlarm (targetGroupResourceName: string, targetGroupResource: Resource, loadBalancerLogicalId:string, config: AlarmProperties) {
    const threshold = config.Threshold
    const albTargetAlarmProperties: AlbTargetAlarm = {
      AlarmName: `LoadBalancerLambdaInternalErrorAlarm_${targetGroupResourceName}`,
      AlarmDescription: `LoadBalancer Lambda Internal Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      targetGroupResourceName,
      loadBalancerLogicalId,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'LambdaInternalError',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace:'AWS/ApplicationELB' ,
      Dimensions: [
        { Name: 'TargetGroup', Value: `\${${targetGroupResourceName}.TargetGroupFullName}`},
        { Name: 'LoadBalancer', Value: `\${${loadBalancerLogicalId}.LoadBalancerFullName}`}
      ] 
    } 
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaInternalError'),
      resource: createAlarm(albTargetAlarmProperties, context)
    }
  }

  function createLambdaUserErrorAlarm (targetGroupResourceName: string, targetGroupResource: Resource, loadBalancerLogicalId:string, config: AlarmProperties) {
    const threshold = config.Threshold
    const albTargetAlarmProperties: AlbTargetAlarm = {
      AlarmName: `LoadBalancerLambdaUserErrorAlarm_${targetGroupResourceName}`,
      AlarmDescription:  `LoadBalancer Lambda User Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      targetGroupResourceName,
      loadBalancerLogicalId,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'LambdaUserError',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace:'AWS/ApplicationELB' ,
      Dimensions: [
        { Name: 'TargetGroup', Value: `\${${targetGroupResourceName}.TargetGroupFullName}`},
        { Name: 'LoadBalancer', Value: `\${${loadBalancerLogicalId}.LoadBalancerFullName}`}
      ] 
    } 
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaUserError'),
      resource: createAlarm(albTargetAlarmProperties, context)
    }
  }
}
