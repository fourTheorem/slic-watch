'use strict'

const appSyncAlarms = require('../alarms-appsync')
const { test } = require('tap')
const defaultConfig = require('../default-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  appSyncCfTemplate,
  testContext
} = require('./testing-utils')

test('AppSync alarms are created', (t) => {
  const alarmConfigAppSync = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      AppSync: {
        '5XXError': {
          Threshold: 50
        },
        Latency: {
          Threshold: 50
        }
      }
    }

  )
  function createAlarmResources (appSyncAlarmConfig) {
    const { createAppSyncAlarms } = appSyncAlarms(appSyncAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate(appSyncCfTemplate)
    createAppSyncAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }

  const appSyncAlarmResources = createAlarmResources(alarmConfigAppSync.AppSync)

  const expectedTypesAppSync = {
    AppSync5XXErrorAlarm: '5XXError',
    AppSyncLatencyAlarm: 'Latency'
  }

  t.equal(Object.keys(appSyncAlarmResources).length, Object.keys(expectedTypesAppSync).length)
  for (const alarmResource of Object.values(appSyncAlarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypesAppSync[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, alarmConfigAppSync.AppSync[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/AppSync')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'GraphQLAPIId',
        Value: { 'Fn::GetAtt': ['AwesomeappsyncGraphQlApi', 'ApiId'] }
      }
    ])
  }

  t.end()
})

test('AppSync alarms are not created when disabled globally', (t) => {
  const alarmConfigAppSync = createTestConfig(
    defaultConfig.alarms,
    {
      AppSync: {
        enabled: false, // disabled globally
        Period: 60,
        '5XXError': {
          Threshold: 50
        },
        Latency: {
          Threshold: 50
        }
      }
    }
  )

  function createAlarmResources (appSyncAlarmConfig) {
    const { createAppSyncAlarms } = appSyncAlarms(appSyncAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate(appSyncCfTemplate)
    createAppSyncAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }

  const appSyncAlarmResources = createAlarmResources(alarmConfigAppSync.AppSync)

  t.same({}, appSyncAlarmResources)
  t.end()
})
