'use strict'

const dynamoDbAlarms = require('../alarms-dynamodb')
const CloudFormationTemplate = require('../cf-template')

const { test } = require('tap')
const { cloneDeep } = require('lodash')

const defaultConfig = require('../default-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  defaultCfTemplate
} = require('./testing-utils')

const sls = {
  cli: {
    log: () => {}
  }
}

const context = {
  topicArn: 'dummy-arn',
  stackName: 'testStack',
  region: 'eu-west-1'
}

const alarmConfig = createTestConfig(
  defaultConfig.alarms, {
    DynamoDB: {
      Period: 900,
      ReadThrottleEvents: {
        Threshold: 10
      },
      WriteThrottleEvents: {
        Threshold: 20
      },
      UserErrors: {
        Threshold: 100
      },
      SystemErrors: {
        Threshold: 200
      }
    }
  })

const dynamoDbAlarmConfig = alarmConfig.DynamoDB

test('DynamoDB alarms are created', (t) => {
  const { createDynamoDbAlarms } = dynamoDbAlarms(dynamoDbAlarmConfig, context)
  const compiledTemplate = cloneDeep(require('./resources/cloudformation-template-stack.json'))
  const cfTemplate = CloudFormationTemplate(compiledTemplate, {}, sls)
  createDynamoDbAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 6)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    alarmsByType[alarmType] = alarmsByType[alarmType] || new Set()
    alarmsByType[alarmType].add(al)
  }

  const metricCounts = {
    ReadThrottleEvents: 2,
    WriteThrottleEvents: 2,
    UserErrors: 1,
    SystemErrors: 1
  }

  t.same(new Set(Object.keys(alarmsByType)), new Set(Object.keys(metricCounts)))

  for (const type of Object.keys(metricCounts)) {
    t.equal(alarmsByType[type].size, metricCounts[type])
    for (const al of alarmsByType[type]) {
      t.equal(al.Statistic, 'Sum')
      t.equal(al.Threshold, dynamoDbAlarmConfig[type].Threshold)
      t.equal(al.EvaluationPeriods, 1)
      t.equal(al.Namespace, 'AWS/DynamoDB')
      t.equal(al.Period, dynamoDbAlarmConfig.Period)
      if (al.Dimensions.length === 1) {
        t.same(al.Dimensions, [
          {
            Name: 'TableName',
            Value: 'MyTable'
          }
        ])
      } else {
        t.same(al.Dimensions, [
          {
            Name: 'TableName',
            Value: 'MyTable'
          },
          {
            Name: 'GlobalSecondaryIndex',
            Value: 'GSI1'
          }
        ])
      }
    }
  }

  t.end()
})

test('DynamoDB alarms are created without GSI', (t) => {
  const { createDynamoDbAlarms } = dynamoDbAlarms(dynamoDbAlarmConfig, context)
  const compiledTemplate = cloneDeep(defaultCfTemplate)
  delete compiledTemplate.Resources.dataTable.Properties.GlobalSecondaryIndexes
  const cfTemplate = CloudFormationTemplate(compiledTemplate, {}, sls)
  createDynamoDbAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  t.equal(Object.keys(alarmResources).length, 4)
  t.end()
})
