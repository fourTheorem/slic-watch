import { test } from 'tap'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import createSQSAlarms from '../sqs'
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

export interface AlarmsByType {
  SQS_ApproximateAgeOfOldestMessage
  SQS_ApproximateNumberOfMessagesNotVisible
}

test('SQS alarms are created', (t) => {
  const testConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      SQS: {
        AgeOfOldestMessage: {
          Statistic: 'Maximum',
          enabled: true,
          Threshold: 200
        },
        InFlightMessagesPc: {
          Statistic: 'Maximum',
          Threshold: 90
        }
      }
    })
  const sqsAlarmConfig = testConfig.SQS
  const compiledTemplate = createTestCloudFormationTemplate()

  const alarmResources: ResourceType = createSQSAlarms(sqsAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  // We have 2 queues (a regular one and a fifo one) in our test stack
  // we expect 2 alarms per queue
  t.equal(Object.keys(alarmResources).length, 4)

  function getAlarmsByType (): AlarmsByType {
    const alarmsByType = {}
    for (const alarmResource of Object.values(alarmResources)) {
      const al = alarmResource.Properties as AlarmProperties
      assertCommonAlarmProperties(t, al)
      const alarmType = alarmNameToType(al?.AlarmName)
      alarmsByType[alarmType] = alarmsByType[alarmType] ?? new Set()
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
  t.equal(approximateAgeOfOldMessageAlarms[0].Threshold, sqsAlarmConfig.AgeOfOldestMessage.Threshold)
  t.equal(approximateAgeOfOldMessageAlarms[0].EvaluationPeriods, 2)
  t.equal(approximateAgeOfOldMessageAlarms[0].TreatMissingData, 'breaching')
  t.equal(approximateAgeOfOldMessageAlarms[0].ComparisonOperator, 'GreaterThanOrEqualToThreshold')
  t.equal(approximateAgeOfOldMessageAlarms[0].Namespace, 'AWS/SQS')
  t.equal(approximateAgeOfOldMessageAlarms[0].Period, 120)
  t.same(approximateAgeOfOldMessageAlarms[0].Dimensions, [
    {
      Name: 'QueueName',
      Value: {
        name: 'Fn::GetAtt',
        payload: [
          'regularQueue',
          'QueueName'
        ]
      }
    }
  ])

  // fifo queue
  t.equal(approximateAgeOfOldMessageAlarms[1].MetricName, 'ApproximateAgeOfOldestMessage')
  t.equal(approximateAgeOfOldMessageAlarms[1].Statistic, 'Maximum')
  t.equal(approximateAgeOfOldMessageAlarms[1].Threshold, sqsAlarmConfig.AgeOfOldestMessage.Threshold)
  t.equal(approximateAgeOfOldMessageAlarms[1].EvaluationPeriods, 2)
  t.equal(approximateAgeOfOldMessageAlarms[1].TreatMissingData, 'breaching')
  t.equal(approximateAgeOfOldMessageAlarms[1].ComparisonOperator, 'GreaterThanOrEqualToThreshold')
  t.equal(approximateAgeOfOldMessageAlarms[1].Namespace, 'AWS/SQS')
  t.equal(approximateAgeOfOldMessageAlarms[1].Period, 120)
  t.same(approximateAgeOfOldMessageAlarms[1].Dimensions, [
    {
      Name: 'QueueName',
      Value: {
        name: 'Fn::GetAtt',
        payload: [
          'fifoQueue',
          'QueueName'
        ]
      }
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
      Value: {
        name: 'Fn::GetAtt',
        payload: [
          'regularQueue',
          'QueueName'
        ]
      }
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
      Value: {
        name: 'Fn::GetAtt',
        payload: [
          'fifoQueue',
          'QueueName'
        ]
      }
    }
  ])

  t.end()
})

test('queue resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template = createTestCloudFormationTemplate();

  (template.Resources as ResourceType).regularQueue.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        AgeOfOldestMessage: {
          Statistic: 'P99',
          Threshold: 51,
          enabled: true // this one is disabled by default
        },
        InFlightMessagesPc: {
          Statistic: 'Average',
          Threshold: 52,
          Period: 60
        }
      }
    }
  }

  const alarmResources: ResourceType = createSQSAlarms(testConfig.SQS, testAlarmActionsConfig, template)
  t.same(Object.keys(alarmResources).length, 3) // Two for standard queue, two for the FIFO queue

  const ageOfOldestMessageAlarm = Object.entries(alarmResources).filter(([key, value]) => key.includes('regular') && value?.Properties?.MetricName === 'ApproximateAgeOfOldestMessage')[0][1]
  const inFlightMessagesFifoAlarm = Object.entries(alarmResources).filter(([key, value]) => key.includes('fifo') && value?.Properties?.MetricName === 'ApproximateNumberOfMessagesNotVisible')[0][1]
  const inFlightMessagesRegularAlarm = Object.entries(alarmResources).filter(([key, value]) => key.includes('regular') && value?.Properties?.MetricName === 'ApproximateNumberOfMessagesNotVisible')[0][1]
  t.equal(ageOfOldestMessageAlarm?.Properties?.Threshold, 51)
  t.equal(ageOfOldestMessageAlarm?.Properties?.Statistic, 'P99')
  t.equal(ageOfOldestMessageAlarm?.Properties?.Period, 900)
  t.equal(inFlightMessagesFifoAlarm?.Properties?.Period, 60)
  t.equal(inFlightMessagesFifoAlarm?.Properties?.Threshold, Math.floor(0.8 * 20000))
  t.equal(inFlightMessagesFifoAlarm?.Properties?.Statistic, 'Maximum')
  t.equal(inFlightMessagesRegularAlarm?.Properties?.Period, 60)
  t.equal(inFlightMessagesRegularAlarm?.Properties?.Threshold, Math.floor(0.52 * 120000))
  t.equal(inFlightMessagesRegularAlarm?.Properties?.Statistic, 'Average')

  t.end()
})

