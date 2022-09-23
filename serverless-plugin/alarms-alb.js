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

    const targetGroupResources = cfTemplate.getResourcesByType(
      'AWS::ElasticLoadBalancingV2::TargetGroup'
    )
    for (const [targetGroupResourceName, targetGroupResource] of Object.entries(targetGroupResources)) {
      const loadBalancerName = resolveLoadBalancerLogicalIdName(loadBalancerResources)
      if (albAlarmConfig.HTTPCode_Target_5XX_Count && albAlarmConfig.HTTPCode_Target_5XX_Count.enabled) {
        const httpCodeTarget5XXCount = createHTTPCodeTarget5XXCountAlarm(
          targetGroupResourceName,
          targetGroupResource,
          loadBalancerName,
          albAlarmConfig.HTTPCode_Target_5XX_Count
        )
        cfTemplate.addResource(httpCodeTarget5XXCount.resourceName, httpCodeTarget5XXCount.resource)
      }
      if (albAlarmConfig.UnHealthyHostCount && albAlarmConfig.UnHealthyHostCount.enabled) {
        const unHealthyHostCount = createUnHealthyHostCountAlarm(
          targetGroupResourceName,
          targetGroupResource,
          loadBalancerName,
          albAlarmConfig.UnHealthyHostCount
        )
        cfTemplate.addResource(unHealthyHostCount.resourceName, unHealthyHostCount.resource)
      }
      if (albAlarmConfig.LambdaInternalError && albAlarmConfig.LambdaInternalError.enabled) {
        const lambdaInternalError = createLambdaInternalErrorAlarm(
          targetGroupResourceName,
          targetGroupResource,
          loadBalancerName,
          albAlarmConfig.LambdaInternalError
        )
        cfTemplate.addResource(lambdaInternalError.resourceName, lambdaInternalError.resource)
      }
      if (albAlarmConfig.LambdaUserError && albAlarmConfig.LambdaUserError.enabled) {
        const lambdaUserError = createLambdaUserErrorAlarm(
          targetGroupResourceName,
          targetGroupResource,
          loadBalancerName,
          albAlarmConfig.LambdaUserError
        )
        cfTemplate.addResource(lambdaUserError.resourceName, lambdaUserError.resource)
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
    console.log('1', loadBalancerFullName)
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

  function createLoadBalancerTargetAlarm (
    alarmName,
    alarmDescription,
    targetGroupResourceName, // Logical ID of the CloudFormation Target Group Resource
    loadBalancerName,
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
    console.log('3', targetGroupFullName)
    console.log(targetGroupResourceName)
    const loadBalancerFullName = { 'Fn::GetAtt': [loadBalancerName, 'LoadBalancerFullName'] }
    console.log('2', loadBalancerFullName)
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

  function createHTTPCodeTarget5XXCountAlarm (targetGroupResourceName, targetGroupResource, loadBalancerName, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'HTTPCodeTarget5XXCount'),
      resource: createLoadBalancerTargetAlarm(
        `LoadBalancerHTTPCodeTarget5XXCountAlarm_${targetGroupResourceName}`,
        `LoadBalancer HTTP Code Target 5XX Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
        targetGroupResourceName,
        loadBalancerName,
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

  function createUnHealthyHostCountAlarm (targetGroupResourceName, targetGroupResource, loadBalancerName, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'UnHealthyHostCount'),
      resource: createLoadBalancerTargetAlarm(
        `LoadBalancerUnHealthyHostCountAlarm_${targetGroupResourceName}`,
        `LoadBalancer UnHealthy Host Count ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
        targetGroupResourceName,
        loadBalancerName,
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

  function createLambdaInternalErrorAlarm (targetGroupResourceName, targetGroupResource, loadBalancerName, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaInternalError'),
      resource: createLoadBalancerTargetAlarm(
        `LoadBalancerLambdaInternalErrorAlarm_${targetGroupResourceName}`,
        `LoadBalancer Lambda Internal Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
        targetGroupResourceName,
        loadBalancerName,
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

  function createLambdaUserErrorAlarm (targetGroupResourceName, targetGroupResource, loadBalancerName, config) {
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('LoadBalancer', targetGroupResourceName, 'LambdaUserError'),
      resource: createLoadBalancerTargetAlarm(
        `LoadBalancerLambdaUserErrorAlarm_${targetGroupResourceName}`,
        `LoadBalancer Lambda User Error ${getStatisticName(config)} for ${targetGroupResourceName} breaches ${threshold}`,
        targetGroupResourceName,
        loadBalancerName,
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
