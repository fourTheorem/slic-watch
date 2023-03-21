'use strict'

import { getResourcesByType } from '../cf-template'
import type { Context, DefaultAlarmsProperties, CfAlarmsProperties } from './default-config-alarms'
import { createAlarm } from './default-config-alarms'
import type Template from 'cloudform-types/types/template'

export interface SnsAlarmsConfig {
  enabled?: boolean
  'NumberOfNotificationsFilteredOut-InvalidAttributes': DefaultAlarmsProperties
  NumberOfNotificationsFailed: DefaultAlarmsProperties
}

type SnsMetrics = 'NumberOfNotificationsFilteredOut-InvalidAttributes' | 'NumberOfNotificationsFailed'

const executionMetrics: SnsMetrics[] = ['NumberOfNotificationsFilteredOut-InvalidAttributes', 'NumberOfNotificationsFailed']

/**
 * snsAlarmsConfig The fully resolved alarm configuration
 */
export default function createSNSAlarms (snsAlarmsConfig: SnsAlarmsConfig, context: Context, compiledTemplate: Template) {
  /**
   * Add all required SNS alarms to the provided CloudFormation template
   * based on the SNS resources found within
   *
   * A CloudFormation template object
   */

  const resources = {}
  const topicResources = getResourcesByType('AWS::SNS::Topic', compiledTemplate)

  for (const [topicLogicalId] of Object.entries(topicResources)) {
    for (const metric of executionMetrics) {
      const config: DefaultAlarmsProperties = snsAlarmsConfig[metric]
      const { enabled, ...rest } = config
      if (enabled !== false) {
        const snsAlarmProperties: CfAlarmsProperties = {
          AlarmName: `SNS_${metric.replaceAll('-', '')}Alarm_\${${topicLogicalId}.TopicName}`,
          AlarmDescription: `${metric} for \${${topicLogicalId}.TopicName} breaches (${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/SNS',
          Dimensions: [{ Name: 'TopicName', Value: `\${${topicLogicalId}.TopicName}` }],
          ...rest
        }
        const resourceName = `slicWatch${metric.replaceAll('-', '')}Alarm${topicLogicalId}`
        const resource = createAlarm(snsAlarmProperties, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}
