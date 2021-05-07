'use strict'

const apiGatewayAlarms = require('../alarms-api-gateway')
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

test('API Gateway alarms are created', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      ApiGateway: {
        Period: 60,
        '5XXError': {
          Threshold: 0.0
        },
        '4XXError': {
          Threshold: 0.05
        },
        Latency: {
          Threshold: 5000
        }
      }
    }
  )

  const apiGwAlarmConfig = alarmConfig.ApiGateway

  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwAlarmConfig, context)
  const cfTemplate = createTestCloudFormationTemplate()
  createApiGatewayAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 3)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    alarmsByType[alarmType] = alarmsByType[alarmType] || new Set()
    alarmsByType[alarmType].add(al)
  }

  t.same(Object.keys(alarmsByType).sort(), [
    'Api4XXError',
    'ApiAvailability',
    'ApiLatency'
  ])

  t.equal(alarmsByType.ApiAvailability.size, 1)
  for (const al of alarmsByType.ApiAvailability) {
    t.equal(al.MetricName, '5XXError')
    t.equal(al.Statistic, 'Average')
    t.equal(al.Threshold, apiGwAlarmConfig['5XXError'].Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/ApiGateway')
    t.equal(al.Period, apiGwAlarmConfig.Period)
    t.same(al.Dimensions, [
      {
        Name: 'ApiName',
        Value: 'dev-serverless-test-project'
      }
    ])
  }

  for (const al of alarmsByType.Api4XXError) {
    t.equal(al.MetricName, '4XXError')
    t.equal(al.Statistic, 'Average')
    t.equal(al.Threshold, apiGwAlarmConfig['4XXError'].Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/ApiGateway')
    t.equal(al.Period, apiGwAlarmConfig.Period)
    t.same(al.Dimensions, [
      {
        Name: 'ApiName',
        Value: 'dev-serverless-test-project'
      }
    ])
  }

  for (const al of alarmsByType.ApiLatency) {
    t.equal(al.MetricName, 'Latency')
    t.equal(al.ExtendedStatistic, 'p99')
    t.equal(al.Threshold, apiGwAlarmConfig.Latency.Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/ApiGateway')
    t.equal(al.Period, apiGwAlarmConfig.Period)
    t.same(al.Dimensions, [
      {
        Name: 'ApiName',
        Value: 'dev-serverless-test-project'
      }
    ])
  }

  t.end()
})

test('API Gateway alarms are not created when disabled globally', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      ApiGateway: {
        enabled: false, // disabled globally
        Period: 60,
        '5XXError': {
          Threshold: 0.0
        },
        '4XXError': {
          Threshold: 0.05
        },
        Latency: {
          Threshold: 5000
        }
      }
    }
  )

  const apiGwAlarmConfig = alarmConfig.ApiGateway

  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwAlarmConfig, context)

  const cfTemplate = createTestCloudFormationTemplate()
  createApiGatewayAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})

test('API Gateway alarms are not created when disabled individually', (t) => {
  const alarmConfig = createTestConfig(
    defaultConfig.alarms,
    {
      ApiGateway: {
        enabled: true, // enabled globally
        Period: 60,
        '5XXError': {
          enabled: false, // disabled locally
          Threshold: 0.0
        },
        '4XXError': {
          enabled: false, // disabled locally
          Threshold: 0.05
        },
        Latency: {
          enabled: false, // disabled locally
          Threshold: 5000
        }
      }
    }
  )

  const apiGwAlarmConfig = alarmConfig.ApiGateway

  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwAlarmConfig, context)

  const cfTemplate = createTestCloudFormationTemplate()
  createApiGatewayAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})
