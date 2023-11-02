import { test } from 'tap'

import createRuleAlarms from '../eventbridge'
import { getResourcesByType } from '../../cf-template'
import type { ResourceType } from '../../cf-template'
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
  const compiledTemplate = createTestCloudFormationTemplate()
  const alarmResources: ResourceType = createRuleAlarms(ruleAlarmProperties, testContext, compiledTemplate)

  const expectedTypes = {
    Events_FailedInvocations_Alarm: 'FailedInvocations',
    Events_ThrottledRules_Alarm: 'ThrottledRules'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, ruleAlarmProperties[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al?.Namespace, 'AWS/Events')
    t.equal(al?.Period, 120)
    t.equal(al?.Dimensions.length, 1)
    t.equal(al?.Dimensions[0].Name, 'RuleName')
    t.ok(al?.Dimensions[0].Value)
  }

  t.end()
})

test('Events alarms are not created when disabled globally', (t) => {
  const AlarmProperties = createTestConfig(
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
  const ruleAlarmProperties = AlarmProperties.Events
  const compiledTemplate = createTestCloudFormationTemplate()
  createRuleAlarms(ruleAlarmProperties, testContext, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})
