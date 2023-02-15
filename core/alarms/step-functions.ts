'use strict'
import { CloudFormationTemplate, Statistic } from '../cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'

export type SfAlarmsConfig = {
  enabled?: boolean
  ExecutionThrottled: AlarmConfig
  ExecutionsFailed: AlarmConfig
  ExecutionsTimedOut: AlarmConfig
}

export type SmAlarm= Alarm & {
  stateMachineArn: object 
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
          const smAlarmConfig: SmAlarm = {
            alarmName: { 'Fn::Sub': `StepFunctions_${metric}_\${${logicalId}.Name}` } ,
            alarmDescription: { 'Fn::Sub': `StepFunctions_${metric} ${config.Statistic} for \${${logicalId}.Name}  breaches ${config.Threshold}` },
            stateMachineArn: { Ref: logicalId }, 
            comparisonOperator: config.ComparisonOperator,
            threshold: config.Threshold,
            metricName: metric,
            statistic: config.Statistic,
            period:  config.Period,
            extendedStatistic:  config.ExtendedStatistic,
            evaluationPeriods:  config.EvaluationPeriods,
            treatMissingData:  config.TreatMissingData,
            namespace: 'AWS/States',
            dimensions: [{ Name: 'StateMachineArn', Value: { Ref: logicalId } }]
          }
          const alarmResource= createAlarm(smAlarmConfig, context)
          
          cfTemplate.addResource(alarmResourceName, alarmResource)
        }
      }
    }
  }
   
}

