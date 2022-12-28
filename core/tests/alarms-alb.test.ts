'use strict'

import albAlarms from '../alarms-alb'
import { test } from 'tap'
import defaultConfig from '../default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  albCfTemplate,
  testContext
} from './testing-utils'

test('ALB alarms are created', (t) => {
  const alarmConfigELB = createTestConfig(
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
  function createAlarmResources (elbAlarmConfig) {
    const { createALBAlarms } = albAlarms(elbAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate(albCfTemplate)
    createALBAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }
  // @ts-ignore
  const albAlarmResources = createAlarmResources(alarmConfigELB.ApplicationELB)

  const expectedTypesELB = {
    LoadBalancerHTTPCodeELB5XXCountAlarm: 'HTTPCode_ELB_5XX_Count',
    LoadBalancerRejectedConnectionCountAlarm: 'RejectedConnectionCount'
  }

  t.equal(Object.keys(albAlarmResources).length, Object.keys(expectedTypesELB).length)
  for (const alarmResource of Object.values(albAlarmResources)) {
    // @ts-ignore
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypesELB[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    // @ts-ignore
    t.equal(al.Threshold, alarmConfigELB.ApplicationELB[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/ApplicationELB')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'LoadBalancer',
        Value: { 'Fn::GetAtt': ['alb', 'LoadBalancerFullName'] }
      }
    ])
  }

  t.end()
})

test('ALB alarms are not created when disabled globally', (t) => {
  const alarmConfigELB = createTestConfig(
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

  function createAlarmResources (elbAlarmConfig) {
    const { createALBAlarms } = albAlarms(elbAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate(albCfTemplate)
    createALBAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }
  // @ts-ignore
  const albAlarmResources = createAlarmResources(alarmConfigELB.ApplicationELB)

  t.same({}, albAlarmResources)
  t.end()
})
