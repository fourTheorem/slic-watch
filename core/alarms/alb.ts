'use strict'

import { makeResourceName, getStatisticName }from '../util'
import { CfResource, CloudFormationTemplate, Statistic } from '../cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'

export type AlbAlarmConfig = {
  enabled?: boolean
  HTTPCode_ELB_5XX_Count: AlarmConfig,
  RejectedConnectionCount: AlarmConfig
}

export type AlbAlarm = Alarm & {
  loadBalancerResourceName: string
} 


/**
 * albAlarmConfig The fully resolved alarm configuration
 */
export default function ALBAlarms (albAlarmConfig: AlbAlarmConfig, context: Context) {
  return {
    createALBAlarms
  }

  /**
   * Add all required Application Load Balancer alarms for Application Load Balancer to the provided CloudFormation template
   * based on the resources found within
   *
   *  A CloudFormation template object
   */
  function createALBAlarms (cfTemplate: CloudFormationTemplate) {
    const loadBalancerResources = cfTemplate.getResourcesByType(
      'AWS::ElasticLoadBalancingV2::LoadBalancer'
    )

    for (const [loadBalancerResourceName, loadBalancerResource] of Object.entries(loadBalancerResources)) {
      if (albAlarmConfig.HTTPCode_ELB_5XX_Count && albAlarmConfig.HTTPCode_ELB_5XX_Count.enabled) {
        const httpCodeELB5XXCount = createHTTPCodeELB5XXCountAlarm(
          loadBalancerResourceName,
          loadBalancerResource,
          albAlarmConfig.HTTPCode_ELB_5XX_Count
        )
        cfTemplate.addResource(httpCodeELB5XXCount.resourceName, httpCodeELB5XXCount.resource)
      }

      if (albAlarmConfig.RejectedConnectionCount && albAlarmConfig.RejectedConnectionCount.enabled) {
        const rejectedConnectionCount = createRejectedConnectionCountAlarm(
          loadBalancerResourceName,
          loadBalancerResource,
          albAlarmConfig.RejectedConnectionCount
        )
        cfTemplate.addResource(rejectedConnectionCount.resourceName, rejectedConnectionCount.resource)
      }
    }
  }

  function createHTTPCodeELB5XXCountAlarm (loadBalancerResourceName: string, loadBalancerResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const albAlarmConfig:AlbAlarm = {
      alarmName:`LoadBalancerHTTPCodeELB5XXCountAlarm_${loadBalancerResourceName}` ,
      alarmDescription: `LoadBalancer HTTP Code ELB 5XX Count ${getStatisticName(config)} for ${loadBalancerResourceName} breaches ${threshold}`,
      loadBalancerResourceName, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'HTTPCode_ELB_5XX_Count',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/ApplicationELB',
      dimensions: [
        { Name: 'LoadBalancer', Value: { 'Fn::GetAtt': [loadBalancerResourceName, 'LoadBalancerFullName'] } }
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', loadBalancerResourceName, 'HTTPCodeELB5XXCount'),
      resource: createAlarm(albAlarmConfig, context)
 }
}

  function createRejectedConnectionCountAlarm (loadBalancerResourceName: string, loadBalancerResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const albAlarmConfig: AlbAlarm = {
      alarmName:`LoadBalancerRejectedConnectionCountAlarm_${loadBalancerResourceName}` ,
      alarmDescription: `LoadBalancer Rejected Connection Count ${getStatisticName(config)} for ${loadBalancerResourceName} breaches ${threshold}`,
      loadBalancerResourceName, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'RejectedConnectionCount',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/ApplicationELB',
      dimensions: [
        { Name: 'LoadBalancer', Value: { 'Fn::GetAtt': [loadBalancerResourceName, 'LoadBalancerFullName'] } }
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', loadBalancerResourceName, 'RejectedConnectionCount'),
      resource: createAlarm(albAlarmConfig, context)
    }
  }
}
