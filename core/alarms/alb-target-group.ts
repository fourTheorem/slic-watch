'use strict'

import { makeResourceName, getStatisticName, findLoadBalancersForTargetGroup } from '../util'

import { CfResource, CloudFormationTemplate, Statistic } from '../cf-template.d'
import { AlarmConfig, Context } from './default-config-alarms.d'


export type AlbTargetAlarmConfig = {
  enabled?: boolean
  HTTPCode_Target_5XX_Count: AlarmConfig
  UnHealthyHostCount: AlarmConfig
  LambdaInternalError: AlarmConfig
  LambdaUserError: AlarmConfig
}

/**
 * The fully resolved alarm configuration
 */
export default function ALBTargetAlarms (albTargetAlarmConfig: AlbTargetAlarmConfig, context: Context) {
  return {
    createALBTargetAlarms
  }

  /**
   * Add all required Application Load Balancer alarms for Target Group to the provided CloudFormation template
   * based on the resources found within
   *
   * A CloudFormation template object
   */
  function createALBTargetAlarms (cfTemplate: CloudFormationTemplate) {
    const targetGroupResources = cfTemplate.getResourcesByType(
      'AWS::ElasticLoadBalancingV2::TargetGroup'
    )
    for (const [targetGroupResourceName, targetGroupResource] of Object.entries(targetGroupResources)) {
      for (const tgLogicalId of Object.keys(targetGroupResources)) {
        const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(tgLogicalId, cfTemplate)
        for (const loadBalancerLogicalId of loadBalancerLogicalIds) {
          if (albTargetAlarmConfig.HTTPCode_Target_5XX_Count && albTargetAlarmConfig.HTTPCode_Target_5XX_Count.enabled) {
            const httpCodeTarget5XXCount = createHTTPCodeTarget5XXCountAlarm(
              targetGroupResourceName,
              targetGroupResource,
              loadBalancerLogicalId,
              albTargetAlarmConfig.HTTPCode_Target_5XX_Count
            )
            cfTemplate.addResource(httpCodeTarget5XXCount.resourceName, httpCodeTarget5XXCount.resource)
          }
          if (albTargetAlarmConfig.UnHealthyHostCount && albTargetAlarmConfig.UnHealthyHostCount.enabled) {
            const unHealthyHostCount = createUnHealthyHostCountAlarm(
              targetGroupResourceName,
              targetGroupResource,
              loadBalancerLogicalId,
              albTargetAlarmConfig.UnHealthyHostCount
            )
            cfTemplate.addResource(unHealthyHostCount.resourceName, unHealthyHostCount.resource)
          }
          if (targetGroupResource.Properties.TargetType === 'lambda') {
            if (albTargetAlarmConfig.LambdaInternalError && albTargetAlarmConfig.LambdaInternalError.enabled) {
              const lambdaInternalError = createLambdaInternalErrorAlarm(
                targetGroupResourceName,
                targetGroupResource,
                loadBalancerLogicalId,
                albTargetAlarmConfig.LambdaInternalError
              )
              cfTemplate.addResource(lambdaInternalError.resourceName, lambdaInternalError.resource)
            }
            if (albTargetAlarmConfig.LambdaUserError && albTargetAlarmConfig.LambdaUserError.enabled) {
              const lambdaUserError = createLambdaUserErrorAlarm(
                targetGroupResourceName,
                targetGroupResource,
                loadBalancerLogicalId,
                albTargetAlarmConfig.LambdaUserError
              )
              cfTemplate.addResource(lambdaUserError.resourceName, lambdaUserError.resource)
            }
          }
        }
      }
    }
  }

  function createLoadBalancerTargetAlarm (
    alarmName: string,
    alarmDescription: string,
    targetGroupResourceName: string, // Logical ID of the CloudFormation Target Group Resource
    loadBalancerLogicalId: string,
    comparisonOperator: string,
    threshold: number,
    metricName: string,
    statistic: Statistic,
    period: number,
    extendedStatistic: string,
    evaluationPeriods: number,
    treatMissingData: string
  ) {
    const targetGroupFullName = { 'Fn::GetAtt': [targetGroupResourceName, 'TargetGroupFullName'] }
    const loadBalancerFullName = { 'Fn::GetAtt': [loadBalancerLogicalId, 'LoadBalancerFullName'] }
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

  function createHTTPCodeTarget5XXCountAlarm (targetGroupResourceName: string, targetGroupResource: CfResource , loadBalancerLogicalID, config: AlarmConfig) {
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

  function createUnHealthyHostCountAlarm (targetGroupResourceName: string, targetGroupResource: CfResource, loadBalancerLogicalID, config: AlarmConfig) {
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

  function createLambdaInternalErrorAlarm (targetGroupResourceName: string, targetGroupResource: CfResource, loadBalancerLogicalID, config: AlarmConfig) {
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

  function createLambdaUserErrorAlarm (targetGroupResourceName: string, targetGroupResource: CfResource, loadBalancerLogicalID, config: AlarmConfig) {
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
