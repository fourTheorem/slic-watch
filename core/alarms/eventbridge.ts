import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchAlarmConfig, SlicWatchMergedConfig } from './alarm-types'
import { createCfAlarms } from './alarm-utils'

export interface SlicWatchEventsAlarmsConfig<T extends InputOutput> extends SlicWatchAlarmConfig {
  FailedInvocations: T
  ThrottledRules: T
}

const executionMetrics = ['FailedInvocations', 'ThrottledRules']

/**
 * Create CloudFormation CloudWatch Metric alarm properties that are specific to EventBridge Rule resources
 *
 * @param metric The EventBridge metric name
 * @param ruleLogicalId The CloudFormation Logical ID of the Rule resource
 * @param config The alarm config for this specific metric
 *
 * @returns EventBridge-specific CloudFormation Alarm properties
 */
function createEventBridgeAlarmCfProperties (metric: string, ruleLogicalId: string, config: SlicWatchMergedConfig) {
  return {
    Namespace: 'AWS/Events',
    Dimensions: [{ Name: 'RuleName', Value: Fn.Ref(ruleLogicalId) }],
    AlarmName: Fn.Sub(`Events_${metric}_Alarm_\${${ruleLogicalId}}`, {}),
    AlarmDescription: Fn.Sub(`EventBridge ${metric} for \${${ruleLogicalId}} breaches ${config.Threshold}`, {})
  }
}

/**
 * Add all required Events alarms to the provided CloudFormation template
 * based on the EventBridge Rule found within
 *
 * @param eventsAlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns EventBridge-specific CloudFormation Alarm resources
 */
export default function createRuleAlarms (
  eventsAlarmsConfig: SlicWatchEventsAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  return createCfAlarms(
    'AWS::Events::Rule',
    'Events',
    executionMetrics,
    eventsAlarmsConfig,
    alarmActionsConfig,
    compiledTemplate,
    createEventBridgeAlarmCfProperties
  )
}
