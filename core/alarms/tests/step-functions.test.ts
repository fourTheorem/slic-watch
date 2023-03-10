'use strict'

import createStatesAlarms from '../step-functions'
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

test('Step Function alarms are created', (t) => {
  const AlarmProperties = createTestConfig(
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
  const sfAlarmProperties = AlarmProperties.States
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate()
  createStatesAlarms(sfAlarmProperties, testContext, compiledTemplate, additionalResources)
  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 6)
  for (const [resourceName, alarmResource] of Object.entries(alarmResources)) {
    // Just test the standard workflow alarms
    if (!resourceName.endsWith('ExpressWorkflow')) {
      const al = alarmResource.Properties
      assertCommonAlarmProperties(t, al)
      const alarmType = alarmNameToType(al?.AlarmName)
      alarmsByType[alarmType] = alarmsByType[alarmType] ?? new Set()
      alarmsByType[alarmType].add(al)
    }
  }

  const executionMetrics = [
    'StepFunctions_ExecutionThrottled',
    'StepFunctions_ExecutionsFailed',
    'StepFunctions_ExecutionsTimedOut'
  ]

  t.same(new Set(Object.keys(alarmsByType)), new Set(executionMetrics))

  for (const type of executionMetrics) {
    t.equal(alarmsByType[type].size, 1)
    for (const al of alarmsByType[type]) {
      t.equal(al.Statistic, 'Sum')
      const metric = type.split('_')[1]
      t.equal(al.Threshold, sfAlarmProperties[metric].Threshold)
      t.equal(al.EvaluationPeriods, 2)
      t.equal(al.TreatMissingData, 'breaching')
      t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
      t.equal(al.Namespace, 'AWS/States')
      t.equal(al.Period, 900)
      t.same(al.Dimensions, [
        {
          Name: 'StateMachineArn',
          Value: {
            Ref: 'Workflow'
          }
        }
      ])
    }
  }

  t.end()
})

test('Step function alarms are not created when disabled globally', (t) => {
  const AlarmProperties = createTestConfig(
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
  const sfAlarmProperties = AlarmProperties.States
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate()
  createStatesAlarms(sfAlarmProperties, testContext, compiledTemplate, additionalResources)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})

test('Step function alarms are not created when disabled individually', (t) => {
  const AlarmProperties = createTestConfig(
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
  const sfAlarmProperties = AlarmProperties.States
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate()
  createStatesAlarms(sfAlarmProperties, testContext, compiledTemplate, additionalResources)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})
