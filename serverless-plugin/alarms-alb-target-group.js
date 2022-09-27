'use strict'

const { makeResourceName, getStatisticName } = require('./util')

/**
  * Given CloudFormation syntax for an Target Group, derive CloudFormation syntax for
  * the LoadBalancer LogicalId name
  *
  * @param  loadBalancerResources  syntax for an Load Balancer Application
  * @returns CloudFormation syntax for the Load Balancer Resources
  */
function resolveLoadBalancerLogicalIdName (loadBalancerResources) {
  for (const key in loadBalancerResources) {
    if (loadBalancerResources[key].Type === 'AWS::ElasticLoadBalancingV2::LoadBalancer') {
      return key
    }
  }
}

/**
 * @param {object} albTargetAlarmConfig The fully resolved alarm configuration
 */
module.exports = function ALBTargetAlarms (albTargetAlarmConfig, context) {
  return {
    createALBTargetAlarms
  }

  /**
   * Add all required Application Load Balancer alarms for Target Group to the provided CloudFormation template
   * based on the resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createALBTargetAlarms (cfTemplate) {
    const loadBalancerResources = cfTemplate.getResourcesByType(
      'AWS::ElasticLoadBalancingV2::LoadBalancer'
    )

    const targetGroupResources = cfTemplate.getResourcesByType(
      'AWS::ElasticLoadBalancingV2::TargetGroup'
    )
    for (const [targetGroupResourceName, targetGroupResource] of Object.entries(targetGroupResources)) {
      const loadBalancerLogicalID = resolveLoadBalancerLogicalIdName(loadBalancerResources)
      if (albTargetAlarmConfig.HTTPCode_Target_5XX_Count && albTargetAlarmConfig.HTTPCode_Target_5XX_Count.enabled) {
        const httpCodeTarget5XXCount = createHTTPCodeTarget5XXCountAlarm(
          targetGroupResourceName,
          targetGroupResource,
          loadBalancerLogicalID,
          albTargetAlarmConfig.HTTPCode_Target_5XX_Count
        )
        cfTemplate.addResource(httpCodeTarget5XXCount.resourceName, httpCodeTarget5XXCount.resource)
      }
      if (albTargetAlarmConfig.UnHealthyHostCount && albTargetAlarmConfig.UnHealthyHostCount.enabled) {
        const unHealthyHostCount = createUnHealthyHostCountAlarm(
          targetGroupResourceName,
          targetGroupResource,
          loadBalancerLogicalID,
          albTargetAlarmConfig.UnHealthyHostCount
        )
        cfTemplate.addResource(unHealthyHostCount.resourceName, unHealthyHostCount.resource)
      }
      if (albTargetAlarmConfig.LambdaInternalError && albTargetAlarmConfig.LambdaInternalError.enabled) {
        const lambdaInternalError = createLambdaInternalErrorAlarm(
          targetGroupResourceName,
          targetGroupResource,
          loadBalancerLogicalID,
          albTargetAlarmConfig.LambdaInternalError
        )
        cfTemplate.addResource(lambdaInternalError.resourceName, lambdaInternalError.resource)
      }
      if (albTargetAlarmConfig.LambdaUserError && albTargetAlarmConfig.LambdaUserError.enabled) {
        const lambdaUserError = createLambdaUserErrorAlarm(
          targetGroupResourceName,
          targetGroupResource,
          loadBalancerLogicalID,
          albTargetAlarmConfig.LambdaUserError
        )
        cfTemplate.addResource(lambdaUserError.resourceName, lambdaUserError.resource)
      }
    }
  }

  function createLoadBalancerTargetAlarm (
    alarmName,
    alarmDescription,
    targetGroupResourceName, // Logical ID of the CloudFormation Target Group Resource
    loadBalancerLogicalID,
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    extendedStatistic,
    evaluationPeriods,
    treatMissingData
  ) {
    const targetGroupFullName = { 'Fn::GetAtt': [targetGroupResourceName, 'TargetGroupFullName'] }
    const loadBalancerFullName = { 'Fn::GetAtt': [loadBalancerLogicalID, 'LoadBalancerFullName'] }
    const metricProperties = {
      Dimensions: [{ Name: 'TargetGroup', Value: targetGroupFullName }, { Name: 'LoadBalancer', Value: loadBalancerFullName }],
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

  function createHTTPCodeTarget5XXCountAlarm (targetGroupResourceName, targetGroupResource, loadBalancerLogicalID, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'HTTPCodeTarget5XXCount'),
      resource: createLoadBalancerTargetAlarm(
        `LoadBalancerHTTPCodeTarget5XXCountAlarm_${targetGroupResourceName}`,
        `LoadBalancer HTTP Code Target 5XX Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
        targetGroupResourceName,
        loadBalancerLogicalID,
        config.ComparisonOperator,
        threshold,
        'HTTPCode_Target_5XX_Count',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createUnHealthyHostCountAlarm (targetGroupResourceName, targetGroupResource, loadBalancerLogicalID, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'UnHealthyHostCount'),
      resource: createLoadBalancerTargetAlarm(
        `LoadBalancerUnHealthyHostCountAlarm_${targetGroupResourceName}`,
        `LoadBalancer UnHealthy Host Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
        targetGroupResourceName,
        loadBalancerLogicalID,
        config.ComparisonOperator,
        threshold,
        'UnHealthyHostCount',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createLambdaInternalErrorAlarm (targetGroupResourceName, targetGroupResource, loadBalancerLogicalID, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaInternalError'),
      resource: createLoadBalancerTargetAlarm(
        `LoadBalancerLambdaInternalErrorAlarm_${targetGroupResourceName}`,
        `LoadBalancer Lambda Internal Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
        targetGroupResourceName,
        loadBalancerLogicalID,
        config.ComparisonOperator,
        threshold,
        'LambdaInternalError',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createLambdaUserErrorAlarm (targetGroupResourceName, targetGroupResource, loadBalancerLogicalID, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaUserError'),
      resource: createLoadBalancerTargetAlarm(
        `LoadBalancerLambdaUserErrorAlarm_${targetGroupResourceName}`,
        `LoadBalancer Lambda User Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
        targetGroupResourceName,
        loadBalancerLogicalID,
        config.ComparisonOperator,
        threshold,
        'LambdaUserError',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }
}