test('SQS alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
    defaultConfig.alarms,
    {
      SQS: {
        enabled: false, // disabled globally
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
  const sqsAlarmProperties = testConfig.SQS
  const compiledTemplate = createTestCloudFormationTemplate()
  createSQSAlarms(sqsAlarmProperties, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})

test('SQS alarms are not created when disabled individually', (t) => {
  const testConfig = createTestConfig(
    defaultConfig.alarms,
    {
      SQS: {
        enabled: true, // enabled globally
        AgeOfOldestMessage: {
          enabled: false, // disabled locally
          Statistic: 'Maximum',
          Threshold: 200
        },
        InFlightMessagesPc: {
          enabled: false, // disabled locally
          Statistic: 'Maximum',
          Threshold: 90
        }
      }
    })
  const sqsAlarmConfig = testConfig.SQS
  const compiledTemplate = createTestCloudFormationTemplate()
  createSQSAlarms(sqsAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})

test('SQS AgeOfOldestMessage alarms throws if misconfigured (enabled but no threshold set)', (t) => {
  const testConfig = createTestConfig(
    defaultConfig.alarms,
    {
      SQS: {
        AgeOfOldestMessage: {
          enabled: true,
          Statistic: 'Maximum'
          // threshold not configured
        },
        InFlightMessagesPc: {
          enabled: false, // disabled locally
          Statistic: 'Maximum',
          Threshold: 90
        }
      }
    })
  const sqsAlarmProperties = testConfig.SQS
  const compiledTemplate = createTestCloudFormationTemplate()
  t.throws(() => { createSQSAlarms(sqsAlarmProperties, testAlarmActionsConfig, compiledTemplate) }, { message: 'SQS AgeOfOldestMessage alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.' })
  t.end()
})
