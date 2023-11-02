import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchAlarmConfig, SlicWatchMergedConfig } from './alarm-types'
import { createCfAlarms, getStatisticName } from './alarm-utils'

export interface SlicWatchAlbAlarmsConfig<T extends InputOutput> extends SlicWatchAlarmConfig {
  HTTPCode_ELB_5XX_Count: T
  RejectedConnectionCount: T
}

const executionMetrics = ['HTTPCode_ELB_5XX_Count', 'RejectedConnectionCount']

/**
 * Create CloudFormation CloudWatch Metric alarm properties that are specific to Application Load Balancer resources
 * @param metric The ALB metric name
 * @param albLogicalId The CloudFormation Logical ID of the ALB resource
 * @param config The alarm config for this specific metric
 *
 * @returns ALB-specific CloudFormation Alarm properties
 */
function createAlbAlarmCfProperties (metric: string, albLogicalId: string, config: AlarmProperties) {
  return {
    Namespace: 'AWS/ApplicationELB',
    Dimensions: [{ Name: 'LoadBalancer', Value: Fn.GetAtt(albLogicalId, 'LoadBalancerFullName') }],
    AlarmName: `LoadBalancer_${metric.replaceAll(/[_]/g, '')}Alarm_${albLogicalId}`,
    AlarmDescription: `LoadBalancer ${metric.replaceAll(/[_]/g, '')} ${getStatisticName(config)} for ${albLogicalId}  breaches ${config.Threshold}`
  }
}

/**
 * Add all required Application Load Balancer alarms for Application Load Balancer to the provided CloudFormation template
 * based on the resources found within
 *
 * @param albAlarmsConfig The fully resolved alarm configuration
 * @param context Deployment context (alarmActions)
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns ALB-specific CloudFormation Alarm resources
 */
export default function createAlbAlarms (
  albAlarmsConfig: SlicWatchAlbAlarmsConfig<SlicWatchMergedConfig>, context: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  return createCfAlarms(
    'AWS::ElasticLoadBalancingV2::LoadBalancer',
    'LoadBalancer',
    executionMetrics,
    albAlarmsConfig,
    context,
    compiledTemplate,
    createAlbAlarmCfProperties
  )
}
