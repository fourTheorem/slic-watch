'use strict'

import lambdaAlarms, { LambdaFunctionAlarmConfigs } from '../alarms-lambda'
import { test } from 'tap'
import { filterObject } from '../util'
import defaultConfig from '../default-config'

import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  albCfTemplate,
  testContext
} from './testing-utils'
import { applyAlarmConfig } from '../function-config'

test('AWS Lambda alarms are created', (t) => {
  const alarmConfig = createTestConfig(defaultConfig.alarms, {
    Lambda: {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
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

  const cfTemplate = createTestCloudFormationTemplate()
  const funcAlarmConfigs = {}
  for (const funcLogicalId of Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
    funcAlarmConfigs[funcLogicalId] = alarmConfig.Lambda
  }
  const { createLambdaAlarms } = lambdaAlarms(funcAlarmConfigs, testContext)
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 25)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    alarmsByType[alarmType] = alarmsByType[alarmType] || new Set()
    alarmsByType[alarmType].add(al)
  }

  t.same(Object.keys(alarmsByType).sort(), [
    'Lambda_Duration',
    'Lambda_Errors',
    'Lambda_IteratorAge',
    'Lambda_Throttles'
  ])
  // @ts-ignore
  for (const al of alarmsByType.Lambda_Errors) {
    t.equal(al.MetricName, 'Errors')
    t.equal(al.Statistic, 'Sum')
    // @ts-ignore
    t.equal(al.Threshold, alarmConfig.Lambda.Errors.Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, 120)
    t.equal(al.Dimensions.length, 1)
    t.equal(al.Dimensions[0].Name, 'FunctionName')
    t.ok(al.Dimensions[0].Value)
  }
  // @ts-ignore
  for (const al of alarmsByType.Lambda_Duration) {
    t.equal(al.MetricName, 'Duration')
    t.equal(al.Statistic, 'Maximum')
    t.ok(al.Threshold > 1000) // Ensure threshold is in milliseconds
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, 120)
  }
  // @ts-ignore
  for (const al of alarmsByType.Lambda_Throttles) {
    t.equal(al.Metrics.length, 3)
    const metricsById = {}
    for (const metric of al.Metrics) {
      metricsById[metric.Id] = metric
    }
    // @ts-ignore
    t.ok(metricsById.throttles_pc.Expression)
    // @ts-ignore
    t.equal(metricsById.throttles.MetricStat.Metric.Namespace, 'AWS/Lambda')
    // @ts-ignore
    t.equal(metricsById.throttles.MetricStat.Metric.MetricName, 'Throttles')
    // @ts-ignore
    t.equal(metricsById.throttles.MetricStat.Period, 120)
    // @ts-ignore
    t.equal(metricsById.throttles.MetricStat.Stat, 'Sum')
    // @ts-ignore
    t.equal(metricsById.invocations.MetricStat.Metric.Namespace, 'AWS/Lambda')
    // @ts-ignore
    t.equal(metricsById.invocations.MetricStat.Metric.MetricName, 'Invocations')
    // @ts-ignore
    t.equal(metricsById.invocations.MetricStat.Period, 120)
    // @ts-ignore
    t.equal(metricsById.invocations.MetricStat.Stat, 'Sum')
  }
  // @ts-ignore
  t.equal(alarmsByType.Lambda_IteratorAge.size, 1)
  // @ts-ignore
  for (const al of alarmsByType.Lambda_IteratorAge) {
    t.equal(al.MetricName, 'IteratorAge')
    t.equal(al.Statistic, 'Maximum')
    t.ok(al.Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, 120)
    t.equal(al.Dimensions[0].Name, 'FunctionName')
    t.ok(al.Dimensions[0].Value)
  }

  t.end()
})

