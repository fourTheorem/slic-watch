'use strict'

import { getResourcesByType, addResource, getEventSourceMappingFunctions, type ResourceType } from '../cf-template'
import { type Context, type FunctionAlarmPropertiess, createAlarm } from './default-config-alarms'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'
import pino from 'pino'
const logging = pino()

export type LambdaFunctionAlarmPropertiess = AlarmProperties & {
  Errors: AlarmProperties
  ThrottlesPc: AlarmProperties
  DurationPc: AlarmProperties
  Invocations: AlarmProperties
  IteratorAge: AlarmProperties
}

export type LambdaAlarm = AlarmProperties & {
  FuncName: string
}
/**
 * functionAlarmPropertiess The cascaded Lambda alarm configuration with
 *                                      function-specific overrides by function logical ID
 * context Deployment context (alarmActions)
 */
export default function createLambdaAlarms (functionAlarmPropertiess: FunctionAlarmPropertiess, context: Context, compiledTemplate: Template, additionalResources: ResourceType) {
  /**
   * Add all required Lambda alarms to the provided CloudFormation template
   * based on the Lambda resources found within
   *
   *
   */
  const lambdaResources = getResourcesByType('AWS::Lambda::Function', compiledTemplate, additionalResources)

  for (const [funcLogicalId, funcResource] of Object.entries(lambdaResources)) {
    const funcConfig = functionAlarmPropertiess[funcLogicalId]
    if (!funcConfig) {
      // Function is likely injected by another plugin and not a top-level user function
      logging.warn(`${funcLogicalId} is not found in the template. Alarms will not be created for this function.`)
      return
    }

    if (funcConfig.Errors.ActionsEnabled) {
      const errAlarm = createLambdaErrorsAlarm(
        funcLogicalId,
        funcResource,
        funcConfig.Errors
      )
      addResource(errAlarm.resourceName, errAlarm.resource, compiledTemplate)
    }

    if (funcConfig.ThrottlesPc.ActionsEnabled) {
      const throttlesAlarm = createLambdaThrottlesAlarm(
        funcLogicalId,
        funcResource,
        funcConfig.ThrottlesPc
      )

      addResource(throttlesAlarm.resourceName, throttlesAlarm.resource, compiledTemplate)
    }

    if (funcConfig.DurationPc.ActionsEnabled) {
      const durationAlarm = createLambdaDurationAlarm(
        funcLogicalId,
        funcResource,
        funcConfig.DurationPc
      )
      addResource(durationAlarm.resourceName, durationAlarm.resource, compiledTemplate)
    }

    if (funcConfig.Invocations.ActionsEnabled) {
      if (funcConfig.Invocations.Threshold == null) {
        throw new Error('Lambda invocation alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.')
      }

      const invocationsAlarm = createLambdaInvocationsAlarm(
        funcLogicalId,
        funcResource,
        funcConfig.Invocations
      )
      addResource(invocationsAlarm.resourceName, invocationsAlarm.resource, compiledTemplate)
    }
  }

  for (const [funcLogicalId, funcResource] of Object.entries(
    getEventSourceMappingFunctions(compiledTemplate, additionalResources)
  )) {
    const funcConfig = functionAlarmPropertiess[funcLogicalId]
    if (funcConfig.IteratorAge.ActionsEnabled) {
      // The function name may be a literal or an object (e.g., {'Fn::GetAtt': ['stream', 'Arn']})
      const iteratorAgeAlarm = createIteratorAgeAlarm(
        funcLogicalId,
        funcResource,
        funcConfig.IteratorAge
      )
      addResource(iteratorAgeAlarm.resourceName, iteratorAgeAlarm.resource, compiledTemplate)
    }
  }

  /**
   * Create alarms for Iterator Age on a Lambda EventSourceMapping
   * The Lambda function name
   */
  function createIteratorAgeAlarm (funcLogicalId: string, funcResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold
    const lambdaAlarmProperties: LambdaAlarm = {
      AlarmName: `Lambda_IteratorAge_${funcLogicalId}`,
      AlarmDescription: `Iterator Age for ${funcLogicalId} breaches ${threshold}`,
      FuncName: `${funcLogicalId}`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: threshold,
      Metrics: null,
      MetricName: 'IteratorAge',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/Lambda',
      Dimensions: [{ Name: 'FunctionName', Value: `${funcLogicalId}` }]
    }
    return {
      resourceName: `slicWatchLambdaIteratorAgeAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmProperties, context)
    }
  }

  function createLambdaErrorsAlarm (funcLogicalId: string, funcResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold
    const lambdaAlarmProperties: LambdaAlarm = {
      AlarmName: `Lambda_Errors_${funcLogicalId}`,
      AlarmDescription: `Error count for ${funcLogicalId} breaches ${threshold}`,
      FuncName: `${funcLogicalId}`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: threshold,
      Metrics: null,
      MetricName: 'Errors',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/Lambda',
      Dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } as any }]
    }
    return {
      resourceName: `slicWatchLambdaErrorsAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmProperties, context)
    }
  }

  function createLambdaThrottlesAlarm (funcLogicalId: string, funcResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold
    const period = config.Period

    const metrics = [
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
          Period: period,
          Stat: config.Statistic
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
          Period: period,
          Stat: config.Statistic
        },
        ReturnData: false
      }
    ]
    const lambdaAlarmProperties: LambdaAlarm = {
      AlarmName: `Lambda_Throttles_${funcLogicalId}`,
      AlarmDescription: `Throttles % for ${funcLogicalId} breaches ${threshold}`,
      FuncName: `${funcLogicalId}`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: threshold,
      Metrics: metrics,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData
    }
    return {
      resourceName: `slicWatchLambdaThrottlesAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmProperties, context)
    }
  }

  function createLambdaDurationAlarm (funcLogicalId: string, funcResource: Resource, config: AlarmProperties) {
    const funcTimeout = funcResource.Properties.Timeout || 3
    const threshold = config.Threshold
    const lambdaAlarmProperties: LambdaAlarm = {
      AlarmName: `Lambda_Duration_${funcLogicalId}`,
      AlarmDescription: `Max duration for ${funcLogicalId} breaches ${threshold}% of timeout (${funcTimeout})`,
      FuncName: `${funcLogicalId}`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: (threshold * funcTimeout * 1000) / 100,
      Metrics: null,
      MetricName: 'Duration',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/Lambda',
      Dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } as any }]
    }
    return {
      resourceName: `slicWatchLambdaDurationAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmProperties, context)
    }
  }

  function createLambdaInvocationsAlarm (funcLogicalId: string, funcResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold
    const lambdaAlarmProperties: LambdaAlarm = {
      AlarmName: `Lambda_Invocations_${funcLogicalId}`,
      AlarmDescription: `Total invocations for ${funcLogicalId} breaches ${threshold}`,
      FuncName: `${funcLogicalId}`,
      ComparisonOperator: config.ComparisonOperator,
      Threshold: threshold,
      Metrics: null,
      MetricName: 'Invocations',
      Statistic: config.Statistic,
      Period: config.Period,
      ExtendedStatistic: config.ExtendedStatistic,
      EvaluationPeriods: config.EvaluationPeriods,
      TreatMissingData: config.TreatMissingData,
      Namespace: 'AWS/Lambda',
      Dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } as any }]
    }
    return {
      resourceName: `slicWatchLambdaInvocationsAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmProperties, context)
    }
  }
}
