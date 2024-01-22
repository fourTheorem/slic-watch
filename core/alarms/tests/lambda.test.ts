import { test } from 'tap'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import createLambdaAlarms from '../lambda'
import { getResourcesByType } from '../../cf-template'
import { type ResourceType } from '../../cf-template'
import { filterObject } from '../../filter-object'
import defaultConfig from '../../inputs/default-config'

import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  albCfTemplate,
  testAlarmActionsConfig
} from '../../tests/testing-utils'

export interface AlarmsByType {
  Lambda_Duration?
  Lambda_Errors?
  Lambda_IteratorAge?
  Lambda_Throttles?
}

export interface MetricsById {
  throttles_pc?
  throttles?
  invocations?
}

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

  const compiledTemplate = createTestCloudFormationTemplate()
  const alarmResources: ResourceType = createLambdaAlarms(alarmConfig.Lambda, testAlarmActionsConfig, compiledTemplate)

  function getAlarmsByType (): AlarmsByType {
    const alarmsByType = {}
    for (const alarmResource of Object.values(alarmResources)) {
      const al = alarmResource.Properties as AlarmProperties
      assertCommonAlarmProperties(t, al)
      const alarmType = alarmNameToType(al?.AlarmName)
      alarmsByType[alarmType] = alarmsByType[alarmType] ?? new Set()
      alarmsByType[alarmType].add(al)
    }
    return alarmsByType
  }

  const alarmsByType = getAlarmsByType()
  t.equal(Object.keys(alarmResources).length, 25)

  t.same(Object.keys(alarmsByType).sort(), [
    'Lambda_Duration',
    'Lambda_Errors',
    'Lambda_IteratorAge',
    'Lambda_Throttles'
  ])
  for (const al of alarmsByType.Lambda_Errors) {
    t.equal(al.MetricName, 'Errors')
    t.equal(al.Statistic, 'Sum')
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
  function getMetricsById (): MetricsById {
    const metricsById = {}
    for (const al of alarmsByType.Lambda_Throttles) {
      t.equal(al.Metrics.length, 3)
      for (const metric of al.Metrics) {
        metricsById[metric.Id] = metric
      }
    }
    return metricsById as MetricsById
  }
  const metricsById = getMetricsById()
  t.ok(metricsById.throttles_pc.Expression)
  t.equal(metricsById.throttles.MetricStat.Metric.Namespace, 'AWS/Lambda')
  t.equal(metricsById.throttles.MetricStat.Metric.MetricName, 'Throttles')
  t.equal(metricsById.throttles.MetricStat.Period, 120)
  t.equal(metricsById.throttles.MetricStat.Stat, 'Sum')
  t.equal(metricsById.invocations.MetricStat.Metric.Namespace, 'AWS/Lambda')
  t.equal(metricsById.invocations.MetricStat.Metric.MetricName, 'Invocations')
  t.equal(metricsById.invocations.MetricStat.Period, 120)
  t.equal(metricsById.invocations.MetricStat.Stat, 'Sum')
  t.equal(alarmsByType.Lambda_IteratorAge.size, 1)
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
        Threshold: null
      }
    }
  })

  const compiledTemplate = createTestCloudFormationTemplate(albCfTemplate)
  const albAlarmResources: ResourceType = createLambdaAlarms(alarmConfig.Lambda, testAlarmActionsConfig, compiledTemplate)

  function getAlarmsByType (): AlarmsByType {
    const albAlarmsByType: AlarmsByType = {}
    for (const alarmResource of Object.values(albAlarmResources)) {
      const al = alarmResource.Properties as AlarmProperties
      assertCommonAlarmProperties(t, al)
      const alarmType: any = alarmNameToType(al?.AlarmName)
      albAlarmsByType[alarmType] = albAlarmsByType[alarmType] ?? new Set()
      albAlarmsByType[alarmType].add(al)
    }
    return albAlarmsByType
  }
  const albAlarmsByType = getAlarmsByType()
  t.equal(Object.keys(albAlarmResources).length, 3)
  t.same(Object.keys(albAlarmsByType).sort(), [
    'Lambda_Duration',
    'Lambda_Errors',
    'Lambda_Throttles'
  ])
  for (const al of albAlarmsByType.Lambda_Errors) {
    t.equal(al.MetricName, 'Errors')
    t.equal(al.Statistic, 'Sum')
    t.equal(al.Threshold, alarmConfig.Lambda.Errors.Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/Lambda')
    t.equal(al.Period, 120)
    t.equal(al.Dimensions.length, 1)
  }
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

  function getMetricsById () {
    const metricsById = {}
    // eslint-disable-next-line no-unreachable-loop
    for (const al of albAlarmsByType.Lambda_Throttles) {
      t.equal(al.Metrics.length, 3)
      for (const metric of al.Metrics) {
        metricsById[metric.Id] = metric
      }
      return metricsById as MetricsById
    }
  }
  const metricsById = getMetricsById()
  t.ok(metricsById?.throttles_pc.Expression)
  t.equal(metricsById?.throttles.MetricStat.Metric.Namespace, 'AWS/Lambda')
  t.equal(metricsById?.throttles.MetricStat.Metric.MetricName, 'Throttles')
  t.equal(metricsById?.throttles.MetricStat.Period, 120)
  t.equal(metricsById?.throttles.MetricStat.Stat, 'Sum')
  t.equal(metricsById?.invocations.MetricStat.Metric.Namespace, 'AWS/Lambda')
  t.equal(metricsById?.invocations.MetricStat.Metric.MetricName, 'Invocations')
  t.equal(metricsById?.invocations.MetricStat.Period, 120)
  t.equal(metricsById?.invocations.MetricStat.Stat, 'Sum')

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

  const compiledTemplate = createTestCloudFormationTemplate()
  const alarmResources = createLambdaAlarms(alarmConfig.Lambda, testAlarmActionsConfig, compiledTemplate)
  const invocAlarmResources: ResourceType = filterObject(
    alarmResources,
    (res) => res.Properties.AlarmName.payload[0].startsWith('Lambda_Invocations')
  )
  t.equal(Object.keys(invocAlarmResources).length, 8)
  for (const res of Object.values(invocAlarmResources)) {
    const al = res.Properties
    t.equal(al?.MetricName, 'Invocations')
    t.equal(al?.Statistic, 'Sum')
    t.equal(al?.Threshold, 900)
    t.equal(al?.EvaluationPeriods, 1)
    t.equal(al?.Namespace, 'AWS/Lambda')
    t.equal(al?.Period, alarmConfig.Lambda.Period)
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

  const compiledTemplate = createTestCloudFormationTemplate()
  createLambdaAlarms(alarmConfig.Lambda, testAlarmActionsConfig, compiledTemplate)
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
].forEach(({ functionName, reason }) => async () => {
  await test(`IteratorAge alarm is not created if function reference cannot be found due to ${reason}`, (t) => {
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

    const compiledTemplate = createTestCloudFormationTemplate(
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

    createLambdaAlarms(alarmConfig.Lambda, testAlarmActionsConfig, compiledTemplate)
    const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
    t.equal(Object.keys(alarmResources).length, 0)
    t.end()
  })
})

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

  const compiledTemplate = createTestCloudFormationTemplate()
  createLambdaAlarms(alarmConfig.Lambda, testAlarmActionsConfig, compiledTemplate)
  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

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

  const compiledTemplate = createTestCloudFormationTemplate()
  createLambdaAlarms(alarmConfig.Lambda, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})

test('AWS Lambda alarms are not created if disabled at function level', (t) => {
  const alarmConfig = createTestConfig(defaultConfig.alarms, {
    Lambda: {
      Invocations: {
        enabled: true,
        Threshold: 1
      }
    }
  })
  const compiledTemplate = createTestCloudFormationTemplate({
    Resources: {
      HelloLambdaFunction: {
        Type: 'AWS::Lambda::Function',
        Properties: {
          FunctionName: 'serverless-test-project-dev-simpletest'
        },
        Metadata: {
          slicWatch: {
            enabled: false
          }
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
  createLambdaAlarms(alarmConfig.Lambda, testAlarmActionsConfig, compiledTemplate)

  const alarmResources = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
  t.equal(Object.keys(alarmResources).length, 0)
  t.end()
})

test('Duration alarms are created if no timeout is specified', (t) => {
  const alarmConfig = createTestConfig(defaultConfig.alarms, {})

  const compiledTemplate = createTestCloudFormationTemplate()
  for (const resource of Object.values(getResourcesByType('AWS::Lambda::Function', compiledTemplate))) {
    delete resource.Properties?.Timeout
  }

  const alarmResources = createLambdaAlarms(alarmConfig.Lambda, testAlarmActionsConfig, compiledTemplate)
  const invocAlarmResources = filterObject(
    alarmResources,
    (res) => res.Properties.AlarmName.payload[0].startsWith('Lambda_Duration')
  )
  t.equal(Object.keys(invocAlarmResources).length, 8)
  t.end()
})
