import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { Context } from './alarm-types'
import { createAlarm, makeResourceName } from './alarm-utils'
import { getResourcesByType } from '../cf-template'

export interface SlicWatchDynamoDbAlarmsConfig {
  enabled?: boolean
  ReadThrottleEvents: AlarmProperties
  WriteThrottleEvents: AlarmProperties
  UserErrors: AlarmProperties
  SystemErrors: AlarmProperties
}

const dynamoDbMetrics = ['ReadThrottleEvents', 'WriteThrottleEvents', 'UserErrors', 'SystemErrors']
const dynamoDbGsiMetrics = ['ReadThrottleEvents', 'WriteThrottleEvents']

/**
 * Add all required DynamoDB alarms to the provided CloudFormation template
 * based on the tables and their global secondary indices.
 *
 * @param dynamoDbAlarmsConfig The fully resolved alarm configuration
 * @param context Deployment context (alarmActions)
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns DynamoDB-specific CloudFormation Alarm resources
 */
export default function createDynamoDbAlarms (dynamoDbAlarmsConfig: SlicWatchDynamoDbAlarmsConfig & AlarmProperties, context: Context, compiledTemplate: Template) {
  const resources = {}
  const tableResources = getResourcesByType('AWS::DynamoDB::Table', compiledTemplate)

  for (const [tableLogicalId, tableResource] of Object.entries(tableResources)) {
    for (const metric of dynamoDbMetrics) {
      const config = dynamoDbAlarmsConfig[metric]
      if (config.enabled !== false) {
        const { enabled, ...rest } = config
        const alarmProps: AlarmProperties = rest // All mandatory properties are set following cascading
        const dynamoDbAlarmProperties: AlarmProperties = {
          AlarmName: Fn.Sub(`DDB_${metric}_\${${tableLogicalId}}`, {}),
          AlarmDescription: Fn.Sub(`DynamoDB ${config.Statistic} for \${${tableLogicalId}} breaches ${config.Threshold}`, {}),
          MetricName: metric,
          Namespace: 'AWS/DynamoDB',
          Dimensions: [{ Name: 'TableName', Value: Fn.Ref(tableLogicalId) }],
          ...alarmProps
        }
        const resourceName = makeResourceName('Table', `${tableLogicalId}`, metric)
        const resource = createAlarm(dynamoDbAlarmProperties, context)
        resources[resourceName] = resource
      }
    }
    for (const metric of dynamoDbGsiMetrics) {
      const config: SlicWatchDynamoDbAlarmsConfig & AlarmProperties = dynamoDbAlarmsConfig[metric]
      for (const gsi of tableResource.Properties?.GlobalSecondaryIndexes ?? []) {
        if (dynamoDbAlarmsConfig.ReadThrottleEvents.enabled !== false && dynamoDbAlarmsConfig.WriteThrottleEvents.enabled !== false) {
          const { enabled, ...rest } = config
          const alarmProps = rest as AlarmProperties // All mandatory properties are set following cascading
          const gsiName: string = gsi.IndexName
          const gsiIdentifierSub = `\${${tableLogicalId}}${gsiName}`
          const dynamoDbAlarmsConfig: AlarmProperties = {
            AlarmName: Fn.Sub(`DDB_${metric}_${gsiIdentifierSub}`, {}),
            AlarmDescription: Fn.Sub(`DynamoDB ${config.Statistic} for ${gsiIdentifierSub} breaches ${config.Threshold}`, {}),
            MetricName: metric,
            Namespace: 'AWS/DynamoDB',
            Dimensions: [{ Name: 'TableName', Value: Fn.Ref(tableLogicalId) }, { Name: 'GlobalSecondaryIndex', Value: gsiName }],
            ...alarmProps
          }
          const resourceName = makeResourceName('GSI', `${tableLogicalId}${gsiName}`, metric)
          const resource = createAlarm(dynamoDbAlarmsConfig, context)
          resources[resourceName] = resource
        }
      }
    }
  }
  return resources
}
