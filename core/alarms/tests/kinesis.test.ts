import { test } from 'tap'

import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import { type Template } from 'cloudform'

import createKinesisAlarms from '../kinesis'
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

test('Kinesis data stream alarms are created', (t) => {
  const testConfig = createTestConfig(
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
  const kinesisAlarmConfig = testConfig.Kinesis
  const compiledTemplate = createTestCloudFormationTemplate()
  const alarmResources: ResourceType = createKinesisAlarms(kinesisAlarmConfig, testAlarmActionsConfig, compiledTemplate)

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
    const al = alarmResource.Properties as AlarmProperties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypes[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, kinesisAlarmConfig[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'LessThanThreshold')
    t.equal(al?.Namespace, 'AWS/Kinesis')
    t.equal(al?.Period, 120)
    t.same(al?.Dimensions, [
      {
        Name: 'StreamName',
        Value: {
          name: 'Ref',
          payload: 'stream'
        }
      }
    ])
  }

  t.end()
})

test('Kinesis data stream alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
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
  const kinesisAlarmConfig = testConfig.Kinesis
  const compiledTemplate = createTestCloudFormationTemplate()
  createKinesisAlarms(kinesisAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})

test('Kinesis data stream resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template: Template = {
    Resources: {
      Stream: {
        Type: 'AWS::Kinesis::Stream',
        Properties: {
          Name: 'test-stream'
        },
        Metadata: {
          slicWatch: {
            alarms: {
              Period: 900,
              'GetRecords.IteratorAgeMilliseconds': {
                Threshold: 9999
              }
            }
          }
        }
      }
    }
  }

  const alarmResources: ResourceType = createKinesisAlarms(testConfig.Kinesis, testAlarmActionsConfig, template)

  const alarmResource = alarmResources.slicWatchKinesisStreamIteratorAgeAlarmStream
  t.same(alarmResource.Properties?.Threshold, 9999)
  t.same(alarmResource.Properties?.Period, 900)
  t.end()
})
