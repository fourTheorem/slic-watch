import { test } from 'tap'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import createSnsAlarms from '../sns'
import { getResourcesByType } from '../../cf-template'
import type { ResourceType } from '../../cf-template'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testAlarmActionsConfig
} from '../../tests/testing-utils'

test('SNS alarms are created', (t) => {
  const testConfig = createTestConfig(
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
  const snsAlarmConfig = testConfig.SNS
  const compiledTemplate = createTestCloudFormationTemplate()

  const alarmResources: ResourceType = createSnsAlarms(snsAlarmConfig, testAlarmActionsConfig, compiledTemplate)
  const expectedTypes = {
    SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm: 'NumberOfNotificationsFilteredOut-InvalidAttributes',
    SNS_NumberOfNotificationsFailed_Alarm: 'NumberOfNotificationsFailed'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties as AlarmProperties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.ok(expectedMetric)
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, snsAlarmConfig[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al?.Namespace, 'AWS/SNS')
    t.equal(al?.Period, 120)
    t.same(al?.Dimensions, [
      {
        Name: 'TopicName',
        Value: {
          name: 'Fn::GetAtt',
          payload: [
            'topic',
            'TopicName'
          ]
        }
      }
    ])
  }

  t.end()
})

test('topic resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template = createTestCloudFormationTemplate();

  (template.Resources as ResourceType).topic.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        'NumberOfNotificationsFilteredOut-InvalidAttributes': {
          Threshold: 51
        },
        NumberOfNotificationsFailed: {
          Threshold: 52,
          Period: 3600
        }
      }
    }
  }

  const alarmResources: ResourceType = createSnsAlarms(testConfig.SNS, testAlarmActionsConfig, template)
  t.same(Object.keys(alarmResources).length, 2)

  const invalidAttrsAlarm = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === 'NumberOfNotificationsFilteredOut-InvalidAttributes')[0]
  const failedAlarm = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === 'NumberOfNotificationsFailed')[0]
  t.equal(invalidAttrsAlarm?.Properties?.Threshold, 51)
  t.equal(invalidAttrsAlarm?.Properties?.Period, 900)
  t.equal(failedAlarm?.Properties?.Threshold, 52)
  t.equal(failedAlarm?.Properties?.Period, 3600)

  t.end()
})

test('SNS alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
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
  const snsAlarmConfig = testConfig.SNS
  const compiledTemplate = createTestCloudFormationTemplate()
  createSnsAlarms(snsAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})
