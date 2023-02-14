'use strict'
import { CloudFormationTemplate, Statistic } from '../cf-template'
import { AlarmConfig, Context } from './default-config-alarms'

export type SfAlarmsConfig = {
  enabled?: boolean
  ExecutionThrottled: AlarmConfig
  ExecutionsFailed: AlarmConfig
  ExecutionsTimedOut: AlarmConfig
}

/**
 * @param {object} sfAlarmConfig The fully resolved States alarm configuration
 */
export default function StatesAlarms (sfAlarmConfig: SfAlarmsConfig, context: Context) {
  return {
    createStatesAlarms
  }

  /**
   * Add all required Step Function alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * A CloudFormation template object
   */
  function createStatesAlarms (cfTemplate: CloudFormationTemplate) {
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
            // @ts-ignore
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
    alarmName: string,
    alarmDescription: string,
    stateMachineArn: string,
    comparisonOperator: string,
    threshold: number,
    metricName: string,
    statistic: Statistic,
    period: number,
    evaluationPeriods: number,
    treatMissingData: string
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
