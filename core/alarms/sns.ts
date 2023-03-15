'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'

export interface SnsAlarmsConfig {
  enabled?: boolean
  'NumberOfNotificationsFilteredOut-InvalidAttributes': DefaultAlarmsProperties
  NumberOfNotificationsFailed: DefaultAlarmsProperties
}

export type SnsAlarm = AlarmProperties & {
  TopicName: string
}

type SnsMetrics = 'NumberOfNotificationsFilteredOut-InvalidAttributes' | 'NumberOfNotificationsFailed'

const executionMetrics: SnsMetrics[] = ['NumberOfNotificationsFilteredOut-InvalidAttributes', 'NumberOfNotificationsFailed']

/**
 * snsAlarmsConfig The fully resolved alarm configuration
 */
export default function createSNSAlarms (snsAlarmsConfig: SnsAlarmsConfig, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required SNS alarms to the provided CloudFormation template
   * based on the SNS resources found within
   *
   * A CloudFormation template object
   */
  const topicResources = getResourcesByType('AWS::SNS::Topic', compiledTemplate, additionalResources)

  for (const [topicLogicalId] of Object.entries(topicResources)) {
    for (const metric of executionMetrics) {
      const config = snsAlarmsConfig[metric]
      if (config.enabled !== false) {
        const snsAlarmProperties: SnsAlarm = {
          AlarmName: `SNS_${metric.replaceAll('-', '')}Alarm_\${${topicLogicalId}.TopicName}`,
          AlarmDescription: `${metric} for \${${topicLogicalId}.TopicName} breaches (${config.Threshold}`,
          TopicName: `\${${topicLogicalId}.TopicName}`,
          MetricName: metric,
          Namespace: 'AWS/SNS',
          Dimensions: [{ Name: 'TopicName', Value: `\${${topicLogicalId}.TopicName}` }],
          ...config
        }
        const resourceName = `slicWatch${metric}Alarm${topicLogicalId}`
        const resource = createAlarm(snsAlarmProperties, context)
        addResource(resourceName, resource, compiledTemplate)
      }
    }
  }
}
