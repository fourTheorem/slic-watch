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
  function createAlarmResources (elbAlarmConfig) {
    const { createALBAlarms } = albAlarms(elbAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate()
    createALBAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }

  const albAlarmResources = createAlarmResources(alarmConfigELB.ApplicationELB)
  const targeGroupAlarmResources = createAlarmResources(alarmConfigTargetGroup.ApplicationELBTarget)

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

  t.equal(Object.keys(albAlarmResources).length, Object.keys(expectedTypesELB).length)
  for (const alarmResource of Object.values(albAlarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypesELB[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
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

  t.equal(Object.keys(targeGroupAlarmResources).length, Object.keys(expectedTypesTargetGroup).length)
  for (const alarmResource of Object.values(targeGroupAlarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypesTargetGroup[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
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
    const { createALBAlarms } = albAlarms(elbAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate()
    createALBAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }

  const albAlarmResources = createAlarmResources(alarmConfigELB.ApplicationELB)
  const targeGroupAlarmResources = createAlarmResources(alarmConfigTargetGroup.ApplicationELBTarget)

  t.same({}, albAlarmResources, targeGroupAlarmResources)
  t.end()
})
