'use strict'

import kinesisAlarms from '../kinesis'
import { test } from 'tap'
import defaultConfig from '../../utils/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} from '../../utils/tests/testing-utils'

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
    Kinesis_StreamIteratorAge: 'GetRecords.IteratorAgeMilliseconds',
    Kinesis_StreamReadThroughput: 'ReadProvisionedThroughputExceeded',
    Kinesis_StreamWriteThroughput: 'WriteProvisionedThroughputExceeded',
    Kinesis_StreamPutRecordSuccess: 'PutRecord.Success',
    Kinesis_StreamPutRecordsSuccess: 'PutRecords.Success',
    Kinesis_StreamGetRecordsSuccess: 'GetRecords.Success'
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
        Value: {
          Ref: 'stream'
        }
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
