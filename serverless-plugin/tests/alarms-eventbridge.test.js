'use strict'

const ruleAlarms = require('../../core/alarms-eventbridge')
const { test } = require('tap')
const defaultConfig = require('../../core/default-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} = require('./testing-utils')

test('Events alarms are created', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      Events: {
        FailedInvocations: {
          Threshold: 50
        },
        ThrottledRules: {
          Threshold: 50
        }
      }
    }
  )

  const ruleAlarmConfig = alarmConfig.Events

  const { createRuleAlarms } = ruleAlarms(ruleAlarmConfig, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createRuleAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const expectedTypes = {
    EventsFailedInvocationsAlarm: 'FailedInvocations',
    EventsThrottledRulesAlarm: 'ThrottledRules'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, ruleAlarmConfig[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/Events')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'RuleName',
        Value: 'serverless-test-project-dev-eventsRule-rule-1'
      }
    ])
  }

  t.end()
})

test('Events alarms are not created when disabled globally', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Events: {
        enabled: false, // disabled globally
        Period: 60,
        FailedInvocations: {
          Threshold: 50
        },
        ThrottledRules: {
          Threshold: 50
        }
      }
    }
  )

  const ruleAlarmConfig = alarmConfig.Events

  const { createRuleAlarms } = ruleAlarms(ruleAlarmConfig, testContext)

  const cfTemplate = createTestCloudFormationTemplate()
  createRuleAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})
