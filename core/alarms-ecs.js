'use strict'

const { resolveEcsClusterNameAsCfn } = require('./util')

/**
 * @param {object} ecsAlarmsConfig The fully resolved alarm configuration
 */
module.exports = function ecsAlarms (ecsAlarmsConfig, context) {
  return {
    createECSAlarms
  }

  /**
   * Add all required ECS alarms to the provided CloudFormation template
   * based on the ECS Service resources
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createECSAlarms (cfTemplate) {
    const serviceResources = cfTemplate.getResourcesByType(
      'AWS::ECS::Service'
    )
    for (const [serviceResourceName, serviceResource] of Object.entries(
      serviceResources
    )) {
      const cluster = serviceResource.Properties.Cluster
      const clusterName = resolveEcsClusterNameAsCfn(cluster)
      console.log('123456', clusterName)
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

  function createEcsAlarm (
    alarmName,
    alarmDescription,
    serviceName,
    clusterName,
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    evaluationPeriods,
    treatMissingData
  ) {
    const metricProperties = {
      Dimensions: [{ Name: 'ServiceName', Value: serviceName }, { Name: 'ClusterName', Value: clusterName }],
      MetricName: metricName,
      Namespace: 'AWS/ECS',
      Period: period,
      Statistic: statistic
    }
    return {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: context.alarmActions,
        AlarmName: alarmName,
        AlarmDescription: alarmDescription,
        EvaluationPeriods: evaluationPeriods,
        ComparisonOperator: comparisonOperator,
        Threshold: threshold,
        TreatMissingData: treatMissingData,
        ...metricProperties
      }
    }
  }

  function createMemoryUtilizationAlarm (logicalId, serviceResource, clusterName, config) {
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchECSMemoryAlarm${logicalId}`,
      resource: createEcsAlarm(
        { 'Fn::Sub': `ECS_MemoryAlarm_\${${logicalId}.Name}` },
        { 'Fn::Sub': `ECS memory utilization for ${logicalId}.Name breaches ${threshold}` },
        { 'Fn::GetAtt': [logicalId, 'Name'] },
        clusterName,
        config.ComparisonOperator,
        threshold,
        'MemoryUtilization',
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createCPUUtilizationAlarm (logicalId, serviceResource, clusterName, config) {
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchECSCPUAlarm${logicalId}`,
      resource: createEcsAlarm(
        { 'Fn::Sub': `ECS_CPUAlarm_\${${logicalId}.Name}` },
        { 'Fn::Sub': `ECS CPU utilization for ${logicalId}.Name breaches ${threshold}` },
        { 'Fn::GetAtt': [logicalId, 'Name'] },
        clusterName,
        config.ComparisonOperator,
        threshold,
        'CPUUtilization',
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }
}
