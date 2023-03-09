'use strict'

import createECSAlarms, { resolveEcsClusterNameAsCfn } from '../ecs'
import { getResourcesByType } from '../../cf-template'
import { test } from 'tap'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} from '../../tests/testing-utils'

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
  const AlarmProperties = createTestConfig(
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
  const ecsAlarmProperties = AlarmProperties.ECS
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate()
  createECSAlarms(ecsAlarmProperties, testContext, compiledTemplate, additionalResources)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  const expectedTypes = {
    ECS_MemoryAlarm: 'MemoryUtilization',
    ECS_CPUAlarm: 'CPUUtilization'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, ecsAlarmProperties[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'LessThanThreshold')
    t.equal(al?.Namespace, 'AWS/ECS')
    t.equal(al?.Period, 120)
    t.same(al?.Dimensions, [
      {
        Name: 'ServiceName',
        Value: '${ecsService.Name}'
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
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      ECS: {
        ActionsEnabled: false, // disabled globally
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
  const ecsAlarmProperties = AlarmProperties.ECS
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate()
  createECSAlarms(ecsAlarmProperties, testContext, compiledTemplate, additionalResources)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})
