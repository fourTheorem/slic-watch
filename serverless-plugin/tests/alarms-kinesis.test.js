'use strict'

const kinesisAlarms = require('../alarms-kinesis')
const { test } = require('tap')
const defaultConfig = require('../default-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate
} = require('./testing-utils')

const context = {
  topicArn: 'dummy-arn',
  stackName: 'testStack',
  region: 'eu-west-1'
}

test('Kinesis data stream alarms are created', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Kinesis: {
        Period: 60,
        IteratorAgeMilliseconds: {
          Threshold: 3000
        }
      }
    }
  )

  const kinesisAlarmConfig = alarmConfig.Kinesis

  const { createKinesisAlarms } = kinesisAlarms(kinesisAlarmConfig, context)
  const cfTemplate = createTestCloudFormationTemplate()
  createKinesisAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 1)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    alarmsByType[alarmType] = alarmsByType[alarmType] || new Set()
    alarmsByType[alarmType].add(al)
  }

  t.same(Object.keys(alarmsByType).sort(), ['StreamIteratorAge'])

  t.equal(alarmsByType.StreamIteratorAge.size, 1)
  for (const al of alarmsByType.StreamIteratorAge) {
    t.equal(al.MetricName, 'GetRecords.IteratorAgeMilliseconds')
    t.equal(al.Statistic, 'Maximum')
    t.equal(al.Threshold, kinesisAlarmConfig['GetRecords.IteratorAgeMilliseconds'].Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Kinesis')
    t.equal(al.Period, kinesisAlarmConfig.Period)
    t.same(al.Dimensions, [
      {
        Name: 'StreamName',
        Value: 'awesome-savage-stream'
      }
    ])
  }

  t.end()
})

test('Kinesis data stream alarms are not created when disabled globally', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Kinesis: {
        enabled: false, // disabled globally
        Period: 60,
        IteratorAgeMilliseconds: {
          Threshold: 5000
        }
      }
    }
  )

  const kinesisAlarmConfig = alarmConfig.Kinesis

  const { createKinesisAlarms } = kinesisAlarms(kinesisAlarmConfig, context)

  const cfTemplate = createTestCloudFormationTemplate()
  createKinesisAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})
