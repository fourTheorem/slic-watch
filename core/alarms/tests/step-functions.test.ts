import { test } from 'tap'

import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import createStatesAlarms from '../step-functions'
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

test('Step Function alarms are created', (t) => {
  const testConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      States: {
        Period: 900,
        ExecutionThrottled: {
          Threshold: 0
        },
        ExecutionsFailed: {
          Threshold: 0
        },
        ExecutionsTimedOut: {
          Threshold: 0
        }
      }
    }
  )
  const sfAlarmConfig = testConfig.States
  const compiledTemplate = createTestCloudFormationTemplate()
  const alarmResources: ResourceType = createStatesAlarms(sfAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 6)
  for (const [resourceName, alarmResource] of Object.entries(alarmResources)) {
    // Just test the standard workflow alarms
    if (!resourceName.endsWith('ExpressWorkflow')) {
      const al = alarmResource.Properties as AlarmProperties
      assertCommonAlarmProperties(t, al)
      const alarmType = alarmNameToType(al?.AlarmName)
      alarmsByType[alarmType] = alarmsByType[alarmType] ?? new Set()
      alarmsByType[alarmType].add(al)
    }
  }

  const executionMetrics = [
    'StepFunctions_ExecutionThrottledAlarm',
    'StepFunctions_ExecutionsFailedAlarm',
    'StepFunctions_ExecutionsTimedOutAlarm'
  ]

  t.same(new Set(Object.keys(alarmsByType)), new Set(executionMetrics))

  for (const type of executionMetrics) {
    t.equal(alarmsByType[type].size, 1)
    for (const al of alarmsByType[type]) {
      t.equal(al.Statistic, 'Sum')
      const metric = type.split('_')[1].replace(/Alarm$/g, '')
      t.equal(al.Threshold, sfAlarmConfig[metric].Threshold)
      t.equal(al.EvaluationPeriods, 2)
      t.equal(al.TreatMissingData, 'breaching')
      t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
      t.equal(al.Namespace, 'AWS/States')
      t.equal(al.Period, 900)
      t.same(al.Dimensions, [
        {
          Name: 'StateMachineArn',
          Value: {
            name: 'Ref',
            payload: 'Workflow'
          }
        }
      ])
    }
  }

  t.end()
})

test('step function resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template = createTestCloudFormationTemplate();

  (template.Resources as ResourceType).Workflow.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        ExecutionThrottled: {
          Threshold: 1
        },
        ExecutionsFailed: {
          Threshold: 2,
          enabled: false
        },
        ExecutionsTimedOut: {
          Threshold: 3
        }
      }
    }
  }

  const alarmResources: ResourceType = createStatesAlarms(testConfig.States, testAlarmActionsConfig, template)
  t.same(Object.keys(alarmResources).length, 5) // Two for standard workflow, three for the express workflow

  const throttledAlarm = Object.entries(alarmResources).filter(([key, value]) => !key.includes('xpress') && value?.Properties?.MetricName === 'ExecutionThrottled')[0][1]
  const timedOutAlarm = Object.entries(alarmResources).filter(([key, value]) => !key.includes('xpress') && value?.Properties?.MetricName === 'ExecutionsTimedOut')[0][1]
  t.equal(throttledAlarm?.Properties?.Threshold, 1)
  t.equal(throttledAlarm?.Properties?.Period, 900)
  t.equal(timedOutAlarm?.Properties?.Threshold, 3)
  t.equal(timedOutAlarm?.Properties?.Period, 900)

  t.end()
})
test('Step function alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
    defaultConfig.alarms,
    {
      States: {
        enabled: false, // disabled globally
        Period: 900,
        ExecutionThrottled: {
          Threshold: 0
        },
        ExecutionsFailed: {
          Threshold: 0
        },
        ExecutionsTimedOut: {
          Threshold: 0
        }
      }
    }
  )
  const sfAlarmConfig = testConfig.States
  const compiledTemplate = createTestCloudFormationTemplate()
  createStatesAlarms(sfAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})

test('Step function alarms are not created when disabled individually', (t) => {
  const testConfig = createTestConfig(
    defaultConfig.alarms,
    {
      States: {
        enabled: true, // enabdled globally
        Period: 900,
        ExecutionThrottled: {
          enabled: false, // disabled locally
          Threshold: 0
        },
        ExecutionsFailed: {
          enabled: false, // disabled locally
          Threshold: 0
        },
        ExecutionsTimedOut: {
          enabled: false, // disabled locally
          Threshold: 0
        }
      }
    }
  )
  const sfAlarmConfig = testConfig.States
  const compiledTemplate = createTestCloudFormationTemplate()
  createStatesAlarms(sfAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})
