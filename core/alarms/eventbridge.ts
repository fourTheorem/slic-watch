
'use strict'

import { getResourcesByType } from '../cf-template'
import type { Context, DefaultAlarmsProperties, CfAlarmsProperties } from './default-config-alarms'
import { createAlarm } from './default-config-alarms'
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
 */
export default function createRuleAlarms (eventsAlarmsConfig: EventsAlarmsConfig, context: Context, compiledTemplate: Template) {
  /**
   * Add all required Events alarms to the provided CloudFormation template
   * based on the EventBridge Rule found within
   *
   */

  const resources = {}
  const ruleResources = getResourcesByType('AWS::Events::Rule', compiledTemplate)

  for (const [ruleResourceName] of Object.entries(ruleResources)) {
    for (const metric of executionMetrics) {
      const config: DefaultAlarmsProperties = eventsAlarmsConfig[metric]
      if (eventsAlarmsConfig[metric].enabled !== false) {
        const { enabled, ...rest } = config
        const eventbridgeAlarmProperties: CfAlarmsProperties = {
          AlarmName: `Events_${metric}Alarm_${ruleResourceName}`,
          AlarmDescription: `EventBridge ${metric} for \${${ruleResourceName}} breaches ${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/Events',
          Dimensions: [{ Name: 'RuleName', Value: { Ref: ruleResourceName } as any }],
          ...rest
        }
        const resourceName = `slicWatchEvents${metric}Alarm${ruleResourceName}`
        const resource = createAlarm(eventbridgeAlarmProperties, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}
