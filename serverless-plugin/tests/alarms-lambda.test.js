'use strict'

const lambdaAlarms = require('../alarms-lambda')
const CloudFormationTemplate = require('../cf-template')

const { test } = require('tap')
const _ = require('lodash')

const { filterObject } = require('../util')
const defaultConfig = require('../default-config')
const { cascade } = require('../cascading-config')

const sls = {
  cli: {
    log: () => {},
  },
}

const context = {
  topicArn: 'dummy-arn',
  stackName: 'testStack',
  region: 'eu-west-1',
}

const alarmConfig = cascade(
  _.merge(defaultConfig.alarms, {
    Lambda: {
      Period: 60,
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
      Period: 60,
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
  })
)

const lambdaAlarmConfig = alarmConfig.Lambda

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
  const { createLambdaAlarms } = lambdaAlarms(lambdaAlarmConfig, context)
  const cfTemplate = CloudFormationTemplate(
    require('./resources/cloudformation-template-stack.json'),
    sls
  )
  createLambdaAlarms(cfTemplate)

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
  ])

  for (const al of alarmsByType.LambdaErrors) {
    t.equal(al.MetricName, 'Errors')
    t.equal(al.Statistic, 'Sum')
    t.equal(al.Threshold, lambdaAlarmConfig.Errors.Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, lambdaAlarmConfig.Period)
    t.equal(al.Dimensions.length, 1)
    t.equal(al.Dimensions[0].Name, 'FunctionName')
  }

  for (const al of alarmsByType.LambdaDuration) {
    t.equal(al.MetricName, 'Duration')
    t.equal(al.Statistic, 'Maximum')
    t.ok(al.Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, lambdaAlarmConfig.Period)
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
    t.equal(metricsById.throttles.MetricStat.Period, lambdaAlarmConfig.Period)
    t.equal(metricsById.throttles.MetricStat.Stat, 'Sum')
    t.equal(metricsById.invocations.MetricStat.Metric.Namespace, 'AWS/Lambda')
    t.equal(metricsById.invocations.MetricStat.Metric.MetricName, 'Invocations')
    t.equal(metricsById.invocations.MetricStat.Period, lambdaAlarmConfig.Period)
    t.equal(metricsById.invocations.MetricStat.Stat, 'Sum')
  }

  t.equal(alarmsByType.LambdaIteratorAge.size, 1)
  for (const al of alarmsByType.LambdaIteratorAge) {
    t.equal(al.MetricName, 'IteratorAge')
    t.equal(al.Statistic, 'Maximum')
    t.ok(al.Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, lambdaAlarmConfig.Period)
    t.same(al.Dimensions, [
      {
        Name: 'FunctionName',
        Value: 'serverless-test-project-dev-streamProcessor',
      },
    ])
  }

  t.end()
})

test('Invocation alarms are created if configured', (t) => {
  const iConfig = { ...lambdaAlarmConfig }
  iConfig.Invocations.Threshold = 900
  const { createLambdaAlarms } = lambdaAlarms(iConfig, context)
  const cfTemplate = CloudFormationTemplate(
    require('./resources/cloudformation-template-stack.json'),
    sls
  )
  createLambdaAlarms(cfTemplate)

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
    t.equal(al.Threshold, 900)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, lambdaAlarmConfig.Period)
  }
  t.end()
})
/**
 * Create tests that ensure no IteratorAge alarms are created if the FunctionName is unresolved
 */
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
    const { createLambdaAlarms } = lambdaAlarms(lambdaAlarmConfig, context)
    createLambdaAlarms(cfTemplate)
    const alarmResources = cfTemplate.getResourcesByType(
      'AWS::CloudWatch::Alarm'
    )
    t.equal(Object.keys(alarmResources).length, 0)
    t.end()
  })
)
