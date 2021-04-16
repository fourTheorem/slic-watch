'use strict'

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
          apiGwAlarmConfig['5XXErrors']
        ),
        create4XXAlarm(
          apiResourceName,
          apiResource,
          apiGwAlarmConfig['4XXErrors']
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

  function createAvailabilityAlarm(apiResourceName, apiResource, config) {
    const apiName = apiResource.Properties.Name // TODO: Allow for Ref usage in resource names
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchApiAvailabilityAlarm${apiName}`,
      resource: createApiAlarm(
        `ApiAvailability_${apiName}`,
        `API 5XXErrors ${config.Statistic} for ${apiName} breaches ${threshold}`,
        apiName,
        config.ComparisonOperator,
        threshold,
        '5XXErrors',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic
      ),
    }
  }

  function create4XXAlarm(apiResourceName, apiResource, config) {
    const apiName = apiResource.Properties.Name // TODO: Allow for Ref usage in resource names
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchApi4XXAlarm${apiName}`,
      resource: createApiAlarm(
        `Api4XXErrors_${apiName}`,
        `API 4XXErrors ${config.Statistic} for ${apiName} breaches ${threshold}`,
        apiName,
        config.ComparisonOperator,
        threshold,
        '4XXErrors',
        config.Statistic,
        config.Period,
        config.ExtendedStatistic
      ),
    }
  }

  function createLatencyAlarm(apiResourceName, apiResource, config) {
    const apiName = apiResource.Properties.Name // TODO: Allow for Ref usage in resource names
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchApiLatencyAlarm${apiName}`,
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
