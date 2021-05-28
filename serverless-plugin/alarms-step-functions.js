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
      'ExecutionsThrottled',
      'ExecutionsFailed',
      'ExecutionsTimedOut'
    ]

    for (const [smResourceName, smResource] of Object.entries(smResources)) {
      const stateMachine = { Ref: smResourceName }

      for (const metric of executionMetrics) {
        if (sfAlarmConfig[metric].enabled) {
          const config = sfAlarmConfig[metric]
          const alarmResourceName = `slicWatchStates${metric}Alarm${smResourceName}`
          const smName = smResource.Properties.StateMachineName
          const alarmResource = createStateMachineAlarm(
            `${metric}_${smName}`,
            `${metric} ${config.Statistic} for ${smName} breaches ${config.Threshold}`,
            stateMachine,
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
    stateMachine,
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    evaluationPeriods,
    treatMissingData
  ) {
    const metricProperties = {
      Dimensions: [{ Name: 'StateMachineArn', Value: stateMachine }],
      MetricName: metricName,
      Namespace: 'AWS/States',
      Period: period,
      Statistic: statistic
    }

    return {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: [context.topicArn],
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
