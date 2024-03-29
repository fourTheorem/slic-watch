import { test } from 'tap'

import type { AlarmProperties, Dimension } from 'cloudform-types/types/cloudWatch/alarm'

import createRuleAlarms from '../eventbridge'
import { getResourcesByType } from '../../cf-template'
import type { ResourceType } from '../../cf-template'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testAlarmActionsConfig
} from '../../tests/testing-utils'

test('Events alarms are created', (t) => {
  const testConfig = createTestConfig(
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
  const ruleAlarmConfig = testConfig.Events
  const compiledTemplate = createTestCloudFormationTemplate()
  const alarmResources: ResourceType = createRuleAlarms(ruleAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  const expectedTypes = {
    Events_FailedInvocations_Alarm: 'FailedInvocations',
    Events_ThrottledRules_Alarm: 'ThrottledRules'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties as AlarmProperties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, ruleAlarmConfig[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al?.Namespace, 'AWS/Events')
    t.equal(al?.Period, 120)
    const dims = al?.Dimensions as Dimension[]
    t.equal(dims.length, 1)
    const [dim] = dims
    t.equal(dim.Name, 'RuleName')
    t.ok(dim.Value)
  }

  t.end()
})

test('EventBridge Rule resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template = createTestCloudFormationTemplate();

  (template.Resources as ResourceType).ServerlesstestprojectdeveventsRulerule1EventBridgeRule.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        FailedInvocations: {
          Threshold: 59
        },
        ThrottledRules: {
          Threshold: 58,
          enabled: false
        }
      }
    }
  }

  const alarmResources: ResourceType = createRuleAlarms(testConfig.Events, testAlarmActionsConfig, template)
  t.same(Object.keys(alarmResources).length, 1)

  const failedInvocationsAlarm = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === 'FailedInvocations')[0]

  t.equal(failedInvocationsAlarm?.Properties?.Threshold, 59)
  t.equal(failedInvocationsAlarm?.Properties?.Period, 900)
  t.end()
})

test('Events alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
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
  const ruleAlarmConfig = testConfig.Events
  const compiledTemplate = createTestCloudFormationTemplate()
  createRuleAlarms(ruleAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})
