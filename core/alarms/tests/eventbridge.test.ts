'use strict'

import createRuleAlarms from '../eventbridge'
import { getResourcesByType } from '../../cf-template'
import { test } from 'tap'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} from '../../tests/testing-utils'

test('Events alarms are created', (t) => {
  const AlarmProperties = createTestConfig(
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
  const ruleAlarmProperties = AlarmProperties.Events
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate()
  createRuleAlarms(ruleAlarmProperties, testContext, compiledTemplate, additionalResources)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  const expectedTypes = {
    Events_FailedInvocationsAlarm: 'FailedInvocations',
    Events_ThrottledRulesAlarm: 'ThrottledRules'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, ruleAlarmProperties[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/Events')
    t.equal(al.Period, 120)
    t.equal(al.Dimensions.length, 1)
    t.equal(al.Dimensions[0].Name, 'RuleName')
    t.ok(al.Dimensions[0].Value)
  }

  t.end()
})

test('Events alarms are not created when disabled globally', (t) => {
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      Events: {
        ActionsEnabled: false, // disabled globally
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
  const ruleAlarmProperties = AlarmProperties.Events
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate()
  createRuleAlarms(ruleAlarmProperties, testContext, compiledTemplate, additionalResources)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})