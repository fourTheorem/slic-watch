
import type { Context, DefaultAlarmsProperties } from './default-config-alarms'
import { fetchAlarmResources } from './default-config-alarms'
import type Template from 'cloudform-types/types/template'

export interface EventsAlarmsConfig {
  enabled?: boolean
  FailedInvocations: DefaultAlarmsProperties
  ThrottledRules: DefaultAlarmsProperties
}

type EventMetrics = 'FailedInvocations' | 'ThrottledRules'

const executionMetrics: EventMetrics[] = ['FailedInvocations', 'ThrottledRules']

/**
 * The fully resolved alarm configuration
 * Add all required Events alarms to the provided CloudFormation template
 * based on the EventBridge Rule found within
 *
 */
export default function createRuleAlarms (eventsAlarmsConfig: EventsAlarmsConfig, context: Context, compiledTemplate: Template) {
  return fetchAlarmResources('AWS::Events::Rule', 'Events', executionMetrics, eventsAlarmsConfig, context, compiledTemplate,
    ({ metric, resourceName, config }) => ({
      AlarmName: `Events_${metric}Alarm_${resourceName}`,
      AlarmDescription: `EventBridge ${metric} for \${${resourceName}} breaches ${config.Threshold}`,
      Namespace: 'AWS/Events',
      Dimensions: [{ Name: 'RuleName', Value: { Ref: resourceName } as any }]
    }))
}
