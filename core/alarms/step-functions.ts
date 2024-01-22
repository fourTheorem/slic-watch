import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createCfAlarms } from './alarm-utils'
import { ConfigType } from '../inputs/config-types'

export type SlicWatchSfAlarmsConfig<T extends InputOutput> = T & {
  ExecutionThrottled: T
  ExecutionsFailed: T
  ExecutionsTimedOut: T
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
function createStepFunctionAlarmCfProperties (metric: string, sfLogicalId: string, config: SlicWatchMergedConfig) {
  return {
    Namespace: 'AWS/States',
    Dimensions: [{ Name: 'StateMachineArn', Value: Fn.Ref(sfLogicalId) }],
    AlarmName: Fn.Sub(`StepFunctions_${metric.replaceAll(/[_-]/g, '')}Alarm_\${${sfLogicalId}.Name}`, {}),
    AlarmDescription: Fn.Sub(`StepFunctions ${metric.replaceAll(/[_-]/g, '')} ${config.Statistic} for \${${sfLogicalId}.Name}  breaches ${config.Threshold}`, {})
  }
}

/**
 * Add all required Step Function alarms to the provided CloudFormation template
 * based on the resources found within
 *
 * @param sfAlarmProperties The fully resolved States alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns Step Function-specific CloudFormation Alarm resources
*/
export default function createStatesAlarms (
  sfAlarmProperties: SlicWatchSfAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  return createCfAlarms(
    ConfigType.States,
    'States',
    executionMetrics,
    sfAlarmProperties,
    alarmActionsConfig,
    compiledTemplate,
    createStepFunctionAlarmCfProperties
  )
}
