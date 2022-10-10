'use strict'

/**
 * @param {object} eventsAlarmsConfig The fully resolved alarm configuration
 */
module.exports = function eventsAlarms (eventsAlarmsConfig, context) {
  return {
    createRuleAlarms
  }

  /**
   * Add all required Events alarms to the provided CloudFormation template
   * based on the EventBridge Rule found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createRuleAlarms (cfTemplate) {
    const ruleResources = cfTemplate.getResourcesByType(
      'AWS::Events::Rule'
    )

    for (const [ruleResourceName, ruleResource] of Object.entries(ruleResources)) {
      if (eventsAlarmsConfig.FailedInvocations.enabled) {
        const failedInvocations = createFailedInvocationsAlarm(
          ruleResourceName,
          ruleResource,
          eventsAlarmsConfig.FailedInvocations
        )
        cfTemplate.addResource(failedInvocations.resourceName, failedInvocations.resource)
      }

      if (eventsAlarmsConfig.ThrottledRules.enabled) {
        const throttledRules = createThrottledRulesAlarm(
          ruleResourceName,
          ruleResource,
          eventsAlarmsConfig.ThrottledRules
        )
        cfTemplate.addResource(throttledRules.resourceName, throttledRules.resource)
      }
    }
  }

  function createRuleAlarm (
    alarmName,
    alarmDescription,
    ruleName,
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    evaluationPeriods,
    treatMissingData
  ) {
    const metricProperties = {
      Dimensions: [{ Name: 'RuleName', Value: ruleName }],
      MetricName: metricName,
      Namespace: 'AWS/Events',
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

  function createFailedInvocationsAlarm (logicalId, ruleResource, config) {
    const threshold = config.Threshold

    return {
      resourceName: `slicWatchEventsFailedInvocationsAlarm${logicalId}`,
      resource: createRuleAlarm(
        { 'Fn::Sub': `Events_FailedInvocationsAlarm_\${${logicalId}}` }, // alarmName
        { 'Fn::Sub': `EventBridge Failed Invocations for \${${logicalId}} breaches ${threshold}` }, // alarmDescription
        { Ref: logicalId },
        config.ComparisonOperator,
        threshold,
        'FailedInvocations', // metricName
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createThrottledRulesAlarm (logicalId, ruleResource, config) {
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchEventsThrottledRulesAlarm${logicalId}`,
      resource: createRuleAlarm(
        { 'Fn::Sub': `Events_ThrottledRulesAlarm_\${${logicalId}}` }, // alarmName
        { 'Fn::Sub': `EventBridge Throttled Rules for \${${logicalId}} breaches ${threshold}` }, // alarmDescription
        { Ref: logicalId },
        config.ComparisonOperator,
        threshold,
        'ThrottledRules', // metricName
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }
}
