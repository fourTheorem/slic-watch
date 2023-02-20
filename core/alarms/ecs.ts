'use strict'

import { CloudFormationTemplate } from '../cf-template'
import Resource from "cloudform-types/types/resource"
import { Context, createAlarm } from './default-config-alarms'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"

export type EcsAlarmsConfig = AlarmProperties & {
  MemoryUtilization: AlarmProperties
  CPUUtilization: AlarmProperties
}

export type EcsAlarm = AlarmProperties & {
  serviceName,
  clusterName: string
}

/**
 * Given CloudFormation syntax for an ECS cluster, derive CloudFormation syntax for
 * the cluster's name
 *
 * @param  cluster CloudFormation syntax for an ECS cluster
 * @returns CloudFormation syntax for the cluster's name
 */
export function resolveEcsClusterNameAsCfn (cluster) {
  if (typeof cluster === 'string') {
    if (cluster.startsWith('arn:')) {
      return cluster.split(':').pop().split('/').pop()
    }
    return cluster
  }
  if (cluster.GetAtt && cluster.GetAtt[1] === 'Arn') {
    // AWS::ECS::Cluster returns the cluster name for 'Ref'
    return { Ref: cluster.GetAtt[0] }
  }
  return cluster // Fallback to name
}

/**
 * ecsAlarmsConfig The fully resolved alarm configuration
 */
export default function ecsAlarms (ecsAlarmsConfig: EcsAlarmsConfig, context: Context) {
  return {
    createECSAlarms
  }

  /**
   * Add all required ECS alarms to the provided CloudFormation template
   * based on the ECS Service resources
   *
   * A CloudFormation template object
   */
  function createECSAlarms (cfTemplate: CloudFormationTemplate) {
    const serviceResources = cfTemplate.getResourcesByType(
      'AWS::ECS::Service'
    )
    for (const [serviceResourceName, serviceResource] of Object.entries(
      serviceResources
    )) {
      const cluster = serviceResource.Properties.Cluster
      const clusterName = resolveEcsClusterNameAsCfn(cluster)
      if (ecsAlarmsConfig.MemoryUtilization.ActionsEnabled) {
        const memoryUtilizationAlarm = createMemoryUtilizationAlarm(
          serviceResourceName,
          serviceResource,
          clusterName,
          ecsAlarmsConfig.MemoryUtilization
        )
        cfTemplate.addResource(memoryUtilizationAlarm.resourceName, memoryUtilizationAlarm.resource)
      }
      if (ecsAlarmsConfig.CPUUtilization.ActionsEnabled) {
        const cpuUtilizationAlarm = createCPUUtilizationAlarm(
          serviceResourceName,
          serviceResource,
          clusterName,
          ecsAlarmsConfig.CPUUtilization
        )
        cfTemplate.addResource(cpuUtilizationAlarm.resourceName, cpuUtilizationAlarm.resource)
      }
    }
  }

  function createMemoryUtilizationAlarm (logicalId: string, serviceResource: Resource, clusterName: string, config: AlarmProperties) {
    const threshold = config.Threshold
    const ecsAlarmProperties: EcsAlarm = {
      AlarmName: `ECS_MemoryAlarm_\${${logicalId}.Name}`,
      AlarmDescription: `ECS memory utilization for ${logicalId}.Name breaches ${threshold}`,
      serviceName:  { 'Fn::GetAtt': [logicalId, 'Name'] },
      clusterName,  
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'MemoryUtilization',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/ECS',
      Dimensions: [
        { Name: 'ServiceName', Value: `\${${logicalId}.Name}`},
        { Name: 'ClusterName', Value: clusterName }
      ]
    }
    return {
      resourceName: `slicWatchECSMemoryAlarm${logicalId}`,
      resource: createAlarm(ecsAlarmProperties, context)
    }
  }

  function createCPUUtilizationAlarm (logicalId: string, serviceResource: Resource, clusterName: string, config: AlarmProperties) {
    const threshold = config.Threshold
    const ecsAlarmProperties: EcsAlarm = {
      AlarmName: `ECS_CPUAlarm_\${${logicalId}.Name}`,
      AlarmDescription:  `ECS CPU utilization for ${logicalId}.Name breaches ${threshold}`,
      serviceName:  { 'Fn::GetAtt': [logicalId, 'Name'] },
      clusterName,  
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'CPUUtilization',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/ECS',
      Dimensions: [
        { Name: 'ServiceName', Value: `\${${logicalId}.Name}`},
        { Name: 'ClusterName', Value: clusterName }
      ]
    }
    return {
      resourceName: `slicWatchECSCPUAlarm${logicalId}`,
      resource: createAlarm(ecsAlarmProperties, context)
    }
  }
}
