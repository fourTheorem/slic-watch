'use strict'

const { makeResourceName, getStatisticName } = require('./util')

/**
 * @param {object} appSyncAlarmConfig The fully resolved alarm configuration
 */
module.exports = function appSyncAlarms (appSyncAlarmConfig, context) {
  return {
    createAppSyncAlarms
  }

  /**
   * Add all required AppSync alarms to the provided CloudFormation template
   * based on the AppSync resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createAppSyncAlarms (cfTemplate) {
    const appSyncResources = cfTemplate.getResourcesByType(
      'AWS::AppSync::GraphQLApi'
    )

    for (const [appSyncResourceName, appSyncResource] of Object.entries(appSyncResources)) {
      const alarms = []
      if (appSyncAlarmConfig['5XXError'].enabled) {
        alarms.push(create5XXAlarm(
          appSyncResourceName,
          appSyncResource,
          appSyncAlarmConfig['5XXError']
        ))
      }

      if (appSyncAlarmConfig.Latency.enabled) {
        alarms.push(createLatencyAlarm(
          appSyncResourceName,
          appSyncResource,
          appSyncAlarmConfig.Latency
        ))
      }
      for (const alarm of alarms) {
        cfTemplate.addResource(alarm.resourceName, alarm.resource)
      }
    }
  }
  function createAppSyncAlarm (
    alarmName,
    alarmDescription,
    appSyncResourceName,
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    extendedStatistic,
    evaluationPeriods,
    treatMissingData
  ) {
    const graphQLAPIId = { 'Fn::GetAtt': [appSyncResourceName, 'ApiId'] }
    const metricProperties = {
      Dimensions: [{ Name: 'GraphQLAPIId', Value: graphQLAPIId }],
      MetricName: metricName,
      Namespace: 'AWS/AppSync',
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

  function create5XXAlarm (appSyncResourceName, appSyncResource, config) {
    const graphQLName = appSyncResource.Properties.Name
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('AppSync', graphQLName, '5XXError'),
      resource: createAppSyncAlarm(
        `AppSync5XXErrorAlarm_${graphQLName}`,
        `AppSync 5XX Error ${getStatisticName(config)} for ${graphQLName} breaches ${threshold}`,
        appSyncResourceName,
        config.ComparisonOperator,
        threshold,
        '5XXError',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createLatencyAlarm (appSyncResourceName, appSyncResource, config) {
    const graphQLName = appSyncResource.Properties.Name
    const threshold = config.Threshold
    return {
      resourceName: makeResourceName('AppSync', graphQLName, 'Latency'),
      resource: createAppSyncAlarm(
        `AppSyncLatencyAlarm_${graphQLName}`,
        `AppSync Latency ${getStatisticName(config)} for ${graphQLName} breaches ${threshold}`,
        appSyncResourceName,
        config.ComparisonOperator,
        threshold,
        'Latency',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }
}
