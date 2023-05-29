import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { Context, SlicWatchAlarmConfig } from './alarm-types'
import { createCfAlarms } from './alarm-utils'

export interface EventsAlarmsConfig {
  enabled?: boolean
  FailedInvocations: SlicWatchAlarmConfig
  ThrottledRules: SlicWatchAlarmConfig
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
function createEventBridgeAlarmCfProperties (metric: string, ruleLogicalId: string, config: SlicWatchAlarmConfig) {
  return {
    Namespace: 'AWS/Events',
    Dimensions: [{ Name: 'RuleName', Value: Fn.Ref(ruleLogicalId) }],
    AlarmName: Fn.Sub(`Events_${metric}Alarm_\${${ruleLogicalId}}`, {}),
    AlarmDescription: Fn.Sub(`EventBridge ${metric} for \${${ruleLogicalId}}  breaches ${config.Threshold}`, {})
  }
}

/**
 * Add all required Events alarms to the provided CloudFormation template
 * based on the EventBridge Rule found within
 *
 * @param eventsAlarmsConfig The fully resolved alarm configuration
 * @param context Deployment context (alarmActions)
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns EventBridge-specific CloudFormation Alarm resources
 */
export default function createRuleAlarms (eventsAlarmsConfig: EventsAlarmsConfig, context: Context, compiledTemplate: Template) {
  return createCfAlarms(
    'AWS::Events::Rule',
    'Events',
    executionMetrics,
    eventsAlarmsConfig,
    context,
    compiledTemplate,
    createEventBridgeAlarmCfProperties
  )
}
