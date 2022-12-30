'use strict'

import albTargetAlarms, {AlbTargetAlarmConfig} from '../alarms-alb-target-group'
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

test('ALB Target Group alarms are created', (t) => {
  const alarmConfigTargetGroup = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      ApplicationELBTarget: {
        HTTPCode_Target_5XX_Count: {
          Threshold: 50
        },
        UnHealthyHostCount: {
          Threshold: 50
        },
        LambdaInternalError: {
          Threshold: 50
        },
        LambdaUserError: {
          Threshold: 50
        }
      }
    }

  )
  function createAlarmResources (elbAlarmConfig:AlbTargetAlarmConfig) {
    const { createALBTargetAlarms } = albTargetAlarms(elbAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate(albCfTemplate)
    createALBTargetAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }
  // @ts-ignore
  const targeGroupAlarmResources = createAlarmResources(alarmConfigTargetGroup.ApplicationELBTarget)

  const expectedTypesTargetGroup = {
    LoadBalancerHTTPCodeTarget5XXCountAlarm: 'HTTPCode_Target_5XX_Count',
    LoadBalancerUnHealthyHostCountAlarm: 'UnHealthyHostCount',
    LoadBalancerLambdaInternalErrorAlarm: 'LambdaInternalError',
    LoadBalancerLambdaUserErrorAlarm: 'LambdaUserError'
  }

  t.equal(Object.keys(targeGroupAlarmResources).length, Object.keys(expectedTypesTargetGroup).length)
  for (const alarmResource of Object.values(targeGroupAlarmResources)) {
   // @ts-ignore 
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypesTargetGroup[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    // @ts-ignore
    t.equal(al.Threshold, alarmConfigTargetGroup.ApplicationELBTarget[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/ApplicationELB')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'TargetGroup',
        Value: { 'Fn::GetAtt': ['AlbEventAlbTargetGrouphttpListener', 'TargetGroupFullName'] }
      },
      {
        Name: 'LoadBalancer',
        Value: { 'Fn::GetAtt': ['alb', 'LoadBalancerFullName'] }
      }
    ])
  }

  t.end()
})

test('ALB alarms are not created when disabled globally', (t) => {
  const alarmConfigTargetGroup = createTestConfig(
    defaultConfig.alarms,
    {
      ApplicationELBTarget: {
        enabled: false, // disabled globally
        Period: 60,
        HTTPCode_Target_5XX_Count: {
          Threshold: 50
        },
        UnHealthyHostCount: {
          Threshold: 50
        },
        LambdaInternalError: {
          Threshold: 50
        },
        LambdaUserError: {
          Threshold: 50
        }
      }
    }
  )

  function createAlarmResources (elbAlarmConfig) {
    const { createALBTargetAlarms } = albTargetAlarms(elbAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate(albCfTemplate)
    createALBTargetAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }
  // @ts-ignore
  const targeGroupAlarmResources = createAlarmResources(alarmConfigTargetGroup.ApplicationELBTarget)

  t.same({}, targeGroupAlarmResources)
  t.end()
})
