'use strict'

import { resolveEcsClusterNameAsCfn } from '../utils/util'
import { CfResource, CloudFormationTemplate, Statistic } from '../utils/cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'

export type EcsAlarmsConfig = {
  enabled?: boolean
  MemoryUtilization: AlarmConfig
  CPUUtilization: AlarmConfig
}

export type EcsAlarm = Alarm & {
  serviceName,
  clusterName: string
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
      if (ecsAlarmsConfig.MemoryUtilization.enabled) {
        const memoryUtilizationAlarm = createMemoryUtilizationAlarm(
          serviceResourceName,
          serviceResource,
          clusterName,
          ecsAlarmsConfig.MemoryUtilization
        )
        cfTemplate.addResource(memoryUtilizationAlarm.resourceName, memoryUtilizationAlarm.resource)
      }
      if (ecsAlarmsConfig.CPUUtilization.enabled) {
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

  function createMemoryUtilizationAlarm (logicalId: string, serviceResource: CfResource, clusterName: string, config: AlarmConfig) {
    const threshold = config.Threshold
    const ecsAlarmConfig: EcsAlarm = {
      alarmName: { 'Fn::Sub': `ECS_MemoryAlarm_\${${logicalId}.Name}` } ,
      alarmDescription: { 'Fn::Sub': `ECS memory utilization for ${logicalId}.Name breaches ${threshold}` },
      serviceName:  { 'Fn::GetAtt': [logicalId, 'Name'] },
      clusterName,  
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'MemoryUtilization',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/ECS',
      dimensions: [
        { Name: 'ServiceName', Value: { 'Fn::GetAtt': [logicalId, 'Name'] } },
        { Name: 'ClusterName', Value: clusterName }
      ]
    }
    return {
      resourceName: `slicWatchECSMemoryAlarm${logicalId}`,
      resource: createAlarm(ecsAlarmConfig, context)
    }
  }

  function createCPUUtilizationAlarm (logicalId: string, serviceResource: CfResource, clusterName: string, config: AlarmConfig) {
    const threshold = config.Threshold
    const ecsAlarmConfig: EcsAlarm = {
      alarmName: { 'Fn::Sub': `ECS_CPUAlarm_\${${logicalId}.Name}` } ,
      alarmDescription:  { 'Fn::Sub': `ECS CPU utilization for ${logicalId}.Name breaches ${threshold}` },
      serviceName:  { 'Fn::GetAtt': [logicalId, 'Name'] },
      clusterName,  
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'CPUUtilization',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/ECS',
      dimensions: [
        { Name: 'ServiceName', Value: { 'Fn::GetAtt': [logicalId, 'Name'] } },
        { Name: 'ClusterName', Value: clusterName }
      ]
    }
    return {
      resourceName: `slicWatchECSCPUAlarm${logicalId}`,
      resource: createAlarm(ecsAlarmConfig, context)
    }
  }
}
