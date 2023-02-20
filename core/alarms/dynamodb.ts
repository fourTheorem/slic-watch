'use strict'

import { CloudFormationTemplate } from '../cf-template'
import { Context, createAlarm } from './default-config-alarms'
import { makeResourceName } from './make-name'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"

export type DynamoDbAlarmProperties = AlarmProperties & {
  ReadThrottleEvents: AlarmProperties
  WriteThrottleEvents: AlarmProperties
  UserErrors: AlarmProperties
  SystemErrors: AlarmProperties
}

/**
 * dynamoDbAlarmProperties The fully resolved alarm configuration
 */
export default function DynamoDbAlarms (dynamoDbAlarmProperties: DynamoDbAlarmProperties, context: Context) {
  return {
    createDynamoDbAlarms
  }

  /**
   * Add all required DynamoDB alarms to the provided CloudFormation template
   * based on the tables and their global secondary indices.
   *
   * cfTemplate A CloudFormation template object
   */
  function createDynamoDbAlarms (cfTemplate: CloudFormationTemplate ) {
    const tableResources = cfTemplate.getResourcesByType(
      'AWS::DynamoDB::Table'
    )
    for (const [tableResourceName, tableResource] of Object.entries(tableResources)) {
      const tableDimensions = [{ Name: 'TableName', Value: { Ref: tableResourceName } }]

      const alarms = []

      const tableNameSub = `\${${tableResourceName}}`
      if (dynamoDbAlarmProperties.ReadThrottleEvents.ActionsEnabled) {
        alarms.push(
          createDynamoDbAlarm(tableNameSub, tableDimensions, 'ReadThrottleEvents', makeResourceName('Table', `${tableNameSub}`, 'ReadThrottleEvents'))
        )
      }

      if (dynamoDbAlarmProperties.WriteThrottleEvents.ActionsEnabled) {
        alarms.push(
          createDynamoDbAlarm(tableNameSub, tableDimensions, 'WriteThrottleEvents', makeResourceName('Table', `${tableNameSub}`, 'WriteThrottleEvents'))
        )
      }

      if (dynamoDbAlarmProperties.UserErrors.ActionsEnabled) {
        alarms.push(
          createDynamoDbAlarm(tableNameSub, tableDimensions, 'UserErrors', makeResourceName('Table', `${tableNameSub}`, 'UserErrors'))
        )
      }

      if (dynamoDbAlarmProperties.SystemErrors.ActionsEnabled) {
        alarms.push(
          createDynamoDbAlarm(tableNameSub, tableDimensions, 'SystemErrors', makeResourceName('Table', `${tableNameSub}`, 'SystemErrors'))
        )
      }
      // @ts-ignore
      for (const gsi of tableResource.Properties.GlobalSecondaryIndexes || []) {
        const gsiName = gsi.IndexName
        const gsiDimensions = [...tableDimensions, { Name: 'GlobalSecondaryIndex', Value: gsiName }]
        const gsiIdentifierSub = `${tableNameSub}${gsiName}`
        if (dynamoDbAlarmProperties.ReadThrottleEvents.ActionsEnabled) {
          alarms.push(createDynamoDbAlarm(gsiIdentifierSub, gsiDimensions, 'ReadThrottleEvents', makeResourceName('GSI', `${tableResourceName}${gsiName}`, 'ReadThrottleEvents')))
        }

        if (dynamoDbAlarmProperties.WriteThrottleEvents.ActionsEnabled) {
          alarms.push(createDynamoDbAlarm(gsiIdentifierSub, gsiDimensions, 'WriteThrottleEvents', makeResourceName('GSI', `${tableResourceName}${gsiName}`, 'WriteThrottleEvents')))
        }
      }

      for (const alarm of alarms) {
        cfTemplate.addResource(alarm.resourceName, alarm.resource)
      }
    }
  }

  function createDynamoDbAlarm (identifierSub: string, dimensions , metricName: string, resourceName: string) {
    const config = dynamoDbAlarmProperties[metricName]
    const dynamoDBAlarmProperties:AlarmProperties = {
      AlarmName: `DDB_${metricName}_${identifierSub}` ,
      AlarmDescription: `DynamoDB ${config.Statistic} for ${identifierSub} breaches ${config.Threshold}`, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: metricName,
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/DynamoDB',
      Dimensions: dimensions
    }
    return {
      resourceName,
      resource: createAlarm(dynamoDBAlarmProperties, context)
    }
  }
}
