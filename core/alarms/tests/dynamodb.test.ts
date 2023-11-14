import { test } from 'tap'
import _ from 'lodash'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import createDynamoDbAlarms from '../dynamodb'
import { type ResourceType, addResource, getResourcesByType } from '../../cf-template'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testAlarmActionsConfig,
  defaultCfTemplate
} from '../../tests/testing-utils'

const testConfig = createTestConfig(
  defaultConfig.alarms, {
    Period: 120,
    EvaluationPeriods: 2,
    TreatMissingData: 'breaching',
    ComparisonOperator: 'GreaterThanOrEqualToThreshold',
    DynamoDB: {
      enabled: true,
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
  }
)

const dynamoDbAlarmConfig = testConfig.DynamoDB

;[true, false].forEach(specifyTableName => {
  test(`DynamoDB alarms are created ${specifyTableName ? 'with' : 'without'} a table name property`, (t) => {
    const compiledTemplate = createTestCloudFormationTemplate()
    const resources = createDynamoDbAlarms(dynamoDbAlarmConfig, testAlarmActionsConfig, compiledTemplate)

    for (const resourceName in resources) {
      addResource(resourceName, resources[resourceName], compiledTemplate)
    }
    if (!specifyTableName) {
      for (const tableResource of Object.values(getResourcesByType('AWS::DynamoDB::Table', compiledTemplate))) {
        delete tableResource.Properties?.TableName
      }
    }

    const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
    const alarmsByType = {}
    t.equal(Object.keys(alarmResources).length, 6)
    for (const alarmResource of Object.values(alarmResources)) {
      const al = alarmResource.Properties as AlarmProperties
      assertCommonAlarmProperties(t, al)
      const alarmType = alarmNameToType(al?.AlarmName)
      alarmsByType[alarmType] = alarmsByType[alarmType] ?? new Set()
      alarmsByType[alarmType].add(al)
    }

    const alarmCounts = {
      DDB_ReadThrottleEvents_Alarm: 2,
      DDB_WriteThrottleEvents_Alarm: 2,
      DDB_UserErrors_Alarm: 1,
      DDB_SystemErrors_Alarm: 1
    }

    t.same(new Set(Object.keys(alarmsByType)), new Set(Object.keys(alarmCounts)))

    for (const type of Object.keys(alarmCounts)) {
      t.equal(alarmsByType[type].size, alarmCounts[type])
      for (const al of alarmsByType[type]) {
        t.equal(al.Statistic, 'Sum')
        const metric = type.split('_')[1]
        t.equal(al.Threshold, dynamoDbAlarmConfig[metric].Threshold)
        t.equal(al.EvaluationPeriods, 2)
        t.equal(al.TreatMissingData, 'breaching')
        t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
        t.equal(al.Namespace, 'AWS/DynamoDB')
        t.equal(al.Period, 120)
        t.equal(al.Dimensions[0].Name, 'TableName')
        t.ok(al.Dimensions[0].Value)
        if (al.Dimensions.length > 1) {
          t.same(al.Dimensions[1], {
            Name: 'GlobalSecondaryIndex',
            Value: 'GSI1'
          })
        }
      }
    }

    t.end()
  })
})

test('Table resource configuration overrides take precedence', (t) => {
  const template = createTestCloudFormationTemplate();

  (template.Resources as ResourceType).dataTable.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        ReadThrottleEvents: {
          Threshold: 11
        },
        WriteThrottleEvents: {
          Threshold: 12
        },
        UserErrors: {
          Threshold: 13,
          enabled: false
        },
        SystemErrors: {
          Threshold: 14
        }
      }
    }
  }

  const alarmResources = createDynamoDbAlarms(dynamoDbAlarmConfig, testAlarmActionsConfig, template)
  t.same(Object.keys(alarmResources).length, 5) // 3 for the table, 2 for the GSI

  const readThrottleAlarms = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === 'ReadThrottleEvents')
  const writeThrottleAlarms = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === 'WriteThrottleEvents')
  const systemErrorsAlarm = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === 'SystemErrors')[0]

  for (const alarm of readThrottleAlarms) {
    t.equal(alarm?.Properties?.Threshold, 11)
    t.equal(alarm?.Properties?.Period, 900)
  }
  for (const alarm of writeThrottleAlarms) {
    t.equal(alarm?.Properties?.Threshold, 12)
    t.equal(alarm?.Properties?.Period, 900)
  }
  t.equal(systemErrorsAlarm?.Properties?.Threshold, 14)
  t.equal(systemErrorsAlarm?.Properties?.Period, 900)
  t.end()
})

test('DynamoDB alarms are created without GSI', (t) => {
  const compiledTemplate = createTestCloudFormationTemplate()
  _.cloneDeep(defaultCfTemplate)
  delete compiledTemplate.Resources?.dataTable.Properties?.GlobalSecondaryIndexes
  const resources = createDynamoDbAlarms(dynamoDbAlarmConfig, testAlarmActionsConfig, compiledTemplate)
  for (const resourceName in resources) {
    addResource(resourceName, resources[resourceName], compiledTemplate)
  }

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
  t.equal(Object.keys(alarmResources).length, 4)
  t.end()
})

test('DynamoDB alarms are not created when disabled', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms, {
    DynamoDB: {
      enabled: false
    }
  })
  const dynamoDbAlarmConfig = testConfig.DynamoDB
  const compiledTemplate = createTestCloudFormationTemplate()

  const alarmResources = createDynamoDbAlarms(dynamoDbAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})
