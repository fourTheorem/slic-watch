const alarms = require('../alarms')
const { filterObject } = require('../util')

const { test } = require('tap')

const sls = {}
const config = {
  stackName: 'testStack',
  region: 'eu-west-1',
  alarmPeriod: 60,
  durationPercentTimeoutThreshold: 95,
  errorsThreshold: 0,
  throttlesPercentThreshold: 0,
}

function assertCommonAlarmProperties(t, al) {
  t.ok(al.AlarmDescription.length > 0)
  t.ok(al.ActionsEnabled)
  t.equal(al.AlarmActions.length, 1)
  t.ok(al.AlarmActions)
  t.equal(al.ComparisonOperator, 'GreaterThanThreshold')
}

test('AWS Lambda alarms are created', (t) => {
  const dash = alarms(sls, config)
  const cfTemplate = require('./resources/cloudformation-template-stack.json')
  dash.addAlarms(cfTemplate)

  const alarmResources = filterObject(
    cfTemplate.Resources,
    (res) => res.Type === 'AWS::CloudWatch::Alarm'
  )

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 9)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = al.AlarmName.split('_')[0]
    alarmsByType[alarmType] = alarmsByType[alarmType] || new Set()
    alarmsByType[alarmType].add(al)
  }

  t.same(Object.keys(alarmsByType).sort(), [
    'LambdaDuration',
    'LambdaErrors',
    'LambdaThrottles',
  ])

  for (const al of alarmsByType.LambdaErrors) {
    t.equal(al.MetricName, 'Errors')
    t.equal(al.Statistic, 'Sum')
    t.equal(al.Threshold, config.errorsThreshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, config.alarmPeriod)
    t.equal(al.Dimensions.length, 1)
    t.equal(al.Dimensions[0].Name, 'FunctionName')
  }

  for (const al of alarmsByType.LambdaDuration) {
    t.equal(al.MetricName, 'Duration')
    t.equal(al.Statistic, 'Maximum')
    t.ok(al.Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, config.alarmPeriod)
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
    t.equal(metricsById.throttles.MetricStat.Period, 60)
    t.equal(metricsById.throttles.MetricStat.Stat, 'Sum')
    t.equal(metricsById.invocations.MetricStat.Metric.Namespace, 'AWS/Lambda')
    t.equal(metricsById.invocations.MetricStat.Metric.MetricName, 'Invocations')
    t.equal(metricsById.invocations.MetricStat.Period, 60)
    t.equal(metricsById.invocations.MetricStat.Stat, 'Sum')
  }
  t.end()
})

test('Invocation alarms are created if configured', (t) => {
  const iConfig = {
    ...config,
    invocationsThreshold: 900,
  }
  const dash = alarms(sls, iConfig)
  const cfTemplate = require('./resources/cloudformation-template-stack.json')
  dash.addAlarms(cfTemplate)

  const alarmResources = filterObject(
    cfTemplate.Resources,
    (res) => res.Type === 'AWS::CloudWatch::Alarm'
  )
  t.equal(Object.keys(alarmResources).length, 12)
  const invocAlarmResources = filterObject(alarmResources, (res) =>
    res.Properties.AlarmName.startsWith('LambdaInvocations')
  )
  t.equal(Object.keys(invocAlarmResources).length, 3)
  for (const res of Object.values(invocAlarmResources)) {
    const al = res.Properties
    t.equal(al.MetricName, 'Invocations')
    t.equal(al.Statistic, 'Sum')
    t.equal(al.Threshold, iConfig.invocationsThreshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, config.alarmPeriod)
  }
  t.end()
})
