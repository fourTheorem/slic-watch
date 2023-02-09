import { makeResourceName } from '../util'

import { CloudFormationTemplate } from '../cf-template.d'
import { AlarmConfig, Context } from './default-config-alarms'

export type DynamoDbAlarmConfig = {
  enabled?: boolean
  ReadThrottleEvents: AlarmConfig
  WriteThrottleEvents: AlarmConfig
  UserErrors: AlarmConfig
  SystemErrors: AlarmConfig
}



/**
 * dynamoDbAlarmConfig The fully resolved alarm configuration
 */
export default function DynamoDbAlarms (dynamoDbAlarmConfig: DynamoDbAlarmConfig, context: Context) {
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
      if (dynamoDbAlarmConfig.ReadThrottleEvents.enabled) {
        alarms.push(
          createAlarm(tableNameSub, tableDimensions, 'ReadThrottleEvents', makeResourceName('Table', `${tableNameSub}`, 'ReadThrottleEvents'))
        )
      }

      if (dynamoDbAlarmConfig.WriteThrottleEvents.enabled) {
        alarms.push(
          createAlarm(tableNameSub, tableDimensions, 'WriteThrottleEvents', makeResourceName('Table', `${tableNameSub}`, 'WriteThrottleEvents'))
        )
      }

      if (dynamoDbAlarmConfig.UserErrors.enabled) {
        alarms.push(
          createAlarm(tableNameSub, tableDimensions, 'UserErrors', makeResourceName('Table', `${tableNameSub}`, 'UserErrors'))
        )
      }

      if (dynamoDbAlarmConfig.SystemErrors.enabled) {
        alarms.push(
          createAlarm(tableNameSub, tableDimensions, 'SystemErrors', makeResourceName('Table', `${tableNameSub}`, 'SystemErrors'))
        )
      }
      for (const gsi of tableResource.Properties.GlobalSecondaryIndexes || []) {
        const gsiName = gsi.IndexName
        const gsiDimensions = [...tableDimensions, { Name: 'GlobalSecondaryIndex', Value: gsiName }]
        const gsiIdentifierSub = `${tableNameSub}${gsiName}`
        if (dynamoDbAlarmConfig.ReadThrottleEvents.enabled) {
          alarms.push(createAlarm(gsiIdentifierSub, gsiDimensions, 'ReadThrottleEvents', makeResourceName('GSI', `${tableResourceName}${gsiName}`, 'ReadThrottleEvents')))
        }

        if (dynamoDbAlarmConfig.WriteThrottleEvents.enabled) {
          alarms.push(createAlarm(gsiIdentifierSub, gsiDimensions, 'WriteThrottleEvents', makeResourceName('GSI', `${tableResourceName}${gsiName}`, 'WriteThrottleEvents')))
        }
      }

      for (const alarm of alarms) {
        cfTemplate.addResource(alarm.resourceName, alarm.resource)
      }
    }
  }

  function createAlarm (identifierSub: string, dimensions: object[] , metricName: string, resourceName: string) {
    const config = dynamoDbAlarmConfig[metricName]

    const resource = {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: context.alarmActions,
        AlarmName: { 'Fn::Sub': `DDB_${metricName}_${identifierSub}` },
        AlarmDescription: { 'Fn::Sub': `DynamoDB ${config.Statistic} for ${identifierSub} breaches ${config.Threshold}` },
        EvaluationPeriods: config.EvaluationPeriods,
        ComparisonOperator: config.ComparisonOperator,
        Threshold: config.Threshold,
        TreatMissingData: config.TreatMissingData,
        Dimensions: dimensions,
        MetricName: metricName,
        Namespace: 'AWS/DynamoDB',
        Period: config.Period,
        Statistic: config.Statistic
      }
    }
    return {
      resourceName,
      resource
    }
  }
}
