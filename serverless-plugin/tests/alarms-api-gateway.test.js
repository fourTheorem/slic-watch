'use strict'

const apiGatewayAlarms = require('../alarms-api-gateway')
const CloudFormationTemplate = require('../cf-template')

const { test } = require('tap')
const _ = require('lodash')

const defaultConfig = require('../default-config')
const { cascade } = require('../cascading-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType
} = require('./testing-utils')

const sls = {
  cli: {
    log: () => {}
  }
}

const context = {
  topicArn: 'dummy-arn',
  stackName: 'testStack',
  region: 'eu-west-1'
}

const alarmConfig = cascade(
  _.merge(defaultConfig.alarms, {
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
  })
)

const apiGwAlarmConfig = alarmConfig.ApiGateway

test('AWS Lambda alarms are created', (t) => {
  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwAlarmConfig, context)
  const cfTemplate = CloudFormationTemplate(
    require('./resources/cloudformation-template-stack.json'),
    sls
  )
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
