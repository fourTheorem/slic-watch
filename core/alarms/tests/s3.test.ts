import { test } from 'tap'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type { Template } from 'cloudform'

import createS3Alarms from '../s3'
import { getResourcesByType } from '../../cf-template'
import type { ResourceType } from '../../cf-template'

import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  createTestConfig,
  createTestCloudFormationTemplate,
  testAlarmActionsConfig,
} from '../../tests/testing-utils'

test('S3 bucket alarms are created', (t) => {
  const testConfig = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      S3: {
        FirstByteLatency: { Threshold: 10000 },
        HeadRequests: { Threshold: 100 },
        '5xxErrors': { Threshold: 5 },
        '4xxErrors': { Threshold: 5 },
        TotalRequestLatency: { Threshold: 10000 },
        AllRequests: { Threshold: 2000 }
      }
    }
  )

  const s3AlarmConfig = testConfig.S3
  const compiledTemplate = createTestCloudFormationTemplate()
  const alarmResources: ResourceType = createS3Alarms(s3AlarmConfig, testAlarmActionsConfig, compiledTemplate)

  // Get all bucket logical IDs from the ALB CloudFormation template
  const bucketLogicalIds = Object.keys(compiledTemplate.Resources || {}).filter(
    key => compiledTemplate.Resources![key].Type === 'AWS::S3::Bucket'
  )
  
  t.equal(bucketLogicalIds.length, 2, 'Should have 2 buckets in the template')
  t.ok(bucketLogicalIds.includes('ServerlessDeploymentBucket'), 'Should have ServerlessDeploymentBucket')
  t.ok(bucketLogicalIds.includes('bucket'), 'Should have bucket')

  const expectedMetrics = [
    'FirstByteLatency',
    'HeadRequests',
    '5xxErrors',
    '4xxErrors',
    'TotalRequestLatency',
    'AllRequests'
  ]

  // Group alarms by metric
  const alarmsByMetric: Record<string, any[]> = {}
  for (const metric of expectedMetrics) {
    alarmsByMetric[metric] = Object.values(alarmResources).filter(
      r => (r.Properties as AlarmProperties).MetricName === metric
    )
  }

  // Should have 2 alarms per metric (one for each bucket)
  for (const metric of expectedMetrics) {
    t.equal(alarmsByMetric[metric].length, 2, `Should have 2 alarms for ${metric} (one per bucket)`)
  }

  // Check each alarm
  for (const metric of expectedMetrics) {
    for (const alarm of alarmsByMetric[metric]) {
      const al = alarm.Properties as AlarmProperties
      assertCommonAlarmProperties(t, al)
      t.equal(al.MetricName, metric)
      t.equal(al.Namespace, 'AWS/S3')
      t.equal(al.Threshold, s3AlarmConfig[metric].Threshold)
      t.equal(al.EvaluationPeriods, 2)
      t.equal(al.TreatMissingData, 'breaching')
      t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
      t.equal(al.Period, 120)

      // Check dimensions - should have both BucketName and FilterId
      t.equal(al.Dimensions?.[0].Name, 'BucketName')
      t.equal(al.Dimensions?.[0].Value?.name, 'Ref')
      t.ok(typeof al.Dimensions?.[0].Value?.payload === 'string', 'BucketName payload should be a string')
      t.equal(al.Dimensions?.[1].Name, 'FilterId')
      t.equal(al.Dimensions?.[1].Value, 'EntireBucket')

      // Get the bucket logical ID from the alarm dimensions
      const bucketNameDimension = al.Dimensions?.[0]
      const filterIdDimension = al.Dimensions?.[1]
      
      // Check BucketName dimension
      t.equal(bucketNameDimension?.Name, 'BucketName')
      const bucketId = bucketNameDimension?.Value?.payload
      
      // Validate that it's one of the expected bucket IDs
      t.ok(bucketId, 'Should have a bucket ID')
      t.ok(['ServerlessDeploymentBucket', 'bucket'].includes(bucketId), 
           `Bucket ID should be either ServerlessDeploymentBucket or bucket, got ${bucketId}`)
      
      // Check FilterId dimension
      t.equal(filterIdDimension?.Name, 'FilterId')
      t.equal(filterIdDimension?.Value, 'EntireBucket')
    }
  }

  t.end()
})
test('S3 bucket alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
    defaultConfig.alarms,
    {
      S3: {
        enabled: false,
        Period: 60,
        FirstByteLatency: { Threshold: 5000 }
      }
    }
  )

  const compiledTemplate = createTestCloudFormationTemplate()
  createS3Alarms(testConfig.S3, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
  t.same({}, alarmResources)
  t.end()
})

test('S3 bucket resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template: Template = {
    Resources: {
      bucket: {
        Type: 'AWS::S3::Bucket',
        Metadata: {
          slicWatch: {
            alarms: {
              Period: 900,
              FirstByteLatency: { Threshold: 9999 },
              HeadRequests: { Threshold: 8888 }
            }
          }
        }
      }
    }
  }

  const alarmResources: ResourceType = createS3Alarms(testConfig.S3, testAlarmActionsConfig, template)

  const firstByteAlarm = alarmResources.slicWatchS3FirstByteLatencyAlarmBucket
  const headRequestsAlarm = alarmResources.slicWatchS3HeadRequestsAlarmBucket

  t.equal(firstByteAlarm.Properties?.Threshold, 9999)
  t.equal(firstByteAlarm.Properties?.Period, 900)

  t.equal(headRequestsAlarm.Properties?.Threshold, 8888)
  t.equal(headRequestsAlarm.Properties?.Period, 900)

  t.end()
})
