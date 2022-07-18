'use strict'

const albAlarms = require('../alarms-alb')
const { test } = require('tap')
const defaultConfig = require('../default-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} = require('./testing-utils')

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
  const alarmConfigTargetGroup = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      ApplicationELB: {
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

  const albAlarmConfig = (alarmConfigELB + alarmConfigTargetGroup).ApplicationELB

  const { createALBAlarms } = albAlarms(albAlarmConfig, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createALBAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const expectedTypesELB = {
    LoadBalancerHTTPCodeELB5XXCountAlarm: 'HTTPCode_ELB_5XX_Count',
    LoadBalancerRejectedConnectionCountAlarm: 'RejectedConnectionCount'
  }

  const expectedTypesTargetGroup = {
    LoadBalancerHTTPCodeTarget5XXCountAlarm: 'HTTPCode_Target_5XX_Count',
    LoadBalancerUnHealthyHostCountAlarm: 'UnHealthyHostCount',
    LoadBalancerLambdaInternalErrorAlarm: 'LambdaInternalError',
    LoadBalancerLambdaUserErrorAlarm: 'LambdaUserError'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypesELB).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypesELB[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, albAlarmConfig[expectedMetric].Threshold)
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

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypesTargetGroup).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypesTargetGroup[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, albAlarmConfig[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/ApplicationELB')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'LoadBalancer',
        Value: { 'Fn::GetAtt': ['alb', 'LoadBalancerFullName'] }
      },
      {
        Name: 'TargetGroup',
        Value: { 'Fn::GetAtt': ['AlbEventAlbTargetGrouphttpListener', 'TargetGroupFullName'] }
      }
    ])
  }

  t.end()
})

test('ALB alarms are not created when disabled globally', (t) => {
  const alarmConfig = createTestConfig(
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
        },
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

  const albAlarmConfig = alarmConfig.ApplicationELB

  const { createALBAlarms } = albAlarms(albAlarmConfig, testContext)

  const cfTemplate = createTestCloudFormationTemplate()
  createALBAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})
