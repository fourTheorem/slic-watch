import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm } from './alarm-utils'
import { getResourceAlarmConfigurationsByType } from '../cf-template'

export type SlicWatchEcsAlarmsConfig<T extends InputOutput> = T & {
  MemoryUtilization: T
  CPUUtilization: T
}

/**
 * Given CloudFormation syntax for an ECS cluster, derive CloudFormation syntax for
 * the cluster's name
 *
 * @param  cluster CloudFormation syntax for an ECS cluster
 *
 * @returns CloudFormation syntax for the cluster's name
 */
export function resolveEcsClusterNameAsCfn (cluster: any): any {
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

const executionMetrics = ['MemoryUtilization', 'CPUUtilization']

/**
 * Add all required ECS alarms to the provided CloudFormation template
 * based on the ECS Service resources
 *
 * @param ecsAlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns ECS-specific CloudFormation Alarm resources
 */
export default function createECSAlarms (
  ecsAlarmsConfig: SlicWatchEcsAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  const resources: CloudFormationResources = {}
  const configuredResources = getResourceAlarmConfigurationsByType('AWS::ECS::Service', compiledTemplate, ecsAlarmsConfig)

  for (const [serviceLogicalId, serviceResource] of Object.entries(configuredResources.resources)) {
    for (const metric of executionMetrics) {
      const cluster = serviceResource.Properties?.Cluster
      const clusterName = resolveEcsClusterNameAsCfn(cluster)
      const config: SlicWatchMergedConfig = configuredResources.alarmConfigurations[serviceLogicalId][metric]
      const { enabled, ...rest } = config
      if (enabled) {
        const ecsAlarmProperties: AlarmProperties = {
          AlarmName: Fn.Sub(`ECS_${metric.replaceAll('Utilization', 'Alarm')}_\${${serviceLogicalId}.Name}`, {}),
          AlarmDescription: Fn.Sub(`ECS ${metric} for \${${serviceLogicalId}.Name} breaches ${config.Threshold}`, {}),
          MetricName: metric,
          Namespace: 'AWS/ECS',
          Dimensions: [
            { Name: 'ServiceName', Value: Fn.GetAtt(`${serviceLogicalId}`, 'Name') },
            { Name: 'ClusterName', Value: clusterName }
          ],
          ...rest
        }
        const resourceName = `slicWatchECS${metric.replaceAll('Utilization', 'Alarm')}${serviceLogicalId}`
        const resource = createAlarm(ecsAlarmProperties, alarmActionsConfig)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}
