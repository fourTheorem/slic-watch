import { test } from 'tap'

import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import createECSAlarms, { resolveEcsClusterNameAsCfn } from '../ecs'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testAlarmActionsConfig
} from '../../tests/testing-utils'
import type { ResourceType } from '../../cf-template'

test('resolveEcsClusterNameAsCfn', (t) => {
  const fromLiteral = resolveEcsClusterNameAsCfn('my-cluster')
  t.equal(fromLiteral, 'my-cluster')

  const fromArn = resolveEcsClusterNameAsCfn('arn:aws:ecs:us-east-1:123456789012:cluster/my-cluster')
  t.equal(fromArn, 'my-cluster')

  const fromRef = resolveEcsClusterNameAsCfn({ Ref: 'my-cluster' })
  t.same(fromRef, { Ref: 'my-cluster' })

  const fromGetAtt = resolveEcsClusterNameAsCfn({ GetAtt: ['my-cluster', 'Arn'] })
  t.same(fromGetAtt, { Ref: 'my-cluster' })

  const fromSub = resolveEcsClusterNameAsCfn({ 'Fn::Sub': '$' + '{my-cluster}' })
  t.same(fromSub, { 'Fn::Sub': '$' + '{my-cluster}' })

  t.end()
})

test('ECS MemoryUtilization is created', (t) => {
  const testConfig = createTestConfig(
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
  const compiledTemplate = createTestCloudFormationTemplate()

  const alarmResources: ResourceType = createECSAlarms(testConfig.ECS, testAlarmActionsConfig, compiledTemplate)

  const expectedTypes = {
    ECS_MemoryAlarm: 'MemoryUtilization',
    ECS_CPUAlarm: 'CPUUtilization'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties as AlarmProperties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, testConfig.ECS[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'LessThanThreshold')
    t.equal(al?.Namespace, 'AWS/ECS')
    t.equal(al?.Period, 120)
    t.same(al?.Dimensions, [
      {
        Name: 'ServiceName',
        Value: {
          name: 'Fn::GetAtt',
          payload: [
            'ecsService',
            'Name'
          ]
        }
      },
      {
        Name: 'ClusterName',
        Value: { Ref: 'ecsCluster' }
      }
    ])
  }

  t.end()
})

test('ECS resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template = createTestCloudFormationTemplate();

  (template.Resources as ResourceType).ecsService.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        MemoryUtilization: {
          Threshold: 51,
          enabled: false
        },
        CPUUtilization: {
          Threshold: 52
        }
      }
    }
  }

  const alarmResources: ResourceType = createECSAlarms(testConfig.ECS, testAlarmActionsConfig, template)
  t.same(Object.keys(alarmResources).length, 1)

  const cpuAlarm = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === 'CPUUtilization')[0]

  t.equal(cpuAlarm?.Properties?.Threshold, 52)
  t.equal(cpuAlarm?.Properties?.Period, 900)
  t.end()
})

test('ECS alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
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
  const ecsAlarmConfig = testConfig.ECS
  const compiledTemplate = createTestCloudFormationTemplate()

  const alarmResources = createECSAlarms(ecsAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})
