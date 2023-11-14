import { test } from 'tap'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import createAppSyncAlarms from '../appsync'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  appSyncCfTemplate,
  testAlarmActionsConfig
} from '../../tests/testing-utils'
import type { ResourceType } from '../../cf-template'

test('AppSync alarms are created', (t) => {
  const testConfig = createTestConfig(
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

  const compiledTemplate = createTestCloudFormationTemplate(appSyncCfTemplate)
  const appSyncAlarmResources: ResourceType = createAppSyncAlarms(testConfig.AppSync, testAlarmActionsConfig, compiledTemplate)

  const expectedTypesAppSync = {
    AppSync_5XXErrorAlarm: '5XXError',
    AppSync_LatencyAlarm: 'Latency'
  }

  t.equal(Object.keys(appSyncAlarmResources).length, Object.keys(expectedTypesAppSync).length)
  for (const alarmResource of Object.values(appSyncAlarmResources)) {
    const al = alarmResource.Properties as AlarmProperties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypesAppSync[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, testConfig.AppSync[expectedMetric].Threshold)
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

test('AppSync resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template = createTestCloudFormationTemplate(appSyncCfTemplate);

  (template.Resources as ResourceType).AwesomeappsyncGraphQlApi.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        '5XXError': {
          enabled: false,
          Threshold: 9.9
        },
        Latency: {
          Threshold: 4321
        }
      }
    }
  }

  const alarmResources: ResourceType = createAppSyncAlarms(testConfig.AppSync, testAlarmActionsConfig, template)
  t.same(Object.keys(alarmResources).length, 1)

  const latencyAlarm = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === 'Latency')[0]

  t.equal(latencyAlarm?.Properties?.Threshold, 4321)
  t.equal(latencyAlarm?.Properties?.Period, 900)
  t.end()
})

test('AppSync alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
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

  const compiledTemplate = createTestCloudFormationTemplate(appSyncCfTemplate)
  const appSyncAlarmResources: ResourceType = createAppSyncAlarms(testConfig.AppSync, testAlarmActionsConfig, compiledTemplate)

  t.same({}, appSyncAlarmResources)
  t.end()
})
