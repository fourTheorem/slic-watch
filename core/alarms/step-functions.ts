'use strict'
import { CloudFormationTemplate } from '../cf-template'
import { Context, createAlarm } from './default-config-alarms'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"

export type SfAlarmsConfig = AlarmProperties& {
  ExecutionThrottled: AlarmProperties
  ExecutionsFailed: AlarmProperties
  ExecutionsTimedOut: AlarmProperties
}

export type SmAlarm= AlarmProperties & {
  StateMachineArn: string 
}

/**
 * @param {object} sfAlarmProperties The fully resolved States alarm configuration
 */
export default function StatesAlarms (sfAlarmProperties: SfAlarmsConfig, context: Context) {
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
        if (sfAlarmProperties[metric].ActionsEnabled) {
          const config = sfAlarmProperties[metric]
          const alarmResourceName = `slicWatchStates${metric}Alarm${logicalId}`
          const smAlarmProperties: SmAlarm = {
            AlarmName: `StepFunctions_${metric}_\${${logicalId}.Name}` ,
            AlarmDescription: `StepFunctions_${metric} ${config.Statistic} for \${${logicalId}.Name}  breaches ${config.Threshold}`,
            StateMachineArn:  `\${${logicalId}}`, 
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
          const alarmResource= createAlarm(smAlarmProperties, context)
          
          cfTemplate.addResource(alarmResourceName, alarmResource)
        }
      }
    }
  }
   
}