test('AWS Lambda alarms are created for ALB', (t) => {
  const albAlarmConfig = createTestConfig(defaultConfig.alarms, {
    Lambda: {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
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
        Threshold: null
      }
    }
  })
  const albCf = createTestCloudFormationTemplate(albCfTemplate)
  const albFuncAlarmConfigs = {}
  for (const funcLogicalId of Object.keys(albCf.getResourcesByType('AWS::Lambda::Function'))) {
    albFuncAlarmConfigs[funcLogicalId] = albAlarmConfig.Lambda
  }
  const { createLambdaAlarms } = lambdaAlarms(albFuncAlarmConfigs, testContext)
  createLambdaAlarms(albCf)
  const albAlarmResources = albCf.getResourcesByType('AWS::CloudWatch::Alarm')

  const albAlarmsByType = {}
  t.equal(Object.keys(albAlarmResources).length, 3)
  for (const alarmResource of Object.values(albAlarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    albAlarmsByType[alarmType] = albAlarmsByType[alarmType] || new Set()
    albAlarmsByType[alarmType].add(al)
  }

  t.same(Object.keys(albAlarmsByType).sort(), [
    'Lambda_Duration',
    'Lambda_Errors',
    'Lambda_Throttles'
  ])
  // @ts-ignore
  for (const al of albAlarmsByType.Lambda_Errors) {
    t.equal(al.MetricName, 'Errors')
    t.equal(al.Statistic, 'Sum')
    //@ts-ignore
    t.equal(al.Threshold, albAlarmConfig.Lambda.Errors.Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, 120)
    t.equal(al.Dimensions.length, 1)
  }
  // @ts-ignore
  for (const al of albAlarmsByType.Lambda_Duration) {
    t.equal(al.MetricName, 'Duration')
    t.equal(al.Statistic, 'Maximum')
    t.ok(al.Threshold > 1000) // Ensure threshold is in milliseconds
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, 120)
  }
// @ts-ignore
  for (const al of albAlarmsByType.Lambda_Throttles) {
    t.equal(al.Metrics.length, 3)
    const metricsById = {}
    for (const metric of al.Metrics) {
      metricsById[metric.Id] = metric
    }
    // @ts-ignore
    t.ok(metricsById.throttles_pc.Expression)
    // @ts-ignore
    t.equal(metricsById.throttles.MetricStat.Metric.Namespace, 'AWS/Lambda')
    // @ts-ignore
    t.equal(metricsById.throttles.MetricStat.Metric.MetricName, 'Throttles')
    // @ts-ignore
    t.equal(metricsById.throttles.MetricStat.Period, 120)
    // @ts-ignore
    t.equal(metricsById.throttles.MetricStat.Stat, 'Sum')
    // @ts-ignore
    t.equal(metricsById.invocations.MetricStat.Metric.Namespace, 'AWS/Lambda')
    // @ts-ignore
    t.equal(metricsById.invocations.MetricStat.Metric.MetricName, 'Invocations')
    // @ts-ignore
    t.equal(metricsById.invocations.MetricStat.Period, 120)
    // @ts-ignore
    t.equal(metricsById.invocations.MetricStat.Stat, 'Sum')
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

  const cfTemplate = createTestCloudFormationTemplate()
  const funcAlarmConfigs = {}
  for (const funcLogicalId of Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
    funcAlarmConfigs[funcLogicalId] = alarmConfig.Lambda
  }
  const { createLambdaAlarms } = lambdaAlarms(funcAlarmConfigs, testContext)
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  const invocAlarmResources = filterObject(
    alarmResources,
    (res) => res.Properties.AlarmName['Fn::Sub'].startsWith('Lambda_Invocations')
  )
  t.equal(Object.keys(invocAlarmResources).length, 8)
  for (const res of Object.values(invocAlarmResources)) {
    // @ts-ignore
    const al = res.Properties
    t.equal(al.MetricName, 'Invocations')
    t.equal(al.Statistic, 'Sum')
    t.equal(al.Threshold, 900)
    t.equal(al.EvaluationPeriods, 1)
    t.equal(al.Namespace, 'AWS/Lambda')
    // @ts-ignore
    t.equal(al.Period, alarmConfig.Lambda.Period)
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

  const cfTemplate = createTestCloudFormationTemplate()
  const funcAlarmConfigs = {}
  for (const funcLogicalId of Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
    funcAlarmConfigs[funcLogicalId] = alarmConfig.Lambda
  }
  const { createLambdaAlarms } = lambdaAlarms(funcAlarmConfigs, testContext)
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

    const funcAlarmConfigs = {}
    for (const funcLogicalId of Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
      funcAlarmConfigs[funcLogicalId] = alarmConfig.Lambda
    }
    const { createLambdaAlarms } = lambdaAlarms(funcAlarmConfigs, testContext)
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

  const cfTemplate = createTestCloudFormationTemplate()
  const funcAlarmConfigs = {}
  for (const funcLogicalId of Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
    funcAlarmConfigs[funcLogicalId] = alarmConfig.Lambda
  }
  const { createLambdaAlarms } = lambdaAlarms(funcAlarmConfigs, testContext)
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

  const cfTemplate = createTestCloudFormationTemplate()
  const funcAlarmConfigs = {}
  for (const funcLogicalId of Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
    funcAlarmConfigs[funcLogicalId] = alarmConfig.Lambda
  }
  const { createLambdaAlarms } = lambdaAlarms(funcAlarmConfigs, testContext)
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})

test('AWS Lambda alarms are not created if disabled at function level', (t) => {
  const alarmConfig  = createTestConfig(defaultConfig.alarms, {
    Lambda: {
      Invocations: {
        enabled: true,
        Threshold: 1
      }
    }
  })
  const cfTemplate = createTestCloudFormationTemplate({
    Resources: {
      HelloLambdaFunction: {
        Type: 'AWS::Lambda::Function',
        Properties: {
          FunctionName: 'serverless-test-project-dev-simpletest'
        }
      },
      ESM: {
        Type: 'AWS::Lambda::EventSourceMapping',
        Properties: {
          FunctionName: { 'Fn::Ref': 'HelloLambdaFunction' }
        }
      }
    }
  })
  const disabledFuncAlarmConfigs = applyAlarmConfig(
    alarmConfig.Lambda, {
      HelloLambdaFunction: { Lambda: { enabled: false } }
    })
  const { createLambdaAlarms } = lambdaAlarms(disabledFuncAlarmConfigs, testContext)
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  t.equal(Object.keys(alarmResources).length, 0)
  t.end()
})

test('AWS Lambda alarms are not created if function configuration is not provided (e.g. Custom Resource injected functions)', (t) => {
  const cfTemplate = createTestCloudFormationTemplate({
    Resources: {
      HelloLambdaFunction: {
        Type: 'AWS::Lambda::Function',
        Properties: {
          FunctionName: 'serverless-test-project-dev-simpletest'
        }
      }
    }
  })
  const funcAlarmConfigs = {} // No function configuration as in the case where functions are not defined in serverless.yml:functions
  // @ts-ignore
  const { createLambdaAlarms } = lambdaAlarms(funcAlarmConfigs, testContext)
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  t.equal(Object.keys(alarmResources).length, 0)
  t.end()
})

test('Duration alarms are created if no timeout is specified', (t) => {
  const alarmConfig = createTestConfig(defaultConfig.alarms, {})

  const cfTemplate = createTestCloudFormationTemplate()
  const funcAlarmConfigs = {}
  for (const [funcLogicalId, resource] of Object.entries(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
    funcAlarmConfigs[funcLogicalId] = alarmConfig.Lambda
    // @ts-ignore
    delete resource.Properties.Timeout
  }
  // @ts-ignore
  const { createLambdaAlarms } = lambdaAlarms(funcAlarmConfigs, testContext)
  createLambdaAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  const invocAlarmResources = filterObject(
    alarmResources,
    (res) => res.Properties.AlarmName['Fn::Sub'].startsWith('Lambda_Duration')
  )
  t.equal(Object.keys(invocAlarmResources).length, 8)
  t.end()
})
