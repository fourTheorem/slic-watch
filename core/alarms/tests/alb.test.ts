'use strict'

import createALBAlarms, { type AlbAlarmProperties } from '../alb'
import { test } from 'tap'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  albCfTemplate,
  testContext
} from '../../tests/testing-utils'
import { getResourcesByType } from '../../cf-template'

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
  function createAlarmResources (elbAlarmProperties: AlbAlarmProperties) {
    const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate(albCfTemplate)
    createALBAlarms(elbAlarmProperties, testContext, compiledTemplate, additionalResources)
    return getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
  }
  const albAlarmResources = createAlarmResources(AlarmPropertiesELB.ApplicationELB)

  const expectedTypesELB = {
    LoadBalancerHTTPCodeELB5XXCountAlarm: 'HTTPCode_ELB_5XX_Count',
    LoadBalancerRejectedConnectionCountAlarm: 'RejectedConnectionCount'
  }

  t.equal(Object.keys(albAlarmResources).length, Object.keys(expectedTypesELB).length)
  for (const alarmResource of Object.values(albAlarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypesELB[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, AlarmPropertiesELB.ApplicationELB[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/ApplicationELB')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'LoadBalancer',
        Value: '${alb.LoadBalancerFullName}'
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
        ActionsEnabled: false, // disabled globally
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
    const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate(albCfTemplate)
    createALBAlarms(elbAlarmProperties, testContext, compiledTemplate, additionalResources)
    return getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
  }
  const albAlarmResources = createAlarmResources(AlarmPropertiesELB.ApplicationELB)

  t.same({}, albAlarmResources)
  t.end()
})
