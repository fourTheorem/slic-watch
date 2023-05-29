import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { Context, SlicWatchAlarmConfig } from './alarm-types'
import { createAlarm, createCfAlarms, getStatisticName, makeResourceName } from './alarm-utils'
import { getResourcesByType } from '../cf-template'

export interface AlbAlarmsConfig {
  enabled?: boolean
  HTTPCode_ELB_5XX_Count: SlicWatchAlarmConfig
  RejectedConnectionCount: SlicWatchAlarmConfig
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
function createAlbAlarmCfProperties (metric: string, albLogicalId: string, config: SlicWatchAlarmConfig) {
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
export default function createALBAlarms (albAlarmsConfig: AlbAlarmsConfig, context: Context, compiledTemplate: Template) {
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

export function createALBAlarmsExperiment (albAlarmsConfig: AlbAlarmsConfig, context: Context, compiledTemplate: Template) {
  const resources = {}
  const type = 'AWS::ElasticLoadBalancingV2::LoadBalancer'
  const service = 'LoadBalancer'
  const resourcesOfType = getResourcesByType(type, compiledTemplate)
  for (const resourceName of Object.keys(resourcesOfType)) {
    for (const metric of executionMetrics) {
      const config: SlicWatchAlarmConfig = albAlarmsConfig[metric]
      if (config.enabled !== false) {
        const alarmProps = config as AlarmProperties // All mandatory properties are set following cascading
        const name = makeResourceName(service, resourceName, metric.replaceAll(/[_-]/g, ''))
        const resource = createAlarm({
          AlarmName: makeAlarmName(service, metric, resourceName),
          AlarmDescription: makeAlarmDescription(metric, config, resourceName),
          MetricName: metric,
          Namespace: 'AWS/ApplicationELB',
          Dimensions: [
            { Name: 'LoadBalancer', Value: `\${${resourceName}.LoadBalancerFullName}` }
          ],
          ...alarmProps
        }, context)
        resources[name] = resource
      }
    }
  }

  return resources
}

function makeAlarmName (service: string, metric: string, resourceName: string): string {
  return `${service}_${metric.replaceAll(/[_]/g, '')}Alarm_${resourceName}`
}

function makeAlarmDescription (metric: string, metricAlarmConfig: SlicWatchAlarmConfig, resourceName: string) {
  return `LoadBalancer ${metric} ${getStatisticName(metricAlarmConfig)} for ${resourceName} breaches ${metricAlarmConfig.Threshold}`
}
