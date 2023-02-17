/* eslint-disable no-template-curly-in-string */
'use strict'

import sqsAlarms from '../sqs'
import { test } from 'tap'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} from '../../tests/testing-utils'

export type AlarmsByType ={
  SQS_ApproximateAgeOfOldestMessage
  SQS_ApproximateNumberOfMessagesNotVisible
}
test('SQS alarms are created', (t) => {
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      SQS: {
        AgeOfOldestMessage: {
          Statistic: 'Maximum',
          ActionsEnabled: true,
          Threshold: 200
        },
        InFlightMessagesPc: {
          Statistic: 'Maximum',
          Threshold: 90
        }
      }
    })
  const sqsAlarmProperties = AlarmProperties.SQS

  const { createSQSAlarms } = sqsAlarms(sqsAlarmProperties, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createSQSAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  // We have 2 queues (a regular one and a fifo one) in our test stack
  // we expect 2 alarms per queue
  t.equal(Object.keys(alarmResources).length, 4)

  function getAlarmsByType (): AlarmsByType {
    const alarmsByType = {}
    for (const alarmResource of Object.values(alarmResources)) {
      const al = alarmResource.Properties
      assertCommonAlarmProperties(t, al)
      const alarmType = alarmNameToType(al.AlarmName)
      alarmsByType[alarmType] = alarmsByType[alarmType] || new Set()
      alarmsByType[alarmType].add(al)
    }
    return alarmsByType as AlarmsByType
  }

  const alarmsByType = getAlarmsByType()
  t.same(Object.keys(alarmsByType).sort(), [
    'SQS_ApproximateAgeOfOldestMessage',
    'SQS_ApproximateNumberOfMessagesNotVisible'
  ])

  // we expect one alarm type per queue (and we have 2 queues)
  t.equal(alarmsByType.SQS_ApproximateAgeOfOldestMessage.size, 2)
  t.equal(alarmsByType.SQS_ApproximateNumberOfMessagesNotVisible.size, 2)
  const approximateAgeOfOldMessageAlarms = [...alarmsByType.SQS_ApproximateAgeOfOldestMessage]

  // regular queue
  t.equal(approximateAgeOfOldMessageAlarms[0].MetricName, 'ApproximateAgeOfOldestMessage')
  t.equal(approximateAgeOfOldMessageAlarms[0].Statistic, 'Maximum')
  t.equal(approximateAgeOfOldMessageAlarms[0].Threshold, sqsAlarmProperties.AgeOfOldestMessage.Threshold)
  t.equal(approximateAgeOfOldMessageAlarms[0].EvaluationPeriods, 2)
  t.equal(approximateAgeOfOldMessageAlarms[0].TreatMissingData, 'breaching')
  t.equal(approximateAgeOfOldMessageAlarms[0].ComparisonOperator, 'GreaterThanOrEqualToThreshold')
  t.equal(approximateAgeOfOldMessageAlarms[0].Namespace, 'AWS/SQS')
  t.equal(approximateAgeOfOldMessageAlarms[0].Period, 120)
  t.same(approximateAgeOfOldMessageAlarms[0].Dimensions, [
    {
      Name: 'QueueName',
      Value: '${regularQueue.QueueName}'
    }
  ])

  // fifo queue
  t.equal(approximateAgeOfOldMessageAlarms[1].MetricName, 'ApproximateAgeOfOldestMessage')
  t.equal(approximateAgeOfOldMessageAlarms[1].Statistic, 'Maximum')
  t.equal(approximateAgeOfOldMessageAlarms[1].Threshold, sqsAlarmProperties.AgeOfOldestMessage.Threshold)
  t.equal(approximateAgeOfOldMessageAlarms[1].EvaluationPeriods, 2)
  t.equal(approximateAgeOfOldMessageAlarms[1].TreatMissingData, 'breaching')
  t.equal(approximateAgeOfOldMessageAlarms[1].ComparisonOperator, 'GreaterThanOrEqualToThreshold')
  t.equal(approximateAgeOfOldMessageAlarms[1].Namespace, 'AWS/SQS')
  t.equal(approximateAgeOfOldMessageAlarms[1].Period, 120)
  t.same(approximateAgeOfOldMessageAlarms[1].Dimensions, [
    {
      Name: 'QueueName',
      Value: '${fifoQueue.QueueName}'
    }
  ])
  const approximateNumberOfMessagesNotVisibileAlarms = [...alarmsByType.SQS_ApproximateNumberOfMessagesNotVisible]

  // regular queue
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[0].MetricName, 'ApproximateNumberOfMessagesNotVisible')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[0].Statistic, 'Maximum')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[0].Threshold, 108000) //  (90% of the hard limit of 120000)
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[0].EvaluationPeriods, 2)
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[0].TreatMissingData, 'breaching')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[0].ComparisonOperator, 'GreaterThanOrEqualToThreshold')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[0].Namespace, 'AWS/SQS')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[0].Period, 120)
  t.same(approximateNumberOfMessagesNotVisibileAlarms[0].Dimensions, [
    {
      Name: 'QueueName',
      Value: '${regularQueue.QueueName}'
    }
  ])

  // fifo queue
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[1].MetricName, 'ApproximateNumberOfMessagesNotVisible')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[1].Statistic, 'Maximum')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[1].Threshold, 18000) // (90% of the hard limit of 20000)
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[1].EvaluationPeriods, 2)
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[1].TreatMissingData, 'breaching')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[1].ComparisonOperator, 'GreaterThanOrEqualToThreshold')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[1].Namespace, 'AWS/SQS')
  t.equal(approximateNumberOfMessagesNotVisibileAlarms[1].Period, 120)
  t.same(approximateNumberOfMessagesNotVisibileAlarms[1].Dimensions, [
    {
      Name: 'QueueName',
      Value: '${fifoQueue.QueueName}'
    }
  ])

  t.end()
})

