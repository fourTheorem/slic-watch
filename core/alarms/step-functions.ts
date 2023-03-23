import type Template from 'cloudform-types/types/template'

import type { Context, SlicWatchAlarmConfig } from './alarm-types'
import { createCfAlarms } from './alarm-utils'

export interface SfAlarmsConfig {
  enabled?: boolean
  Statistic: string
  ExecutionThrottled: SlicWatchAlarmConfig
  ExecutionsFailed: SlicWatchAlarmConfig
  ExecutionsTimedOut: SlicWatchAlarmConfig
}

const executionMetrics = ['ExecutionThrottled', 'ExecutionsFailed', 'ExecutionsTimedOut']

/**
 * Create CloudFormation CloudWatch Metric alarm properties that are specific to Step Function resources
 * @param metric The Step Function metric name
 * @param sfLogicalId The CloudFormation Logical ID of the State Machine resource
 * @param config The alarm config for this specific metric
 *
 * @returns Step Function-specific CloudFormation Alarm properties
 */
function createStepFunctionAlarmCfProperties (metric: string, sfLogicalId: string, config: SlicWatchAlarmConfig) {
  return {
    Namespace: 'AWS/States',
    Dimensions: [{ Name: 'StateMachineArn', Value: { Ref: sfLogicalId } as any }]
  }
}

/**
 * Add all required Step Function alarms to the provided CloudFormation template
 * based on the resources found within
 *
 * @param sfAlarmProperties The fully resolved States alarm configuration
 * @param context Deployment context (alarmActions)
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns Step Function-specific CloudFormation Alarm resources
*/
export default function createStatesAlarms (sfAlarmProperties: SfAlarmsConfig, context: Context, compiledTemplate: Template) {
  return createCfAlarms(
    'AWS::StepFunctions::StateMachine',
    'StepFunctions',
    executionMetrics,
    sfAlarmProperties,
    context,
    compiledTemplate,
    createStepFunctionAlarmCfProperties
  )
}
