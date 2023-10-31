import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import { getEventSourceMappingFunctions, getResourcesByType } from '../cf-template'
import type { AlarmActionsConfig, InputOutput, Value, SlicWatchMergedConfig, SlicWatchAlarmConfig } from './alarm-types'
import { createAlarm } from './alarm-utils'

export interface SlicWatchLambdaAlarmsConfig<T extends InputOutput> extends SlicWatchAlarmConfig {
  Errors: T
  ThrottlesPc: T
  DurationPc: T
  Invocations: T
  IteratorAge: T
}

export interface FunctionAlarmProperties<T extends InputOutput> {
  HelloLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
  ThrottlerLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
  DriveStreamLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
  DriveQueueLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
  DriveTableLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
  StreamProcessorLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
  HttpGetterLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
  SubscriptionHandlerLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
  EventsRuleLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
  AlbEventLambdaFunction?: SlicWatchLambdaAlarmsConfig<T>
}

const lambdaMetrics = ['Errors', 'ThrottlesPc', 'DurationPc', 'Invocations']

/**
 * Add all required Lambda alarms to the provided CloudFormation templatebased on the Lambda resources found within
 *
 * @param functionAlarmPropertiess The cascaded Lambda alarm configuration with function-specific overrides by function logical ID
 * @param context Deployment context (alarmActions)
 * @compiledTemplate  CloudFormation template object
 *
 * @returns Lambda-specific CloudFormation Alarm resources
 */
export default function createLambdaAlarms (functionAlarmProperties: SlicWatchLambdaAlarmsConfig<SlicWatchMergedConfig>, context: AlarmActionsConfig, compiledTemplate: Template) {
  const resources = {}
  const lambdaResources = getResourcesByType('AWS::Lambda::Function', compiledTemplate)

  for (const [funcLogicalId, funcResource] of Object.entries(lambdaResources)) {
    const config: SlicWatchLambdaAlarmsConfig<SlicWatchMergedConfig> = functionAlarmProperties[funcLogicalId]

    if (config === undefined) {
      console.warn(`${funcLogicalId} is not found in the template. Alarms will not be created for this function.`)
    } else {
      for (const metric of lambdaMetrics) {
        if (config.enabled === false || config[metric].enabled === false) {
          continue
        }
        if (metric === 'ThrottlesPc') {
          const properties = config.ThrottlesPc
          properties.Metrics = [
            {
              Id: 'throttles_pc',
              Expression: '(throttles / ( throttles + invocations )) * 100',
              Label: '% Throttles',
              ReturnData: true
            },
            {
              Id: 'throttles',
              MetricStat: {
                Metric: {
                  Namespace: 'AWS/Lambda',
                  MetricName: 'Throttles',
                  Dimensions: [{ Name: 'FunctionName', Value: Fn.Ref(funcLogicalId) }]
                },
                Period: properties.Period as Value<number>,
                Stat: properties.Statistic as Value<string>
              },
              ReturnData: false
            },
            {
              Id: 'invocations',
              MetricStat: {
                Metric: {
                  Namespace: 'AWS/Lambda',
                  MetricName: 'Invocations',
                  Dimensions: [{ Name: 'FunctionName', Value: Fn.Ref(funcLogicalId) }]
                },
                Period: properties.Period as Value<number>,
                Stat: properties.Statistic as Value<string>
              },
              ReturnData: false
            }
          ]
        }
        if (metric === 'DurationPc') {
          const properties = config.DurationPc
          const funcTimeout: number = funcResource.Properties?.Timeout ?? 3
          const threshold: Value<number> = properties.Threshold as number
          const alarmDescription = Fn.Sub(`Max duration for \${${funcLogicalId}} breaches ${properties.Threshold}% of timeout (${funcTimeout})`, {})
          properties.AlarmDescription = alarmDescription
          properties.Threshold = (threshold * funcTimeout * 1000) / 100
        }
        if (metric === 'Errors') {
          const properties = config.Errors
          const alarmDescription = Fn.Sub(`Error count for \${${funcLogicalId}} breaches ${properties.Threshold}`, {})
          properties.AlarmDescription = alarmDescription
        }

        if (metric === 'ThrottlesPc') {
          const properties = config.ThrottlesPc
          const alarmDescription = Fn.Sub(`Throttles % for \${${funcLogicalId}} breaches ${properties.Threshold}`, {})
          properties.AlarmDescription = alarmDescription
        }

        if (metric === 'Invocations') {
          const properties = config.Invocations
          const alarmDescription = Fn.Sub(`Total invocations for \${${funcLogicalId}} breaches ${properties.Threshold}`, {})
          properties.AlarmDescription = alarmDescription
        }

        Object.assign(resources, createLambdaCfAlarm(config[metric], metric, funcLogicalId, compiledTemplate, context))
      }
    }
    for (const funcLogicalId of Object.keys(getEventSourceMappingFunctions(compiledTemplate))) {
      const config = functionAlarmProperties[funcLogicalId]
      if (config === undefined) {
        console.warn(`${funcLogicalId} is not found in the template. Alarms will not be created for this function.`)
      } else if (config.enabled !== false && config.IteratorAge.enabled !== false) {
        Object.assign(resources, createLambdaCfAlarm(config.IteratorAge, 'IteratorAge', funcLogicalId, compiledTemplate, context))
      }
    }
  }
  return resources
}

/**
 * Create CloudFormation 'AWS::CloudWatch::Alarm' resources based on metrics for a specfic resources type
 *
 * @param config The fully resolved alarm configuration
 * @param metric The Lambda metric name
 * @param funcLogicalId The CloudFormation Logical ID of the Lambda resource
 * @param compiledTemplate A CloudFormation template object
 * @param context Deployment context (alarmActions)
 *
 * @returns Lambda-specific CloudFormation Alarm resources
 */

function createLambdaCfAlarm (config: SlicWatchMergedConfig, metric: string, funcLogicalId: string, compiledTemplate: Template, context: AlarmActionsConfig) {
  const { enabled, Period, Statistic, ...rest } = config

  const lambdaAlarmProperties: AlarmProperties = {
    AlarmName: Fn.Sub(`Lambda_${metric.replace(/Pc$/g, '')}_\${${funcLogicalId}}`, {}),
    AlarmDescription: Fn.Sub(`${metric.replace(/Pc$/g, '')} for \${${funcLogicalId}} breaches ${config.Threshold}`, {}),
    Metrics: undefined,
    ...((rest.Metrics != null) // MetricName, Namespace, Dimensions, Statistic, Period should not be set if list of Metrics is set
    // as these properties already set up under Metrics property
      ? {}
      : {
          MetricName: metric.replace(/Pc$/g, ''),
          Namespace: 'AWS/Lambda',
          Dimensions: [{ Name: 'FunctionName', Value: Fn.Ref(funcLogicalId) }],
          Statistic: config.Statistic,
          Period: config.Period
        }),
    ...rest
  }
  const resourceName = `slicWatchLambda${metric.replace(/Pc$/g, '')}Alarm${funcLogicalId}`
  const resource = createAlarm(lambdaAlarmProperties, context)
  return { [resourceName]: resource }
}
