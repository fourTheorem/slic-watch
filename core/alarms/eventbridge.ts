
'use strict'

import { getResourcesByType, addResource } from '../cf-template'
import { type Context, createAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { type ResourceType } from './../cf-template'

export interface EventsAlarmsConfig {
  enabled?: boolean
  FailedInvocations: DefaultAlarmsProperties
  ThrottledRules: DefaultAlarmsProperties
}

export type EventbridgeAlarm = AlarmProperties & {
  RuleName: string
}

type EventMetrics = 'FailedInvocations' | 'ThrottledRules'

const executionMetrics: EventMetrics[] = ['FailedInvocations', 'ThrottledRules']

/**
 * The fully resolved alarm configuration
 */
export default function createRuleAlarms (eventsAlarmsConfig: EventsAlarmsConfig, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required Events alarms to the provided CloudFormation template
   * based on the EventBridge Rule found within
   *
   */
  const ruleResources = getResourcesByType('AWS::Events::Rule', compiledTemplate, additionalResources)

  for (const [ruleResourceName] of Object.entries(ruleResources)) {
    for (const metric of executionMetrics) {
      const config: DefaultAlarmsProperties = eventsAlarmsConfig[metric]
      if (eventsAlarmsConfig[metric].enabled !== false) {
        const threshold = config.Threshold
        const eventbridgeAlarmProperties: EventbridgeAlarm = {
          AlarmName: `Events_${metric}Alarm_${ruleResourceName}`,
          AlarmDescription: `EventBridge ${metric} for \${${ruleResourceName}} breaches ${threshold}`,
          RuleName: `${ruleResourceName}`,
          MetricName: metric,
          Namespace: 'AWS/Events',
          Dimensions: [{ Name: 'RuleName', Value: { Ref: ruleResourceName } as any }],
          ...config
        }
        const resourceName = `slicWatchEvents${metric}Alarm${ruleResourceName}`
        const resource = createAlarm(eventbridgeAlarmProperties, context)
        addResource(resourceName, resource, compiledTemplate)
      }
    }
  }
}
