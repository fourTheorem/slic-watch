'use strict'

const lambdaAlarms = require('../alarms-lambda')
const { test } = require('tap')
const { filterObject } = require('../util')
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

test('AWS Lambda alarms are created', (t) => {
  const alarmConfig = createTestConfig(defaultConfig.alarms, {
    Lambda: {
      Period: 60,
      Errors: {
        Threshold: 0
      },
      ThrottlesPc: {
        Threshold: 0
      },
      DurationPc: {
        Threshold: 95
      },
      Invocations: {
        Threshold: null // Disabled
      },
      IteratorAge: {
        Threshold: 10000
      }
    }
  })

  const lambdaAlarmConfig = alarmConfig.Lambda
  const { createLambdaAlarms } = lambdaAlarms(lambdaAlarmConfig, context)
  const cfTemplate = createTestCloudFormationTemplate()
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 16)
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
    'LambdaThrottles'
  ])

  for (const al of alarmsByType.LambdaErrors) {
    t.equal(al.MetricName, 'Errors')
    t.equal(al.Statistic, 'Sum')
    t.equal(al.Threshold, lambdaAlarmConfig.Errors.Threshold)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, lambdaAlarmConfig.Period)
    t.equal(al.ComparisonOperator, 'GreaterThanThreshold')
    t.equal(al.Dimensions.length, 1)
    t.equal(al.Dimensions[0].Name, 'FunctionName')
    t.ok(al.Dimensions[0].Value.startsWith('serverless-test-project-dev-'))
  }

  for (const al of alarmsByType.LambdaDuration) {
    t.equal(al.MetricName, 'Duration')
    t.equal(al.Statistic, 'Maximum')
    t.ok(al.Threshold > 1000) // Ensure threshold is in milliseconds
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
        Value: 'serverless-test-project-dev-streamProcessor'
      }
    ])
  }

  t.end()
})

test('Invocation alarms are created if configured', (t) => {
  const alarmConfig = createTestConfig(defaultConfig.alarms, {
    Lambda: {
      Period: 60,
      Errors: {
        Threshold: 0
      },
      ThrottlesPc: {
        Threshold: 0
      },
      DurationPc: {
        Threshold: 95
      },
      Invocations: {
        enabled: true,
        Threshold: 900 // Enabled
      },
      IteratorAge: {
        Threshold: 10000
      }
    }
  })
  const lambdaAlarmConfig = alarmConfig.Lambda

  const { createLambdaAlarms } = lambdaAlarms(lambdaAlarmConfig, context)
  const cfTemplate = createTestCloudFormationTemplate()
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  const invocAlarmResources = filterObject(
    alarmResources,
    (res) =>
      typeof res.Properties.AlarmName === 'string' &&
      res.Properties.AlarmName.startsWith('LambdaInvocations')
  )
  t.equal(Object.keys(invocAlarmResources).length, 5)
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

test('Invocation alarms throws if misconfigured (enabled but no threshold set)', (t) => {
  const alarmConfig = createTestConfig(defaultConfig.alarms, {
    Lambda: {
      Period: 60,
      Errors: {
        Threshold: 0
      },
      ThrottlesPc: {
        Threshold: 0
      },
      DurationPc: {
        Threshold: 95
      },
      Invocations: {
        enabled: true, // Enabled
        Threshold: null // but, oh no,  NO THRESHOLD!
      },
      IteratorAge: {
        Threshold: 10000
      }
    }
  })
  const lambdaAlarmConfig = alarmConfig.Lambda

  const { createLambdaAlarms } = lambdaAlarms(lambdaAlarmConfig, context)
  const cfTemplate = createTestCloudFormationTemplate()
  t.throws(() => createLambdaAlarms(cfTemplate), { message: 'Lambda invocation alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.' })
  t.end()
})

/**
 * Create tests that ensure no IteratorAge alarms are created if the FunctionName is unresolved
 */
;[
  {
    functionName: { 'Fn::GetAtt': ['nonExistent', 'Arn'] },
    reason: 'unresolved resource in GetAtt'
  },
  {
    functionName: {},
    reason: 'unexpected reference format'
  }
].forEach(({ functionName, reason }) =>
  test(`IteratorAge alarm is not created if function reference cannot be found due to ${reason}`, (t) => {
    const alarmConfig = createTestConfig(defaultConfig.alarms, {
      Lambda: {
        Period: 60,
        Errors: {
          Threshold: 0
        },
        ThrottlesPc: {
          Threshold: 0
        },
        DurationPc: {
          Threshold: 95
        },
        Invocations: {
          Threshold: null // Disabled
        },
        IteratorAge: {
          Threshold: 10000
        }
      }
    })

    const lambdaAlarmConfig = alarmConfig.Lambda

    const cfTemplate = createTestCloudFormationTemplate(
      {
        Resources: {
          esm: {
            Type: 'AWS::Lambda::EventSourceMapping',
            Properties: {
              FunctionName: functionName
            }
          }
        }
      }
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

test('Lambda alarms are not created when disabled globally', (t) => {
  const alarmConfig = createTestConfig(defaultConfig.alarms, {
    Lambda: {
      enabled: false, // disabled globally
      Period: 60,
      Errors: {
        Threshold: 0
      },
      ThrottlesPc: {
        Threshold: 0
      },
      DurationPc: {
        Threshold: 95
      },
      Invocations: {
        Threshold: 900
      },
      IteratorAge: {
        Threshold: 10000
      }
    }
  })

  const lambdaAlarmConfig = alarmConfig.Lambda
  const { createLambdaAlarms } = lambdaAlarms(lambdaAlarmConfig, context)
  const cfTemplate = createTestCloudFormationTemplate()
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})

test('Lambda alarms are not created when disabled individually', (t) => {
  const alarmConfig = createTestConfig(defaultConfig.alarms, {
    Lambda: {
      enabled: true, // enabled globally
      Period: 60,
      Errors: {
        enabled: false, // disabled locally
        Threshold: 0
      },
      ThrottlesPc: {
        enabled: false, // disabled locally
        Threshold: 0
      },
      DurationPc: {
        enabled: false, // disabled locally
        Threshold: 95
      },
      Invocations: {
        enabled: false, // disabled locally
        Threshold: 900
      },
      IteratorAge: {
        enabled: false, // disabled locally
        Threshold: 10000
      }
    }
  })

  const lambdaAlarmConfig = alarmConfig.Lambda
  const { createLambdaAlarms } = lambdaAlarms(lambdaAlarmConfig, context)
  const cfTemplate = createTestCloudFormationTemplate()
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})
