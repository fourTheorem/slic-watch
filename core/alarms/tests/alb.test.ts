import { test } from 'tap'

import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import createAlbAlarms from '../alb'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  albCfTemplate,
  testAlarmActionsConfig
} from '../../tests/testing-utils'
import type { ResourceType } from '../../cf-template'

test('ALB alarms are created', (t) => {
  const testConfig = createTestConfig(
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
  const compiledTemplate = createTestCloudFormationTemplate(albCfTemplate)
  const albAlarmResources: ResourceType = createAlbAlarms(testConfig.ApplicationELB, testAlarmActionsConfig, compiledTemplate)

  const expectedTypesELB = {
    LoadBalancer_HTTPCodeELB5XXCountAlarm: 'HTTPCode_ELB_5XX_Count',
    LoadBalancer_RejectedConnectionCountAlarm: 'RejectedConnectionCount'
  }

  t.equal(Object.keys(albAlarmResources).length, Object.keys(expectedTypesELB).length)
  for (const alarmResource of Object.values(albAlarmResources)) {
    const al = alarmResource.Properties as AlarmProperties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypesELB[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, testConfig.ApplicationELB[expectedMetric].Threshold)
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

test('ALB resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template = createTestCloudFormationTemplate(albCfTemplate);
  (template.Resources as ResourceType).alb.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        HTTPCode_ELB_5XX_Count: {
          Threshold: 51,
          enabled: false
        },
        RejectedConnectionCount: {
          Threshold: 52
        }
      }
    }
  }

  const albAlarmResources: ResourceType = createAlbAlarms(testConfig.ApplicationELB, testAlarmActionsConfig, template)

  t.same(Object.keys(albAlarmResources).length, 1)

  const rejectedConnectionAlarm = Object.values(albAlarmResources).filter(a => a?.Properties?.MetricName === 'RejectedConnectionCount')[0]

  t.equal(rejectedConnectionAlarm?.Properties?.Threshold, 52)
  t.end()
})

test('ALB alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
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
    return createAlbAlarms(elbAlarmProperties, testAlarmActionsConfig, compiledTemplate)
  }
  const albAlarmResources = createAlarmResources(testConfig.ApplicationELB)

  t.same({}, albAlarmResources)
  t.end()
})
