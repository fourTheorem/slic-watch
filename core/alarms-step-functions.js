'use strict'

/**
 * @param {object} sfAlarmConfig The fully resolved States alarm configuration
 */
module.exports = function StatesAlarms (sfAlarmConfig, context) {
  return {
    createStatesAlarms
  }

  /**
   * Add all required Step Function alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createStatesAlarms (cfTemplate) {
    const smResources = cfTemplate.getResourcesByType(
      'AWS::StepFunctions::StateMachine'
    )
    const executionMetrics = [
      'ExecutionThrottled',
      'ExecutionsFailed',
      'ExecutionsTimedOut'
    ]

    for (const [logicalId] of Object.entries(smResources)) {
      for (const metric of executionMetrics) {
        if (sfAlarmConfig[metric].enabled) {
          const config = sfAlarmConfig[metric]
          const alarmResourceName = `slicWatchStates${metric}Alarm${logicalId}`
          const alarmResource = createStateMachineAlarm(
            { 'Fn::Sub': `StepFunctions_${metric}_\${${logicalId}.Name}` },
            { 'Fn::Sub': `StepFunctions_${metric} ${config.Statistic} for \${${logicalId}.Name}  breaches ${config.Threshold}` },
            { Ref: logicalId },
            config.ComparisonOperator,
            config.Threshold,
            metric,
            config.Statistic,
            config.Period,
            config.EvaluationPeriods,
            config.TreatMissingData
          )
          cfTemplate.addResource(alarmResourceName, alarmResource)
        }
      }
    }
  }

  function createStateMachineAlarm (
    alarmName,
    alarmDescription,
    stateMachineArn,
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    evaluationPeriods,
    treatMissingData
  ) {
    const metricProperties = {
      Dimensions: [{ Name: 'StateMachineArn', Value: stateMachineArn }],
      MetricName: metricName,
      Namespace: 'AWS/States',
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
}
