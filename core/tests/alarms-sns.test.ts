'use strict'

import snsAlarms from '../alarms-sns'
import { test } from 'tap'
import defaultConfig from '../default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} from './testing-utils'

test('SNS alarms are created', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      SNS: {
        'NumberOfNotificationsFilteredOut-InvalidAttributes': {
          Threshold: 50
        },
        NumberOfNotificationsFailed: {
          Threshold: 50
        }
      }
    }
  )
  // @ts-ignore
  const snsAlarmConfig = alarmConfig.SNS

  const { createSNSAlarms } = snsAlarms(snsAlarmConfig, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createSNSAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const expectedTypes = {
    SNS_NumberOfNotificationsFilteredOutInvalidAttributesAlarm: 'NumberOfNotificationsFilteredOut-InvalidAttributes',
    SNS_NumberOfNotificationsFailedAlarm: 'NumberOfNotificationsFailed'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    // @ts-ignore
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    // @ts-ignore
    t.equal(al.Threshold, snsAlarmConfig[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/SNS')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'TopicName',
        Value: { 'Fn::GetAtt': ['topic', 'TopicName'] }
      }
    ])
  }

  t.end()
})

test('SNS alarms are not created when disabled globally', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      SNS: {
        enabled: false, // disabled globally
        Period: 60,
        'NumberOfNotificationsFilteredOut-InvalidAttributes': {
          Threshold: 50
        },
        NumberOfNotificationsFailed: {
          Threshold: 50
        }
      }
    }
  )
  // @ts-ignore
  const snsAlarmConfig = alarmConfig.SNS

  const { createSNSAlarms } = snsAlarms(snsAlarmConfig, testContext)

  const cfTemplate = createTestCloudFormationTemplate()
  createSNSAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})
