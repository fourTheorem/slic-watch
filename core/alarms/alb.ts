'use strict'

import { CfResource, CloudFormationTemplate } from '../cf-template'
import { Context, createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"

export type AlbAlarmConfig = AlarmProperties & {
  HTTPCode_ELB_5XX_Count: AlarmProperties,
  RejectedConnectionCount: AlarmProperties
}

export type AlbAlarm = AlarmProperties & {
  loadBalancerResourceName: string
} 


/**
 * albAlarmProperties The fully resolved alarm configuration
 */
export default function ALBAlarms (albAlarmProperties: AlbAlarmConfig, context: Context) {
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
      if (albAlarmProperties.HTTPCode_ELB_5XX_Count && albAlarmProperties.HTTPCode_ELB_5XX_Count.ActionsEnabled) {
        const httpCodeELB5XXCount = createHTTPCodeELB5XXCountAlarm(
          loadBalancerResourceName,
          loadBalancerResource,
          albAlarmProperties.HTTPCode_ELB_5XX_Count
        )
        cfTemplate.addResource(httpCodeELB5XXCount.resourceName, httpCodeELB5XXCount.resource)
      }

      if (albAlarmProperties.RejectedConnectionCount && albAlarmProperties.RejectedConnectionCount.ActionsEnabled) {
        const rejectedConnectionCount = createRejectedConnectionCountAlarm(
          loadBalancerResourceName,
          loadBalancerResource,
          albAlarmProperties.RejectedConnectionCount
        )
        cfTemplate.addResource(rejectedConnectionCount.resourceName, rejectedConnectionCount.resource)
      }
    }
  }

  function createHTTPCodeELB5XXCountAlarm (loadBalancerResourceName: string, loadBalancerResource: CfResource, config: AlarmProperties) {
    const threshold = config.Threshold
    const albAlarmProperties:AlbAlarm = {
      AlarmName:`LoadBalancerHTTPCodeELB5XXCountAlarm_${loadBalancerResourceName}` ,
      AlarmDescription: `LoadBalancer HTTP Code ELB 5XX Count ${getStatisticName(config)} for ${loadBalancerResourceName} breaches ${threshold}`,
      loadBalancerResourceName, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'HTTPCode_ELB_5XX_Count',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/ApplicationELB',
      Dimensions: [
        { Name: 'LoadBalancer', Value: `\${${loadBalancerResourceName}.LoadBalancerFullName}`}
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', loadBalancerResourceName, 'HTTPCodeELB5XXCount'),
      resource: createAlarm(albAlarmProperties, context)
 }
}

  function createRejectedConnectionCountAlarm (loadBalancerResourceName: string, loadBalancerResource: CfResource, config: AlarmProperties) {
    const threshold = config.Threshold
    const albAlarmProperties: AlbAlarm = {
      AlarmName:`LoadBalancerRejectedConnectionCountAlarm_${loadBalancerResourceName}` ,
      AlarmDescription: `LoadBalancer Rejected Connection Count ${getStatisticName(config)} for ${loadBalancerResourceName} breaches ${threshold}`,
      loadBalancerResourceName, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'RejectedConnectionCount',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/ApplicationELB',
      Dimensions: [
        { Name: 'LoadBalancer', Value: `\${${loadBalancerResourceName}.LoadBalancerFullName}`}
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', loadBalancerResourceName, 'RejectedConnectionCount'),
      resource: createAlarm(albAlarmProperties, context)
    }
  }
}
