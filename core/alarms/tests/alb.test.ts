import { test } from 'tap'

import createAlbAlarms from '../alb'
import type { SlicWatchAlbAlarmsConfig } from '../alb'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  albCfTemplate,
  testContext
} from '../../tests/testing-utils'
import type { ResourceType } from '../../cf-template'
import type { SlicWatchMergedConfig } from '../alarm-types'

test('ALB alarms are created', (t) => {
  const AlarmPropertiesELB = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      ApplicationELB: {
        HTTPCode_ELB_5XX_Count: {
          Threshold: 50
        },
        RejectedConnectionCount: {
          Threshold: 50
        }
      }
    }

  )
  function createAlarmResources (elbAlarmProperties: SlicWatchAlbAlarmsConfig<SlicWatchMergedConfig>) {
    const compiledTemplate = createTestCloudFormationTemplate(albCfTemplate)
    return createAlbAlarms(elbAlarmProperties, testContext, compiledTemplate)
  }
  const albAlarmResources: ResourceType = createAlarmResources(AlarmPropertiesELB.ApplicationELB)

  const expectedTypesELB = {
    LoadBalancer_HTTPCodeELB5XXCountAlarm: 'HTTPCode_ELB_5XX_Count',
    LoadBalancer_RejectedConnectionCountAlarm: 'RejectedConnectionCount'
  }

  t.equal(Object.keys(albAlarmResources).length, Object.keys(expectedTypesELB).length)
  for (const alarmResource of Object.values(albAlarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypesELB[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, AlarmPropertiesELB.ApplicationELB[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al?.Namespace, 'AWS/ApplicationELB')
    t.equal(al?.Period, 120)
    t.same(al?.Dimensions, [
      {
        Name: 'LoadBalancer',
        Value: {
          name: 'Fn::GetAtt',
          payload: [
            'alb',
            'LoadBalancerFullName'
          ]
        }
      }
    ])
  }

  t.end()
})

test('ALB alarms are not created when disabled globally', (t) => {
  const AlarmPropertiesELB = createTestConfig(
    defaultConfig.alarms,
    {
      ApplicationELB: {
        enabled: false, // disabled globally
        Period: 60,
        HTTPCode_ELB_5XX_Count: {
          Threshold: 50
        },
        RejectedConnectionCount: {
          Threshold: 50
        }
      }
    }
  )

  function createAlarmResources (elbAlarmProperties) {
    const compiledTemplate = createTestCloudFormationTemplate(albCfTemplate)
    return createAlbAlarms(elbAlarmProperties, testContext, compiledTemplate)
  }
  const albAlarmResources = createAlarmResources(AlarmPropertiesELB.ApplicationELB)

  t.same({}, albAlarmResources)
  t.end()
})
