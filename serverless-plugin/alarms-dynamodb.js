'use strict'

const { makeResourceName } = require('./util')

/**
 * @param {object} dynamoDbAlarmConfig The fully resolved alarm configuration
 */
module.exports = function DynamoDbAlarms (dynamoDbAlarmConfig, context) {
  return {
    createDynamoDbAlarms
  }

  /**
   * Add all required DynamoDB alarms to the provided CloudFormation template
   * based on the tables and their global secondary indices.
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createDynamoDbAlarms (cfTemplate) {
    const tableResources = cfTemplate.getResourcesByType(
      'AWS::DynamoDB::Table'
    )

    for (const [tableResourceName, tableResource] of Object.entries(tableResources)) {
      const tableName = tableResource.Properties.TableName
      const tableDimensions = [{ Name: 'TableName', Value: tableName }]

      const alarms = []

      if (dynamoDbAlarmConfig.ReadThrottleEvents.enabled) {
        alarms.push(
          createAlarm(tableName, tableDimensions, 'ReadThrottleEvents', makeResourceName('Table', `${tableName}`, 'ReadThrottleEvents'))
        )
      }

      if (dynamoDbAlarmConfig.WriteThrottleEvents.enabled) {
        alarms.push(
          createAlarm(tableName, tableDimensions, 'WriteThrottleEvents', makeResourceName('Table', `${tableName}`, 'WriteThrottleEvents'))
        )
      }

      if (dynamoDbAlarmConfig.UserErrors.enabled) {
        alarms.push(
          createAlarm(tableName, tableDimensions, 'UserErrors', makeResourceName('Table', `${tableName}`, 'UserErrors'))
        )
      }

      if (dynamoDbAlarmConfig.SystemErrors.enabled) {
        alarms.push(
          createAlarm(tableName, tableDimensions, 'SystemErrors', makeResourceName('Table', `${tableName}`, 'SystemErrors'))
        )
      }

      for (const gsi of tableResource.Properties.GlobalSecondaryIndexes || []) {
        const gsiName = gsi.IndexName
        const gsiDimensions = [...tableDimensions, { Name: 'GlobalSecondaryIndex', Value: gsiName }]
        const identifier = `${tableName}${gsiName}`
        if (dynamoDbAlarmConfig.ReadThrottleEvents.enabled) {
          alarms.push(createAlarm(identifier, gsiDimensions, 'ReadThrottleEvents', makeResourceName('GSI', `${tableResourceName}${gsiName}`, 'ReadThrottleEvents')))
        }

        if (dynamoDbAlarmConfig.WriteThrottleEvents.enabled) {
          alarms.push(createAlarm(identifier, gsiDimensions, 'WriteThrottleEvents', makeResourceName('GSI', `${tableResourceName}${gsiName}`, 'WriteThrottleEvents')))
        }
      }

      for (const alarm of alarms) {
        cfTemplate.addResource(alarm.resourceName, alarm.resource)
      }
    }
  }

  function createAlarm (identifier, dimensions, metricName, resourceName) {
    const config = dynamoDbAlarmConfig[metricName]

    const resource = {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: [context.topicArn],
        AlarmName: `${metricName}_${identifier}`,
        AlarmDescription: `DynamoDB ${config.Statistic} for ${identifier} breaches ${config.Threshold}`,
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
