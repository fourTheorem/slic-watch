'use strict'

const snsAlarms = require('../alarms-sns')
const { test } = require('tap')
const defaultConfig = require('../default-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} = require('./testing-utils')

test('SNS alarms are created', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      SNS: {
        'NumberOfNotificationsFilteredOut-InvalidAttributes': {
          Threshold: 50
        },
        NumberOfNotificationsFailed: {
          Threshold: 50
        }
      }
    }
  )

  const snsAlarmConfig = alarmConfig.SNS

  const { createSNSAlarms } = snsAlarms(snsAlarmConfig, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createSNSAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const expectedTypes = {
    SNSNumberOfNotificationsFilteredOutInvalidAttributesAlarm: 'NumberOfNotificationsFilteredOut-InvalidAttributes',
    SNSNumberOfNotificationsFailedAlarm: 'NumberOfNotificationsFailed'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, snsAlarmConfig[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/SNS')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'TopicName',
        Value: { 'Fn::GetAtt': ['topic', 'TopicName'] }
      }
    ])
  }

  t.end()
})

test('SNS alarms are not created when disabled globally', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      SNS: {
        enabled: false, // disabled globally
        Period: 60,
        'NumberOfNotificationsFilteredOut-InvalidAttributes': {
          Threshold: 50
        },
        NumberOfNotificationsFailed: {
          Threshold: 50
        }
      }
    }
  )

  const snsAlarmConfig = alarmConfig.SNS

  const { createSNSAlarms } = snsAlarms(snsAlarmConfig, testContext)

  const cfTemplate = createTestCloudFormationTemplate()
  createSNSAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})
