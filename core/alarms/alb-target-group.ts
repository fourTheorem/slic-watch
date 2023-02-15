'use strict'

import { makeResourceName, getStatisticName, findLoadBalancersForTargetGroup } from '../utils/util'

import { CfResource, CloudFormationTemplate, Statistic } from '../utils/cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'


export type AlbTargetAlarmConfig = {
  enabled?: boolean
  HTTPCode_Target_5XX_Count: AlarmConfig
  UnHealthyHostCount: AlarmConfig
  LambdaInternalError: AlarmConfig
  LambdaUserError: AlarmConfig
}

export type AlbTargetAlarm = Alarm & {
  targetGroupResourceName: string
  loadBalancerLogicalId: string 
} 

/**
 * The fully resolved alarm configuration
 */
export default function ALBTargetAlarms (albTargetAlarmConfig: AlbTargetAlarmConfig, context: Context) {
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
          if (albTargetAlarmConfig.HTTPCode_Target_5XX_Count && albTargetAlarmConfig.HTTPCode_Target_5XX_Count.enabled) {
            const httpCodeTarget5XXCount = createHTTPCodeTarget5XXCountAlarm(
              targetGroupResourceName,
              targetGroupResource,
              loadBalancerLogicalId,
              albTargetAlarmConfig.HTTPCode_Target_5XX_Count
            )
            cfTemplate.addResource(httpCodeTarget5XXCount.resourceName, httpCodeTarget5XXCount.resource)
          }
          if (albTargetAlarmConfig.UnHealthyHostCount && albTargetAlarmConfig.UnHealthyHostCount.enabled) {
            const unHealthyHostCount = createUnHealthyHostCountAlarm(
              targetGroupResourceName,
              targetGroupResource,
              loadBalancerLogicalId,
              albTargetAlarmConfig.UnHealthyHostCount
            )
            cfTemplate.addResource(unHealthyHostCount.resourceName, unHealthyHostCount.resource)
          }
          if (targetGroupResource.Properties.TargetType === 'lambda') {
            if (albTargetAlarmConfig.LambdaInternalError && albTargetAlarmConfig.LambdaInternalError.enabled) {
              const lambdaInternalError = createLambdaInternalErrorAlarm(
                targetGroupResourceName,
                targetGroupResource,
                loadBalancerLogicalId,
                albTargetAlarmConfig.LambdaInternalError
              )
              cfTemplate.addResource(lambdaInternalError.resourceName, lambdaInternalError.resource)
            }
            if (albTargetAlarmConfig.LambdaUserError && albTargetAlarmConfig.LambdaUserError.enabled) {
              const lambdaUserError = createLambdaUserErrorAlarm(
                targetGroupResourceName,
                targetGroupResource,
                loadBalancerLogicalId,
                albTargetAlarmConfig.LambdaUserError
              )
              cfTemplate.addResource(lambdaUserError.resourceName, lambdaUserError.resource)
            }
          }
        }
      }
    }
  }



  function createHTTPCodeTarget5XXCountAlarm (targetGroupResourceName: string, targetGroupResource: CfResource , loadBalancerLogicalId: string, config: AlarmConfig) {
    const threshold = config.Threshold
    const albTargetAlarmConfig: AlbTargetAlarm = {
      alarmName: `LoadBalancerHTTPCodeTarget5XXCountAlarm_${targetGroupResourceName}`,
      alarmDescription:  `LoadBalancer HTTP Code Target 5XX Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      targetGroupResourceName,
      loadBalancerLogicalId,
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'HTTPCode_Target_5XX_Count',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace:'AWS/ApplicationELB' ,
      dimensions: [
        { Name: 'TargetGroup', Value: { 'Fn::GetAtt': [targetGroupResourceName, 'TargetGroupFullName'] } },
        { Name: 'LoadBalancer', Value: { 'Fn::GetAtt': [loadBalancerLogicalId, 'LoadBalancerFullName'] } }
      ] 
    }
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'HTTPCodeTarget5XXCount'),
      resource: createAlarm(albTargetAlarmConfig, context)
    }
  }

  function createUnHealthyHostCountAlarm (targetGroupResourceName: string, targetGroupResource: CfResource, loadBalancerLogicalId:string, config: AlarmConfig) {
    const threshold = config.Threshold
    const albTargetAlarmConfig: AlbTargetAlarm = {
      alarmName: `LoadBalancerUnHealthyHostCountAlarm_${targetGroupResourceName}`,
      alarmDescription:  `LoadBalancer UnHealthy Host Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      targetGroupResourceName,
      loadBalancerLogicalId,
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'UnHealthyHostCount',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace:'AWS/ApplicationELB' ,
      dimensions: [
        { Name: 'TargetGroup', Value: { 'Fn::GetAtt': [targetGroupResourceName, 'TargetGroupFullName'] } },
        { Name: 'LoadBalancer', Value: { 'Fn::GetAtt': [loadBalancerLogicalId, 'LoadBalancerFullName'] } }
      ] 
    } 
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'UnHealthyHostCount'),
      resource: createAlarm(albTargetAlarmConfig, context)
    }
  }

  function createLambdaInternalErrorAlarm (targetGroupResourceName: string, targetGroupResource: CfResource, loadBalancerLogicalId:string, config: AlarmConfig) {
    const threshold = config.Threshold
    const albTargetAlarmConfig: AlbTargetAlarm = {
      alarmName: `LoadBalancerLambdaInternalErrorAlarm_${targetGroupResourceName}`,
      alarmDescription: `LoadBalancer Lambda Internal Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      targetGroupResourceName,
      loadBalancerLogicalId,
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'LambdaInternalError',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace:'AWS/ApplicationELB' ,
      dimensions: [
        { Name: 'TargetGroup', Value: { 'Fn::GetAtt': [targetGroupResourceName, 'TargetGroupFullName'] } },
        { Name: 'LoadBalancer', Value: { 'Fn::GetAtt': [loadBalancerLogicalId, 'LoadBalancerFullName'] } }
      ] 
    } 
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaInternalError'),
      resource: createAlarm(albTargetAlarmConfig, context)
    }
  }

  function createLambdaUserErrorAlarm (targetGroupResourceName: string, targetGroupResource: CfResource, loadBalancerLogicalId:string, config: AlarmConfig) {
    const threshold = config.Threshold
    const albTargetAlarmConfig: AlbTargetAlarm = {
      alarmName: `LoadBalancerLambdaUserErrorAlarm_${targetGroupResourceName}`,
      alarmDescription:  `LoadBalancer Lambda User Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
      targetGroupResourceName,
      loadBalancerLogicalId,
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'LambdaUserError',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace:'AWS/ApplicationELB' ,
      dimensions: [
        { Name: 'TargetGroup', Value: { 'Fn::GetAtt': [targetGroupResourceName, 'TargetGroupFullName'] } },
        { Name: 'LoadBalancer', Value: { 'Fn::GetAtt': [loadBalancerLogicalId, 'LoadBalancerFullName'] } }
      ] 
    } 
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaUserError'),
      resource: createAlarm(albTargetAlarmConfig, context)
    }
  }
}
