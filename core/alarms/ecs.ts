'use strict'

import { getResourcesByType } from '../cf-template'
import type { Context, DefaultAlarmsProperties, CfAlarmsProperties } from './default-config-alarms'
import { createAlarm } from './default-config-alarms'
import type Template from 'cloudform-types/types/template'

export interface EcsAlarmsConfig {
  enabled?: boolean
  MemoryUtilization: DefaultAlarmsProperties
  CPUUtilization: DefaultAlarmsProperties
}

type EcsMEtrics = 'MemoryUtilization' | 'CPUUtilization'

/**
 * Given CloudFormation syntax for an ECS cluster, derive CloudFormation syntax for
 * the cluster's name
 *
 * @param  cluster CloudFormation syntax for an ECS cluster
 * @returns CloudFormation syntax for the cluster's name
 */
export function resolveEcsClusterNameAsCfn (cluster): any {
  if (typeof cluster === 'string') {
    if (cluster.startsWith('arn:')) {
      return cluster.split(':').pop()?.split('/').pop()
    }
    return cluster
  }
  if (cluster.GetAtt != null && cluster.GetAtt[1] === 'Arn') {
    // AWS::ECS::Cluster returns the cluster name for 'Ref'
    return { Ref: cluster.GetAtt[0] }
  }
  return cluster // Fallback to name
}

const executionMetrics: EcsMEtrics[] = ['MemoryUtilization', 'CPUUtilization']

/**
 * ecsAlarmsConfig The fully resolved alarm configuration
 */
export default function createECSAlarms (ecsAlarmsConfig: EcsAlarmsConfig, context: Context, compiledTemplate: Template) {
  /**
   * Add all required ECS alarms to the provided CloudFormation template
   * based on the ECS Service resources
   *
   * A CloudFormation template object
   */

  const resources = {}
  const serviceResources = getResourcesByType('AWS::ECS::Service', compiledTemplate)

  for (const [serviceResourceName, serviceResource] of Object.entries(serviceResources)) {
    for (const metric of executionMetrics) {
      const cluster = serviceResource.Properties?.Cluster
      const clusterName = resolveEcsClusterNameAsCfn(cluster)
      const config = ecsAlarmsConfig[metric]
      if (config.enabled !== false) {
        const { enabled, ...rest } = config
        const ecsAlarmProperties: CfAlarmsProperties = {
          AlarmName: `ECS_${metric.replaceAll('Utilization', 'Alarm')}_\${${serviceResourceName}.Name}`,
          AlarmDescription: `ECS ${metric} for ${serviceResourceName}.Name breaches ${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/ECS',
          Dimensions: [
            { Name: 'ServiceName', Value: `\${${serviceResourceName}.Name}` },
            { Name: 'ClusterName', Value: clusterName }
          ],
          ...rest
        }
        const resourceName = `slicWatch${metric}Alarm${serviceResourceName}`
        const resource = createAlarm(ecsAlarmProperties, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}
