'use strict'

const alarms = require('../alarms')
const CloudFormationTemplate = require('../cf-template')

const { test } = require('tap')
const _ = require('lodash')

const { filterObject } = require('../util')
const defaultConfig = require('../default-config')

const sls = {
  cli: {
    log: () => {},
  },
}

const config = _.merge(defaultConfig, {
  stackName: 'testStack',
  region: 'eu-west-1',
  alarms: {
    Period: 60,
    Lambda: {
      Errors: {
        Threshold: 0,
      },
      ThrottlesPc: {
        Threshold: 0,
      },
      DurationPc: {
        Threshold: 95,
      },
      Invocations: {
        Threshold: null, // Disabled
      },
      IteratorAge: {
        Threshold: 10000,
      },
    },
    APIGateway: {
      '5XXErrors': {
        Threshold: 0.0,
      },
      '4XXErrors': {
        Threshold: 0.05,
      },
      Latency: {
        Threshold: 5000,
      },
    },
  },
})

function assertCommonAlarmProperties(t, al) {
  t.ok(al.AlarmDescription.length > 0)
  t.ok(al.ActionsEnabled)
  t.equal(al.AlarmActions.length, 1)
  t.ok(al.AlarmActions)
  t.equal(al.ComparisonOperator, 'GreaterThanThreshold')
}

function alarmNameToType(alarmName) {
  return alarmName.split('_')[0]
}

test('AWS Lambda alarms are created', (t) => {
  const alarmsInstance = alarms(sls, config)
  const cfTemplate = CloudFormationTemplate(
    require('./resources/cloudformation-template-stack.json'),
    sls
  )
  alarmsInstance.addAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 13)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    alarmsByType[alarmType] = alarmsByType[alarmType] || new Set()
    alarmsByType[alarmType].add(al)
  }

  t.same(Object.keys(alarmsByType).sort(), [
    'LambdaDuration',
    'LambdaErrors',
    'LambdaIteratorAge',
    'LambdaThrottles',
    'ApiAvailabilty',
    'Api4xxErrors',
    'ApiLatency',
  ])

  for (const al of alarmsByType.LambdaErrors) {
    t.equal(al.MetricName, 'Errors')
    t.equal(al.Statistic, 'Sum')
    t.equal(al.Threshold, config.alarms.Lambda.Errors.Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, config.alarms.Period)
    t.equal(al.Dimensions.length, 1)
    t.equal(al.Dimensions[0].Name, 'FunctionName')
  }

  for (const al of alarmsByType.LambdaDuration) {
    t.equal(al.MetricName, 'Duration')
    t.equal(al.Statistic, 'Maximum')
    t.ok(al.Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, config.alarms.Period)
  }

  for (const al of alarmsByType.LambdaThrottles) {
    t.equal(al.Metrics.length, 3)
    const metricsById = {}
    for (const metric of al.Metrics) {
      metricsById[metric.Id] = metric
    }

    t.ok(metricsById.throttles_pc.Expression)
    t.equal(metricsById.throttles.MetricStat.Metric.Namespace, 'AWS/Lambda')
    t.equal(metricsById.throttles.MetricStat.Metric.MetricName, 'Throttles')
    t.equal(metricsById.throttles.MetricStat.Period, config.alarms.Period)
    t.equal(metricsById.throttles.MetricStat.Stat, 'Sum')
    t.equal(metricsById.invocations.MetricStat.Metric.Namespace, 'AWS/Lambda')
    t.equal(metricsById.invocations.MetricStat.Metric.MetricName, 'Invocations')
    t.equal(metricsById.invocations.MetricStat.Period, config.alarms.Period)
    t.equal(metricsById.invocations.MetricStat.Stat, 'Sum')
  }

  t.equal(alarmsByType.LambdaIteratorAge.size, 1)
  for (const al of alarmsByType.LambdaIteratorAge) {
    t.equal(al.MetricName, 'IteratorAge')
    t.equal(al.Statistic, 'Maximum')
    t.ok(al.Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, config.alarms.Period)
    t.same(al.Dimensions, [
      {
        Name: 'FunctionName',
        Value: 'serverless-test-project-dev-streamProcessor',
      },
    ])
  }

  t.equal(alarmsByType.ApiAvailability.size, 1)
  for (const al of alarmsByType.ApiAvailability) {
    t.equal(al.MetricName, '5XXErrors')
    t.equal(al.Statistic, 'Average')
    t.equal(al.Threshold, config.alarms.ApiGateway['5XXErrors'].Threshold)
    t.equal(al.EvaluationPeriods, 3)
    t.equal(al.Namespace, 'AWS/ApiGateway')
    t.equal(al.Period, config.alarms.Period)
    t.same(al.Dimensions, [
      {
        Name: 'ApiName',
        Value: 'serverless-test-project-dev-get',
      },
    ])
  }

  for (const al of alarmsByType.Api4xxErrors) {
    t.equal(al.MetricName, 'Latency')
    t.equal(al.Statistic, '4XXErrors')
    t.equal(al.ExtendedStatistic, 'p99')
    t.equal(al.Threshold, config.alarms.ApiGateway['4XXErrors'].Threshold)
    t.equal(al.EvaluationPeriods, 3)
    t.equal(al.Namespace, 'AWS/ApiGateway')
    t.equal(al.Period, config.alarms.Period)
    t.same(al.Dimensions, [
      {
        Name: 'ApiName',
        Value: 'serverless-test-project-dev-get',
      },
    ])
  }

  for (const al of alarmsByType.ApiLatency) {
    t.equal(al.MetricName, 'Latency')
    t.equal(al.ExtendedStatistic, 'p99')
    t.equal(al.Threshold, config.alarms.ApiGateway.Latency.Threshold)
    t.equal(al.EvaluationPeriods, 5)
    t.equal(al.Namespace, 'AWS/ApiGateway')
    t.equal(al.Period, config.alarms.Period)
    t.same(al.Dimensions, [
      {
        Name: 'ApiName',
        Value: 'serverless-test-project-dev-get',
      },
    ])
  }

  t.end()
})

