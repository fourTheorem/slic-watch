import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import { getResourcesByType, getEventSourceMappingFunctions } from '../cf-template'
import type { Context, SlicWatchAlarmConfig } from './alarm-types'
import { createAlarm } from './alarm-utils'

export interface LambdaFunctionAlarmsConfig {
  enabled?: boolean
  Errors: SlicWatchAlarmConfig
  ThrottlesPc: SlicWatchAlarmConfig
  DurationPc: SlicWatchAlarmConfig
  Invocations: SlicWatchAlarmConfig
  IteratorAge: SlicWatchAlarmConfig
}

export interface FunctionAlarmProperties {
  HelloLambdaFunction?: LambdaFunctionAlarmsConfig
  ThrottlerLambdaFunction?: LambdaFunctionAlarmsConfig
  DriveStreamLambdaFunction?: LambdaFunctionAlarmsConfig
  DriveQueueLambdaFunction?: LambdaFunctionAlarmsConfig
  DriveTableLambdaFunction?: LambdaFunctionAlarmsConfig
  StreamProcessorLambdaFunction?: LambdaFunctionAlarmsConfig
  HttpGetterLambdaFunction?: LambdaFunctionAlarmsConfig
  SubscriptionHandlerLambdaFunction?: LambdaFunctionAlarmsConfig
  EventsRuleLambdaFunction?: LambdaFunctionAlarmsConfig
  AlbEventLambdaFunction?: LambdaFunctionAlarmsConfig
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
export default function createLambdaAlarms (functionAlarmProperties: LambdaFunctionAlarmsConfig, context: Context, compiledTemplate: Template) {
  const resources = {}
  const lambdaResources = getResourcesByType('AWS::Lambda::Function', compiledTemplate)

  for (const [funcLogicalId, funcResource] of Object.entries(lambdaResources)) {
    const config: LambdaFunctionAlarmsConfig = functionAlarmProperties[funcLogicalId]

    for (const metric of lambdaMetrics) {
      if (config.enabled === false || config[metric].enabled === false) {
        continue
      }
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
                Dimensions: [{ Name: 'FunctionName', Value: Fn.Ref(funcLogicalId) }]
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
                Dimensions: [{ Name: 'FunctionName', Value: Fn.Ref(funcLogicalId) }]
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
        const alarmDescription = Fn.Sub(`${metric.replace(/Pc$/g, '')} for \${${funcLogicalId}} breaches ${properties.Threshold}% of timeout (${funcTimeout})`, {})
        properties.AlarmDescription = alarmDescription
        properties.Threshold = threshold !== undefined ? (threshold * funcTimeout * 1000) / 100 : undefined
      }
      if (metric === 'Errors') {
        const properties = config.Errors
        const alarmDescription = Fn.Sub(`Error count for \${${funcLogicalId}} breaches ${properties.Threshold}`, {})
        properties.AlarmDescription = alarmDescription
      }

      Object.assign(resources, createLambdaCfAlarm(config[metric], metric, funcLogicalId, compiledTemplate, context))
    }
  }
  for (const funcLogicalId of Object.keys(getEventSourceMappingFunctions(compiledTemplate))) {
    const config = functionAlarmProperties[funcLogicalId]
    if (config.enabled === false || config.IteratorAge.enabled === false) {
      continue
    }
    Object.assign(resources, createLambdaCfAlarm(config.IteratorAge, 'IteratorAge', funcLogicalId, compiledTemplate, context))
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

function createLambdaCfAlarm (config: SlicWatchAlarmConfig, metric: string, funcLogicalId: string, compiledTemplate: Template, context: Context) {
  const { enabled, Period, Statistic, ...rest } = config

  const alarmProps = rest as AlarmProperties // All mandatory properties are set following cascading
  const lambdaAlarmProperties: AlarmProperties = {
    AlarmName: Fn.Sub(`Lambda_${metric.replace(/Pc$/g, '')}_\${${funcLogicalId}}`, {}),
    AlarmDescription: Fn.Sub(`${metric.replace(/Pc$/g, '')} for \${${funcLogicalId}} breaches ${config.Threshold}`, {}),
    Metrics: undefined,
    ...((alarmProps.Metrics != null) // MetricName, Namespace, Dimensions, Statistic, Period should not be set if list of Metrics is set
    // as these properties already set up under Metrics property
      ? {}
      : {
          MetricName: metric.replace(/Pc$/g, ''),
          Namespace: 'AWS/Lambda',
          Dimensions: [{ Name: 'FunctionName', Value: Fn.Ref(funcLogicalId) }],
          Statistic: config.Statistic,
          Period: config.Period
        }),
    ...alarmProps
  }
  const resourceName = `slicWatchLambda${metric.replace(/Pc$/g, '')}Alarm${funcLogicalId}`
  const resource = createAlarm(lambdaAlarmProperties, context)
  return { [resourceName]: resource }
}
