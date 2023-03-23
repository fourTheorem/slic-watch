
import type { Context, DefaultAlarmsProperties } from './default-config-alarms'
import { fetchAlarmResources } from './default-config-alarms'
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
 * Add all required SNS alarms to the provided CloudFormation template
 * based on the SNS resources found within
 * A CloudFormation template object
 */
export default function createSNSAlarms (snsAlarmsConfig: SnsAlarmsConfig, context: Context, compiledTemplate: Template) {
  return fetchAlarmResources('AWS::SNS::Topic', 'SNS', executionMetrics, snsAlarmsConfig, context, compiledTemplate,
    ({ metric, resourceName, config }) => ({
      AlarmName: `SNS_${metric.replaceAll('-', '')}Alarm_${resourceName}`,
      AlarmDescription: `${metric} for \${${resourceName}.TopicName} breaches (${config.Threshold}`,
      Namespace: 'AWS/SNS',
      Dimensions: [{ Name: 'TopicName', Value: `\${${resourceName}.TopicName}` }]
    }))
}
