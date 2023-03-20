'use strict'

import { getResourcesByType, addResource } from '../cf-template'
import { type Context, createAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { makeResourceName } from './make-name'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'

export interface DynamoDbAlarmProperties {
  enabled?: boolean
  Statistic: string
  ReadThrottleEvents: DefaultAlarmsProperties
  WriteThrottleEvents: DefaultAlarmsProperties
  UserErrors: DefaultAlarmsProperties
  SystemErrors: DefaultAlarmsProperties
}

type DynamoDbMetrics = 'ReadThrottleEvents' | 'WriteThrottleEvents' | 'UserErrors' | 'SystemErrors'
type DynamoDbGsiMetrics = 'ReadThrottleEvents' | 'WriteThrottleEvents'

const dynamoDbMetrics: DynamoDbMetrics[] = ['ReadThrottleEvents', 'WriteThrottleEvents', 'UserErrors', 'SystemErrors']
const dynamoDbGsiMetrics: DynamoDbGsiMetrics[] = ['ReadThrottleEvents', 'WriteThrottleEvents']

/**
 * dynamoDbAlarmProperties The fully resolved alarm configuration
 */
export default function createDynamoDbAlarms (dynamoDbAlarmProperties: DynamoDbAlarmProperties, context: Context, compiledTemplate: Template) {
  /**
   * Add all required DynamoDB alarms to the provided CloudFormation template
   * based on the tables and their global secondary indices.
   *
   */
  const tableResources = getResourcesByType('AWS::DynamoDB::Table', compiledTemplate)

  for (const [tableResourceName, tableResource] of Object.entries(tableResources)) {
    for (const metric of dynamoDbMetrics) {
      const config = dynamoDbAlarmProperties[metric]
      if (config.enabled !== false) {
        const config = dynamoDbAlarmProperties[metric]
        delete config.enabled
        const dynamoDBAlarmProperties: AlarmProperties = {
          AlarmName: `DDB_${metric}_${tableResourceName}`,
          AlarmDescription: `DynamoDB ${config.Statistic} for ${tableResourceName} breaches ${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/DynamoDB',
          Dimensions: [{ Name: 'TableName', Value: { Ref: tableResourceName } as any }],
          ...config
        }
        const resourceName = makeResourceName('Table', `${tableResourceName}`, metric)
        const resource = createAlarm(dynamoDBAlarmProperties, context)
        addResource(resourceName, resource, compiledTemplate)
      }
    }
    for (const metric of dynamoDbGsiMetrics) {
      const config = dynamoDbAlarmProperties[metric]
      for (const gsi of tableResource.Properties?.GlobalSecondaryIndexes ?? []) {
        if (dynamoDbAlarmProperties.ReadThrottleEvents.enabled !== false && dynamoDbAlarmProperties.WriteThrottleEvents.enabled !== false) {
          delete config.enabled
          const gsiName: string = gsi.IndexName
          const gsiIdentifierSub = `${tableResourceName}${gsiName}`
          const dynamoDBAlarmProperties: AlarmProperties = {
            AlarmName: `DDB_${metric}_${gsiIdentifierSub}`,
            AlarmDescription: `DynamoDB ${config.Statistic} for ${gsiIdentifierSub} breaches ${config.Threshold}`,
            MetricName: metric,
            Namespace: 'AWS/DynamoDB',
            Dimensions: [{ Name: 'TableName', Value: { Ref: tableResourceName } as any }, { Name: 'GlobalSecondaryIndex', Value: gsiName }],
            ...config
          }
          const resourceName = makeResourceName('GSI', `${tableResourceName}${gsiName}`, metric)
          const resource = createAlarm(dynamoDBAlarmProperties, context)
          addResource(resourceName, resource, compiledTemplate)
        }
      }
    }
  }
}
