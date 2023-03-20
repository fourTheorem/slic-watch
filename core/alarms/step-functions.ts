'use strict'

import type { Context, DefaultAlarmsProperties } from './default-config-alarms'
import { fetchAlarmResources } from './default-config-alarms'
import type Template from 'cloudform-types/types/template'

export interface SfAlarmsConfig {
  enabled?: boolean
  Statistic: string
  ExecutionThrottled: DefaultAlarmsProperties
  ExecutionsFailed: DefaultAlarmsProperties
  ExecutionsTimedOut: DefaultAlarmsProperties
}

const executionMetrics = [
  'ExecutionThrottled',
  'ExecutionsFailed',
  'ExecutionsTimedOut'
]

/**
 * @param {object} sfAlarmProperties The fully resolved States alarm configuration
 * Add all required Step Function alarms to the provided CloudFormation template
 * based on the resources found within
 * A CloudFormation template object
*/
export default function createStatesAlarms (sfAlarmProperties: SfAlarmsConfig, context: Context, compiledTemplate: Template) {
  return fetchAlarmResources('AWS::StepFunctions::StateMachine', 'StepFunctions', executionMetrics, sfAlarmProperties, context, compiledTemplate,
    ({ metric, resourceName, config }) => ({
      AlarmName: `StepFunctions_${metric}_${resourceName}`,
      AlarmDescription: `StepFunctions_${metric} ${config.Statistic} for \${${resourceName}.Name}  breaches ${config.Threshold}`,
      Namespace: 'AWS/States',
      Dimensions: [{ Name: 'StateMachineArn', Value: { Ref: resourceName } as any }]
    }))
}
