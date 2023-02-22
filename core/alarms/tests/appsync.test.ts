/* eslint-disable no-template-curly-in-string */
'use strict'

import appSyncAlarms, { AppSyncAlarmProperties } from '../appsync'
import { test } from 'tap'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  appSyncCfTemplate,
  testContext
} from '../../tests/testing-utils'

test('AppSync alarms are created', (t) => {
  const AlarmPropertiesAppSync = createTestConfig(
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
  function createAlarmResources (appSyncAlarmProperties: AppSyncAlarmProperties) {
    const { createAppSyncAlarms } = appSyncAlarms(appSyncAlarmProperties, testContext)
    const cfTemplate = createTestCloudFormationTemplate(appSyncCfTemplate)
    createAppSyncAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }
  const appSyncAlarmResources = createAlarmResources(AlarmPropertiesAppSync.AppSync)

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
    t.equal(al.Threshold, AlarmPropertiesAppSync.AppSync[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/AppSync')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'GraphQLAPIId',
        Value: '${AwesomeappsyncGraphQlApi.ApiId}}'
      }
    ])
  }

  t.end()
})

test('AppSync alarms are not created when disabled globally', (t) => {
  const AlarmPropertiesAppSync = createTestConfig(
    defaultConfig.alarms,
    {
      AppSync: {
        ActionsEnabled: false, // disabled globally
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

  function createAlarmResources (appSyncAlarmProperties) {
    const { createAppSyncAlarms } = appSyncAlarms(appSyncAlarmProperties, testContext)
    const cfTemplate = createTestCloudFormationTemplate(appSyncCfTemplate)
    createAppSyncAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }
  const appSyncAlarmResources = createAlarmResources(AlarmPropertiesAppSync.AppSync)

  t.same({}, appSyncAlarmResources)
  t.end()
})
