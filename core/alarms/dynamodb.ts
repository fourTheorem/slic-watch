import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm, makeAlarmLogicalId } from './alarm-utils'
import { getResourceAlarmConfigurationsByType } from '../cf-template'
import { ConfigType } from '../inputs/config-types'

export type SlicWatchDynamoDbAlarmsConfig<T extends InputOutput> = T & {
  ReadThrottleEvents: T
  WriteThrottleEvents: T
  UserErrors: T
  SystemErrors: T
}

const dynamoDbMetrics = ['ReadThrottleEvents', 'WriteThrottleEvents', 'UserErrors', 'SystemErrors']
const dynamoDbGsiMetrics = ['ReadThrottleEvents', 'WriteThrottleEvents']

/**
 * Add all required DynamoDB alarms to the provided CloudFormation template
 * based on the tables and any global secondary indices (GSIs).
 *
 * @param dynamoDbAlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns DynamoDB-specific CloudFormation Alarm resources
 */
export default function createDynamoDbAlarms (
  dynamoDbAlarmsConfig: SlicWatchDynamoDbAlarmsConfig<SlicWatchMergedConfig>,
  alarmActionsConfig: AlarmActionsConfig,
  compiledTemplate: Template
): CloudFormationResources {
  const resources: CloudFormationResources = {}
  const configuredResources = getResourceAlarmConfigurationsByType(ConfigType.DynamoDB, compiledTemplate, dynamoDbAlarmsConfig)

  for (const [tableLogicalId, tableResource] of Object.entries(configuredResources.resources)) {
    for (const metric of dynamoDbMetrics) {
      const config: SlicWatchMergedConfig = configuredResources.alarmConfigurations[tableLogicalId][metric]
      const { enabled, ...rest } = config
      if (enabled) {
        const dynamoDbAlarmProperties: AlarmProperties = {
          AlarmName: Fn.Sub(`DDB_${metric}_Alarm_\${${tableLogicalId}}`, {}),
          AlarmDescription: Fn.Sub(`DynamoDB ${config.Statistic} for \${${tableLogicalId}} breaches ${config.Threshold}`, {}),
          MetricName: metric,
          Namespace: 'AWS/DynamoDB',
          Dimensions: [{ Name: 'TableName', Value: Fn.Ref(tableLogicalId) }],
          ...rest
        }
        const alarmLogicalId = makeAlarmLogicalId('Table', tableLogicalId, metric)
        const resource = createAlarm(dynamoDbAlarmProperties, alarmActionsConfig)
        resources[alarmLogicalId] = resource
      }
    }
    for (const metric of dynamoDbGsiMetrics) {
      const config: SlicWatchDynamoDbAlarmsConfig<SlicWatchMergedConfig> = configuredResources.alarmConfigurations[tableLogicalId][metric]
      for (const gsi of tableResource.Properties?.GlobalSecondaryIndexes ?? []) {
        const gsiName: string = gsi.IndexName
        const gsiIdentifierSub = `\${${tableLogicalId}}${gsiName}`
        const { enabled, ...rest } = config
        if (enabled) {
          const dynamoDbAlarmsConfig: AlarmProperties = {
            AlarmName: Fn.Sub(`DDB_${metric}_Alarm_${gsiIdentifierSub}`, {}),
            AlarmDescription: Fn.Sub(`DynamoDB ${config.Statistic} for ${gsiIdentifierSub} breaches ${config.Threshold}`, {}),
            MetricName: metric,
            Namespace: 'AWS/DynamoDB',
            Dimensions: [{ Name: 'TableName', Value: Fn.Ref(tableLogicalId) }, { Name: 'GlobalSecondaryIndex', Value: gsiName }],
            ...rest
          }
          const alarmLogicalId = makeAlarmLogicalId('GSI', `${tableLogicalId}${gsiName}`, metric)
          const resource = createAlarm(dynamoDbAlarmsConfig, alarmActionsConfig)
          resources[alarmLogicalId] = resource
        }
      }
    }
  }
  return resources
}
