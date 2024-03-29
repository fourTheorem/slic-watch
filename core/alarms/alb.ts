import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createCfAlarms, getStatisticName } from './alarm-utils'
import { ConfigType } from '../inputs/config-types'

export type SlicWatchAlbAlarmsConfig<T extends InputOutput> = T & {
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
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns ALB-specific CloudFormation Alarm resources
 */
export default function createAlbAlarms (
  albAlarmsConfig: SlicWatchAlbAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  return createCfAlarms(
    ConfigType.ApplicationELB,
    'LoadBalancer',
    executionMetrics,
    albAlarmsConfig,
    alarmActionsConfig,
    compiledTemplate,
    createAlbAlarmCfProperties
  )
}
