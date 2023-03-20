'use strict'

import { getResourcesByType, addResource } from '../cf-template'
import { type Context, createAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
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
  const topicResources = getResourcesByType('AWS::SNS::Topic', compiledTemplate)

  for (const [topicLogicalId] of Object.entries(topicResources)) {
    for (const metric of executionMetrics) {
      const config = snsAlarmsConfig[metric]
      const { enabled, ...rest } = config
      if (enabled !== false) {
        const snsAlarmProperties: AlarmProperties = {
          AlarmName: `SNS_${metric.replaceAll('-', '')}Alarm_\${${topicLogicalId}.TopicName}`,
          AlarmDescription: `${metric} for \${${topicLogicalId}.TopicName} breaches (${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/SNS',
          Dimensions: [{ Name: 'TopicName', Value: `\${${topicLogicalId}.TopicName}` }],
          ...rest
        }
        const resourceName = `slicWatch${metric.replaceAll('-', '')}Alarm${topicLogicalId}`
        const resource = createAlarm(snsAlarmProperties, context)
        addResource(resourceName, resource, compiledTemplate)
      }
    }
  }
}
