'use strict'
import { CloudFormationTemplate } from '../cf-template'
import { AlarmConfig, Context, createAlarm } from './default-config-alarms'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"

export type SfAlarmsConfig = {
  enabled?: boolean
  ExecutionThrottled: AlarmConfig
  ExecutionsFailed: AlarmConfig
  ExecutionsTimedOut: AlarmConfig
}

export type SmAlarm= AlarmProperties & {
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
            AlarmName: `StepFunctions_${metric}_\${${logicalId}.Name}` ,
            AlarmDescription: `StepFunctions_${metric} ${config.Statistic} for \${${logicalId}.Name}  breaches ${config.Threshold}`,
            stateMachineArn: { Ref: logicalId }, 
            ComparisonOperator: config.ComparisonOperator,
            Threshold: config.Threshold,
            MetricName: metric,
            Statistic: config.Statistic,
            Period:  config.Period,
            ExtendedStatistic:  config.ExtendedStatistic,
            EvaluationPeriods:  config.EvaluationPeriods,
            TreatMissingData:  config.TreatMissingData,
            Namespace: 'AWS/States',
            Dimensions: [{ Name: 'StateMachineArn', Value:`\${${logicalId}}`}]
          }
          const alarmResource= createAlarm(smAlarmConfig, context)
          
          cfTemplate.addResource(alarmResourceName, alarmResource)
        }
      }
    }
  }
   
}