test('Invocation alarms are created if configured', (t) => {
  const iConfig = {
    ...config,
    invocationsThreshold: 900,
  }
  const a = alarms(sls, iConfig)
  const cfTemplate = CloudFormationTemplate(
    require('./resources/cloudformation-template-stack.json'),
    sls
  )
  a.addAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  const invocAlarmResources = filterObject(
    alarmResources,
    (res) =>
      typeof res.Properties.AlarmName === 'string' &&
      res.Properties.AlarmName.startsWith('LambdaInvocations')
  )
  t.equal(Object.keys(invocAlarmResources).length, 4)
  for (const res of Object.values(invocAlarmResources)) {
    const al = res.Properties
    t.equal(al.MetricName, 'Invocations')
    t.equal(al.Statistic, 'Sum')
    t.equal(al.Threshold, iConfig.invocationsThreshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, config.alarms.Period)
  }
  t.end()
})
;[
  {
    functionName: { 'Fn::GetAtt': ['nonExistent', 'Arn'] },
    reason: 'unresolved resource in GetAtt',
  },
  {
    functionName: {},
    reason: 'unexpected reference format',
  },
].forEach(({ functionName, reason }) =>
  test(`IteratorAge alarm is not created if function reference cannot be found due to ${reason}`, (t) => {
    const cfTemplate = CloudFormationTemplate(
      {
        Resources: {
          esm: {
            Type: 'AWS::Lambda::EventSourceMapping',
            Properties: {
              FunctionName: functionName,
            },
          },
        },
      },
      sls
    )
    const a = alarms(sls, config)
    a.addAlarms(cfTemplate)
    const alarmResources = cfTemplate.getResourcesByType(
      'AWS::CloudWatch::Alarm'
    )
    t.equal(Object.keys(alarmResources).length, 0)
    t.end()
  })
)