test('SQS alarms are not created when disabled globally', (t) => {
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      SQS: {
        ActionsEnabled: false, // disabled globally
        AgeOfOldestMessage: {
          Statistic: 'Maximum',
          Threshold: 200
        },
        InFlightMessagesPc: {
          Statistic: 'Maximum',
          Threshold: 90
        }
      }
    })
  const sqsAlarmProperties = AlarmProperties.SQS

  const { createSQSAlarms } = sqsAlarms(sqsAlarmProperties, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createSQSAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})

test('SQS alarms are not created when disabled individually', (t) => {
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      SQS: {
        ActionsEnabled: true, // enabled globally
        AgeOfOldestMessage: {
          ActionsEnabled: false, // disabled locally
          Statistic: 'Maximum',
          Threshold: 200
        },
        InFlightMessagesPc: {
          ActionsEnabled: false, // disabled locally
          Statistic: 'Maximum',
          Threshold: 90
        }
      }
    })
  const sqsAlarmProperties = AlarmProperties.SQS

  const { createSQSAlarms } = sqsAlarms(sqsAlarmProperties, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createSQSAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})

test('SQS AgeOfOldestMessage alarms throws if misconfigured (enabled but no threshold set)', (t) => {
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      SQS: {
        AgeOfOldestMessage: {
          ActionsEnabled: true,
          Statistic: 'Maximum'
          // threshold not configured
        },
        InFlightMessagesPc: {
          ActionsEnabled: false, // disabled locally
          Statistic: 'Maximum',
          Threshold: 90
        }
      }
    })
  const sqsAlarmProperties = AlarmProperties.SQS

  const { createSQSAlarms } = sqsAlarms(sqsAlarmProperties, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  t.throws(() => createSQSAlarms(cfTemplate), { message: 'SQS AgeOfOldestMessage alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.' })
  t.end()
})
