'use strict'
import { getResourcesByType, getEventSourceMappingFunctions } from '../cf-template'
import type { Context, DefaultAlarmsProperties, CfAlarmsProperties } from './default-config-alarms'
import { createAlarm } from './default-config-alarms'
import type Template from 'cloudform-types/types/template'

export interface LambdaFunctionAlarmsConfig {
  Errors: DefaultAlarmsProperties
  ThrottlesPc: DefaultAlarmsProperties
  DurationPc: DefaultAlarmsProperties
  Invocations: DefaultAlarmsProperties
  IteratorAge: DefaultAlarmsProperties
}

type LambdaMetrics = 'Errors' | 'ThrottlesPc' | 'DurationPc' | 'Invocations' | 'IteratorAge'

const lambdaMetrics: LambdaMetrics[] = ['Errors', 'ThrottlesPc', 'DurationPc', 'Invocations']

function alarmProperty (config: DefaultAlarmsProperties, metric: LambdaMetrics, funcLogicalId: string | number, compiledTemplate: Template, context: Context) {
  const { enabled, ...rest } = config
  const lambdaAlarmProperties: CfAlarmsProperties = {
    AlarmName: `Lambda_${metric.replace(/Pc$/g, '')}_${funcLogicalId}`,
    AlarmDescription: `${metric} for ${funcLogicalId} breaches ${config.Threshold}`,
    Metrics: undefined,
    MetricName: metric.replace(/Pc$/g, ''),
    Namespace: 'AWS/Lambda',
    Dimensions: [{ Name: 'FunctionName', Value: `${funcLogicalId}` }],
    ...rest
  }
  const resourceName = `slicWatchLambda${metric.replace(/Pc$/g, '')}Alarm${funcLogicalId}`
  const resource = createAlarm(lambdaAlarmProperties, context)
  return { [resourceName]: resource }
}

/**
 * functionAlarmPropertiess The cascaded Lambda alarm configuration with
 *                                      function-specific overrides by function logical ID
 * context Deployment context (alarmActions)
 */
export default function createLambdaAlarms (functionAlarmProperties: LambdaFunctionAlarmsConfig, context: Context, compiledTemplate: Template) {
  /**
   * Add all required Lambda alarms to the provided CloudFormation template
   * based on the Lambda resources found within
   *
   *
   */

  const resources = {}
  const lambdaResources = getResourcesByType('AWS::Lambda::Function', compiledTemplate)

  for (const [funcLogicalId, funcResource] of Object.entries(lambdaResources)) {
    const config = functionAlarmProperties[funcLogicalId]

    for (const metric of lambdaMetrics) {
      if (config.enabled === false || config[metric].enabled === false) {
        continue
      }
      // delete config.enabled
      // delete config[metric].enabled
      if (metric === 'ThrottlesPc') {
        const properties = config.ThrottlesPc
        properties.Metrics = [
          {
            Id: 'throttles_pc',
            Expression: '(throttles / throttles + invocations) * 100',
            Label: '% Throttles',
            ReturnData: true
          },
          {
            Id: 'throttles',
            MetricStat: {
              Metric: {
                Namespace: 'AWS/Lambda',
                MetricName: 'Throttles',
                Dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } as any }]
              },
              Period: properties.Period as number,
              Stat: properties.Statistic as string
            },
            ReturnData: false
          },
          {
            Id: 'invocations',
            MetricStat: {
              Metric: {
                Namespace: 'AWS/Lambda',
                MetricName: 'Invocations',
                Dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } as any }]
              },
              Period: properties.Period as number,
              Stat: properties.Statistic as string
            },
            ReturnData: false
          }
        ]
      }
      if (metric === 'DurationPc') {
        const properties = config.DurationPc
        const funcTimeout: number = funcResource.Properties?.Timeout ?? 3
        const threshold: number = properties.Threshold as number
        properties.Threshold = threshold !== undefined ? (threshold * funcTimeout * 1000) / 100 : undefined
      }
      Object.assign(resources, alarmProperty(config[metric], metric, funcLogicalId, compiledTemplate, context))
    }
  }
  for (const funcLogicalId of Object.keys(getEventSourceMappingFunctions(compiledTemplate))) {
    const config = functionAlarmProperties[funcLogicalId]
    if (config.enabled === false || config.IteratorAge.enabled === false) {
      continue
    }
    Object.assign(resources, alarmProperty(config.IteratorAge, 'IteratorAge', funcLogicalId, compiledTemplate, context))
  }
  return resources
}
