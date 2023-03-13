'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type ReturnAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

export interface EcsAlarmsConfig {
  enabled?: boolean
  MemoryUtilization: DefaultAlarmsProperties
  CPUUtilization: DefaultAlarmsProperties
}

export type EcsAlarm = AlarmProperties & {
  ServiceName: string
  ClusterName: string
}

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

/**
 * ecsAlarmsConfig The fully resolved alarm configuration
 */
export default function createECSAlarms (ecsAlarmsConfig: EcsAlarmsConfig, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required ECS alarms to the provided CloudFormation template
   * based on the ECS Service resources
   *
   * A CloudFormation template object
   */
  const serviceResources = getResourcesByType('AWS::ECS::Service', compiledTemplate, additionalResources)
  for (const [serviceResourceName, serviceResource] of Object.entries(
    serviceResources
  )) {
    const cluster = serviceResource.Properties?.Cluster
    const clusterName = resolveEcsClusterNameAsCfn(cluster)
    if (ecsAlarmsConfig.MemoryUtilization.enabled === true) {
      const memoryUtilizationAlarm = createMemoryUtilizationAlarm(
        serviceResourceName,
        serviceResource,
        clusterName,
        ecsAlarmsConfig.MemoryUtilization
      )
      addResource(memoryUtilizationAlarm.resourceName, memoryUtilizationAlarm.resource, compiledTemplate)
    }
    if (ecsAlarmsConfig.CPUUtilization.enabled === true) {
      const cpuUtilizationAlarm = createCPUUtilizationAlarm(
        serviceResourceName,
        serviceResource,
        clusterName,
        ecsAlarmsConfig.CPUUtilization
      )
      addResource(cpuUtilizationAlarm.resourceName, cpuUtilizationAlarm.resource, compiledTemplate)
    }
  }

  function createMemoryUtilizationAlarm (logicalId: string, serviceResource: Resource, clusterName: string, config: AlarmProperties): ReturnAlarm {
    const threshold = config.Threshold
    const ecsAlarmProperties: EcsAlarm = {
      AlarmName: `ECS_MemoryAlarm_\${${logicalId}.Name}`,
      AlarmDescription: `ECS memory utilization for ${logicalId}.Name breaches ${threshold}`,
      ServiceName: `\${${logicalId}.Name}`,
      ClusterName: clusterName,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'MemoryUtilization',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ECS',
      Dimensions: [
        { Name: 'ServiceName', Value: `\${${logicalId}.Name}` },
        { Name: 'ClusterName', Value: clusterName }
      ]
    }
    return {
      resourceName: `slicWatchECSMemoryAlarm${logicalId}`,
      resource: createAlarm(ecsAlarmProperties, context)
    }
  }

  function createCPUUtilizationAlarm (logicalId: string, serviceResource: Resource, clusterName: string, config: AlarmProperties): ReturnAlarm {
    const threshold = config.Threshold
    const ecsAlarmProperties: EcsAlarm = {
      AlarmName: `ECS_CPUAlarm_\${${logicalId}.Name}`,
      AlarmDescription: `ECS CPU utilization for ${logicalId}.Name breaches ${threshold}`,
      ServiceName: `\${${logicalId}.Name}`,
      ClusterName: clusterName,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'CPUUtilization',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/ECS',
      Dimensions: [
        { Name: 'ServiceName', Value: `\${${logicalId}.Name}` },
        { Name: 'ClusterName', Value: clusterName }
      ]
    }
    return {
      resourceName: `slicWatchECSCPUAlarm${logicalId}`,
      resource: createAlarm(ecsAlarmProperties, context)
    }
  }
}
