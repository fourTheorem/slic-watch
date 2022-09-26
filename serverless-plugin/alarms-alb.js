'use strict'

const { makeResourceName, getStatisticName } = require('./util')

/**
 * @param {object} albAlarmConfig The fully resolved alarm configuration
 */
module.exports = function ALBlarms (albAlarmConfig, context) {
  return {
    createALBAlarms
  }

  /**
   * Add all required Application Load Balancer alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createALBAlarms (cfTemplate) {
    const loadBalancerResources = cfTemplate.getResourcesByType(
      'AWS::ElasticLoadBalancingV2::LoadBalancer'
    )

    for (const [loadBalancerResourceName, loadBalancerResource] of Object.entries(loadBalancerResources)) {
      if (albAlarmConfig.HTTPCode_ELB_5XX_Count && albAlarmConfig.HTTPCode_ELB_5XX_Count.enabled) {
        const httpCodeELB5XXCount = createHTTPCodeELB5XXCountAlarm(
          loadBalancerResourceName,
          loadBalancerResource,
          albAlarmConfig.HTTPCode_ELB_5XX_Count
        )
        cfTemplate.addResource(httpCodeELB5XXCount.resourceName, httpCodeELB5XXCount.resource)
      }

      if (albAlarmConfig.RejectedConnectionCount && albAlarmConfig.RejectedConnectionCount.enabled) {
        const rejectedConnectionCount = createRejectedConnectionCountAlarm(
          loadBalancerResourceName,
          loadBalancerResource,
          albAlarmConfig.RejectedConnectionCount
        )
        cfTemplate.addResource(rejectedConnectionCount.resourceName, rejectedConnectionCount.resource)
      }
    }
  }

  function createLoadBalancerAlarm (
    alarmName,
    alarmDescription,
    loadBalancerResourceName, // Logical ID of the CloudFormation Load Balancer Resource
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    extendedStatistic,
    evaluationPeriods,
    treatMissingData
  ) {
    const loadBalancerFullName = { 'Fn::GetAtt': [loadBalancerResourceName, 'LoadBalancerFullName'] }
    const metricProperties = {
      Dimensions: [{ Name: 'LoadBalancer', Value: loadBalancerFullName }],
      MetricName: metricName,
      Namespace: 'AWS/ApplicationELB',
      Period: period,
      Statistic: statistic,
      ExtendedStatistic: extendedStatistic
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

  function createHTTPCodeELB5XXCountAlarm (loadBalancerResourceName, loadBalancerResource, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', loadBalancerResourceName, 'HTTPCodeELB5XXCount'),
      resource: createLoadBalancerAlarm(
        `LoadBalancerHTTPCodeELB5XXCountAlarm_${loadBalancerResourceName}`,
        `LoadBalancer HTTP Code ELB 5XX Count ${getStatisticName(config)} for ${loadBalancerResourceName} breaches ${threshold}`,
        loadBalancerResourceName,
        config.ComparisonOperator,
        threshold,
        'HTTPCode_ELB_5XX_Count', // metricName
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createRejectedConnectionCountAlarm (loadBalancerResourceName, loadBalancerResource, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', loadBalancerResourceName, 'RejectedConnectionCount'),
      resource: createLoadBalancerAlarm(
        `LoadBalancerRejectedConnectionCountAlarm_${loadBalancerResourceName}`,
        `LoadBalancer Rejected Connection Count ${getStatisticName(config)} for ${loadBalancerResourceName} breaches ${threshold}`,
        loadBalancerResourceName,
        config.ComparisonOperator,
        threshold,
        'RejectedConnectionCount', // metricName
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }
}
