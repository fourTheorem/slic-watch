'use strict'

import { addResource, getResourcesByType, type ResourceType } from '../cf-template'
import type Resource from 'cloudform-types/types/resource'
import { type Context, createAlarm, type ReturnAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'

export interface AlbAlarmProperties {
  enabled?: boolean
  HTTPCode_ELB_5XX_Count: DefaultAlarmsProperties
  RejectedConnectionCount: DefaultAlarmsProperties
}

export type AlbAlarm = AlarmProperties & {
  LoadBalancerResourceName: string
}

/**
 * albAlarmProperties The fully resolved alarm configuration
 */
export default function createALBAlarms (albAlarmProperties: AlbAlarmProperties, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required Application Load Balancer alarms for Application Load Balancer to the provided CloudFormation template
   * based on the resources found within
   *
   *  A CloudFormation template object
   */
  const loadBalancerResources = getResourcesByType('AWS::ElasticLoadBalancingV2::LoadBalancer', compiledTemplate, additionalResources)

  for (const [loadBalancerResourceName, loadBalancerResource] of Object.entries(loadBalancerResources)) {
    if (albAlarmProperties.HTTPCode_ELB_5XX_Count?.enabled === true) {
      const httpCodeELB5XXCount = createHTTPCodeELB5XXCountAlarm(
        loadBalancerResourceName,
        loadBalancerResource,
        albAlarmProperties.HTTPCode_ELB_5XX_Count
      )
      addResource(httpCodeELB5XXCount.resourceName, httpCodeELB5XXCount.resource, compiledTemplate)
    }

    if (albAlarmProperties.RejectedConnectionCount?.enabled === true) {
      const rejectedConnectionCount = createRejectedConnectionCountAlarm(
        loadBalancerResourceName,
        loadBalancerResource,
        albAlarmProperties.RejectedConnectionCount
      )
      addResource(rejectedConnectionCount.resourceName, rejectedConnectionCount.resource, compiledTemplate)
    }
  }

  function createHTTPCodeELB5XXCountAlarm (loadBalancerResourceName: string, loadBalancerResource: Resource, config: AlarmProperties): ReturnAlarm {
    const threshold = config.Threshold
    const albAlarmProperties: AlbAlarm = {
      AlarmName: `LoadBalancerHTTPCodeELB5XXCountAlarm_${loadBalancerResourceName}`,
      AlarmDescription: `LoadBalancer HTTP Code ELB 5XX Count ${getStatisticName(config)} for ${loadBalancerResourceName} breaches ${threshold}`,
      LoadBalancerResourceName: loadBalancerResourceName,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'HTTPCode_ELB_5XX_Count',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ApplicationELB',
      Dimensions: [
        { Name: 'LoadBalancer', Value: `\${${loadBalancerResourceName}.LoadBalancerFullName}` }
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', loadBalancerResourceName, 'HTTPCodeELB5XXCount'),
      resource: createAlarm(albAlarmProperties, context)
    }
  }

  function createRejectedConnectionCountAlarm (loadBalancerResourceName: string, loadBalancerResource: Resource, config: AlarmProperties): ReturnAlarm {
    const threshold = config.Threshold
    const albAlarmProperties: AlbAlarm = {
      AlarmName: `LoadBalancerRejectedConnectionCountAlarm_${loadBalancerResourceName}`,
      AlarmDescription: `LoadBalancer Rejected Connection Count ${getStatisticName(config)} for ${loadBalancerResourceName} breaches ${threshold}`,
      LoadBalancerResourceName: loadBalancerResourceName,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'RejectedConnectionCount',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ApplicationELB',
      Dimensions: [
        { Name: 'LoadBalancer', Value: `\${${loadBalancerResourceName}.LoadBalancerFullName}` }
      ]
    }
    return {
      resourceName: makeResourceName('LoadBalancer', loadBalancerResourceName, 'RejectedConnectionCount'),
      resource: createAlarm(albAlarmProperties, context)
    }
  }
}
