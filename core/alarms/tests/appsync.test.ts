import { test } from 'tap'

import createAppSyncAlarms from '../appsync'
import type { SlicWatchAppSyncAlarmsConfig } from '../appsync'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  appSyncCfTemplate,
  testContext
} from '../../tests/testing-utils'
import type { ResourceType } from '../../cf-template'
import type { SlicWatchMergedConfig } from '../alarm-types'

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
  function createAlarmResources (appSyncAlarmProperties: SlicWatchAppSyncAlarmsConfig<SlicWatchMergedConfig>) {
    const compiledTemplate = createTestCloudFormationTemplate(appSyncCfTemplate)
    return createAppSyncAlarms(appSyncAlarmProperties, testContext, compiledTemplate)
  }
  const appSyncAlarmResources: ResourceType = createAlarmResources(AlarmPropertiesAppSync.AppSync)

  const expectedTypesAppSync = {
    AppSync_5XXErrorAlarm: '5XXError',
    AppSync_LatencyAlarm: 'Latency'
  }

  t.equal(Object.keys(appSyncAlarmResources).length, Object.keys(expectedTypesAppSync).length)
  for (const alarmResource of Object.values(appSyncAlarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypesAppSync[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, AlarmPropertiesAppSync.AppSync[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al?.Namespace, 'AWS/AppSync')
    t.equal(al?.Period, 120)
    t.same(al?.Dimensions, [
      {
        Name: 'GraphQLAPIId',
        Value: {
          name: 'Fn::GetAtt',
          payload: [
            'AwesomeappsyncGraphQlApi',
            'ApiId'
          ]
        }
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

  function createAlarmResources (appSyncAlarmProperties) {
    const compiledTemplate = createTestCloudFormationTemplate(appSyncCfTemplate)
    return createAppSyncAlarms(appSyncAlarmProperties, testContext, compiledTemplate)
  }
  const appSyncAlarmResources = createAlarmResources(AlarmPropertiesAppSync.AppSync)

  t.same({}, appSyncAlarmResources)
  t.end()
})
