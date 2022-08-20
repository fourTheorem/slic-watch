'use strict'

const ecsAlarms = require('../alarms-ecs')
const { test } = require('tap')
const defaultConfig = require('../default-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} = require('./testing-utils')

test('ECS MemoryUtilization is created', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'LessThanThreshold',
      ECS: {
        MemoryUtilization: {
          Threshold: 50
        },
        CPUUtilization: {
          Threshold: 50
        }
      }
    }
  )

  const ecsAlarmConfig = alarmConfig.ECS

  const { createECSAlarms } = ecsAlarms(ecsAlarmConfig, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createECSAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const expectedTypes = {
    ECSMemoryAlarm: 'MemoryUtilization',
    ECSCPUAlarm: 'CPUUtilization'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, ecsAlarmConfig[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'LessThanThreshold')
    t.equal(al.Namespace, 'AWS/ECS')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'ServiceName',
        Value: 'awesome-service'
      },
      {
        Name: 'ClusterName',
        Value: { Ref: 'ecsCluster' }
      }
    ])
  }

  t.end()
})

test('ECS alarms are not created when disabled globally', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      ECS: {
        enabled: false, // disabled globally
        Period: 60,
        MemoryUtilization: {
          Threshold: 50
        },
        CPUUtilization: {
          Threshold: 50
        }
      }
    }
  )

  const ecsAlarmConfig = alarmConfig.ECS

  const { createECSAlarms } = ecsAlarms(ecsAlarmConfig, testContext)

  const cfTemplate = createTestCloudFormationTemplate()
  createECSAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})
