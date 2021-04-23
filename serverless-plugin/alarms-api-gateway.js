'use strict'

const stringcase = require('case')

/**
 * @param {object} apiGwAlarmConfig The fully resolved alarm configuration
 */
module.exports = function ApiGatewayAlarms(apiGwAlarmConfig, context) {
  return {
    createApiGatewayAlarms,
  }

  /**
   * Add all required API Gateway alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createApiGatewayAlarms(cfTemplate) {
    const apiResources = cfTemplate.getResourcesByType(
      'AWS::ApiGateway::RestApi'
    )

    for (const [apiResourceName, apiResource] of Object.entries(apiResources)) {
      const alarms = [
        createAvailabilityAlarm(
          apiResourceName,
          apiResource,
          apiGwAlarmConfig['5XXError']
        ),
        create4XXAlarm(
          apiResourceName,
          apiResource,
          apiGwAlarmConfig['4XXError']
        ),
        createLatencyAlarm(
          apiResourceName,
          apiResource,
          apiGwAlarmConfig.Latency
        ),
      ]

      for (const alarm of alarms) {
        cfTemplate.addResource(alarm.resourceName, alarm.resource)
      }
    }
  }

  function createApiAlarm(
    alarmName,
    alarmDescription,
    apiName,
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    extendedStatistic
  ) {
    const metricProperties = {
      Dimensions: [{ Name: 'ApiName', Value: apiName }],
      MetricName: metricName,
      Namespace: 'AWS/ApiGateway',
      Period: period,
      Statistic: statistic,
      ExtendedStatistic: extendedStatistic,
    }

    return {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: [context.topicArn],
        AlarmName: alarmName,
        AlarmDescription: alarmDescription,
        EvaluationPeriods: 1,
        ComparisonOperator: comparisonOperator,
        Threshold: threshold,
        TreatMissingData: 'notBreaching',
        ...metricProperties,
      },
    }
  }

  function makeApiAlarmResourceName(apiName, alarm) {
    const normalisedName = stringcase.pascal(apiName)
    return `slicWatchApi${alarm}Alarm${normalisedName}`
  }

  function createAvailabilityAlarm(apiResourceName, apiResource, config) {
    const apiName = apiResource.Properties.Name // TODO: Allow for Ref usage in resource names (see #14)
    const threshold = config.Threshold
    return {
      resourceName: makeApiAlarmResourceName(apiName, 'Availability'),
      resource: createApiAlarm(
        `ApiAvailability_${apiName}`,
        `API 5XXError ${config.Statistic} for ${apiName} breaches ${threshold}`,
        apiName,
        config.ComparisonOperator,
        threshold,
        '5XXError',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic
      ),
    }
  }

  function create4XXAlarm(apiResourceName, apiResource, config) {
    const apiName = apiResource.Properties.Name // TODO: Allow for Ref usage in resource names (see #14)
    const threshold = config.Threshold
    return {
      resourceName: makeApiAlarmResourceName(apiName, '4XXError'),
      resource: createApiAlarm(
        `Api4XXError_${apiName}`,
        `API 4XXError ${config.Statistic} for ${apiName} breaches ${threshold}`,
        apiName,
        config.ComparisonOperator,
        threshold,
        '4XXError',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic
      ),
    }
  }

  function createLatencyAlarm(apiResourceName, apiResource, config) {
    const apiName = apiResource.Properties.Name // TODO: Allow for Ref usage in resource names (see #14)
    const threshold = config.Threshold
    return {
      resourceName: makeApiAlarmResourceName(apiName, 'Latency'),
      resource: createApiAlarm(
        `ApiLatency_${apiName}`,
        `API Latency ${config.Statistic} for ${apiName} breaches ${threshold}`,
        apiName,
        config.ComparisonOperator,
        threshold,
        'Latency',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic
      ),
    }
  }
}
