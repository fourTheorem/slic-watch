'use strict'

const kinesisAlarms = require('../../core/alarms-kinesis')
const { test } = require('tap')
const defaultConfig = require('../../core/default-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} = require('./testing-utils')

test('Kinesis data stream alarms are created', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'LessThanThreshold',
      Kinesis: {
        IteratorAgeMilliseconds: {
          Threshold: 3000
        }
      }
    }
  )

  const kinesisAlarmConfig = alarmConfig.Kinesis

  const { createKinesisAlarms } = kinesisAlarms(kinesisAlarmConfig, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createKinesisAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const expectedTypes = {
    StreamIteratorAge: 'GetRecords.IteratorAgeMilliseconds',
    StreamReadThroughput: 'ReadProvisionedThroughputExceeded',
    StreamWriteThroughput: 'WriteProvisionedThroughputExceeded',
    StreamPutRecordSuccess: 'PutRecord.Success',
    StreamPutRecordsSuccess: 'PutRecords.Success',
    StreamGetRecordsSuccess: 'GetRecords.Success'
  }

  t.equal(Object.keys(alarmResources).length, Object.keys(expectedTypes).length)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, kinesisAlarmConfig[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'LessThanThreshold')
    t.equal(al.Namespace, 'AWS/Kinesis')
    t.equal(al.Period, 120)
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

  const { createKinesisAlarms } = kinesisAlarms(kinesisAlarmConfig, testContext)

  const cfTemplate = createTestCloudFormationTemplate()
  createKinesisAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})
