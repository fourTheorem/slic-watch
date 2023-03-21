'use strict'

import createKinesisAlarms from '../kinesis'
import { getResourcesByType } from '../../cf-template'
import type { ResourceType } from '../../cf-template'
import { test } from 'tap'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} from '../../tests/testing-utils'

test('Kinesis data stream alarms are created', (t) => {
  const AlarmProperties = createTestConfig(
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
  const kinesisAlarmProperties = AlarmProperties.Kinesis
  const compiledTemplate = createTestCloudFormationTemplate()
  const alarmResources: ResourceType = createKinesisAlarms(kinesisAlarmProperties, testContext, compiledTemplate)

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
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, kinesisAlarmProperties[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'LessThanThreshold')
    t.equal(al?.Namespace, 'AWS/Kinesis')
    t.equal(al?.Period, 120)
    t.same(al?.Dimensions, [
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
  const AlarmProperties = createTestConfig(
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
  const kinesisAlarmProperties = AlarmProperties.Kinesis
  const compiledTemplate = createTestCloudFormationTemplate()
  createKinesisAlarms(kinesisAlarmProperties, testContext, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})
