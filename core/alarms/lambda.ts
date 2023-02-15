'use strict'

import { CfResource, CloudFormationTemplate } from '../cf-template'
import { Alarm, AlarmConfig, Context, FunctionAlarmConfigs, createAlarm } from './default-config-alarms'

import { getLogger } from '../logging'
const logging = getLogger()

export type LambdaFunctionAlarmConfigs = {
  enabled?: boolean
  Period?: number
  Errors: AlarmConfig,
  ThrottlesPc: AlarmConfig
  DurationPc: AlarmConfig
  Invocations: AlarmConfig
  IteratorAge: AlarmConfig
}

export type LambdaAlarm = Alarm & {
  funcName: object
  metrics
} 
/**
 * functionAlarmConfigs The cascaded Lambda alarm configuration with
 *                                      function-specific overrides by function logical ID
 * context Deployment context (alarmActions)
 */
export default function LambdaAlarms (functionAlarmConfigs: FunctionAlarmConfigs, context: Context) {
  return {
    createLambdaAlarms
  }

  /**
   * Add all required Lambda alarms to the provided CloudFormation template
   * based on the Lambda resources found within
   *
   *
   */
  function createLambdaAlarms(cfTemplate: CloudFormationTemplate) {
    const lambdaResources = cfTemplate.getResourcesByType(
      'AWS::Lambda::Function'
    )

    for (const [funcLogicalId, funcResource] of Object.entries(lambdaResources)) {
      const funcConfig = functionAlarmConfigs[funcLogicalId]
      if (!funcConfig) {
        // Function is likely injected by another plugin and not a top-level user function
        logging.warn(`${funcLogicalId} is not found in the template. Alarms will not be created for this function.`)
        return
      }

      if (funcConfig.Errors.enabled) {
        const errAlarm = createLambdaErrorsAlarm(
          funcLogicalId,
          funcResource,
          funcConfig.Errors
        )
        cfTemplate.addResource(errAlarm.resourceName, errAlarm.resource)
      }

      if (funcConfig.ThrottlesPc.enabled) {
        const throttlesAlarm = createLambdaThrottlesAlarm(
          funcLogicalId,
          funcResource,
          funcConfig.ThrottlesPc
        )

        cfTemplate.addResource(
          throttlesAlarm.resourceName,
          throttlesAlarm.resource
        )
      }

      if (funcConfig.DurationPc.enabled) {
        const durationAlarm = createLambdaDurationAlarm(
          funcLogicalId,
          funcResource,
          funcConfig.DurationPc
        )
        cfTemplate.addResource(durationAlarm.resourceName, durationAlarm.resource)
      }

      if (funcConfig.Invocations.enabled) {
        if (funcConfig.Invocations.Threshold == null) {
          throw new Error('Lambda invocation alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.')
        }

        const invocationsAlarm = createLambdaInvocationsAlarm(
          funcLogicalId,
          funcResource,
          funcConfig.Invocations
        )
        cfTemplate.addResource(
          invocationsAlarm.resourceName,
          invocationsAlarm.resource
        )
      }
    }

    for (const [funcLogicalId, funcResource] of Object.entries(
      cfTemplate.getEventSourceMappingFunctions()
    )) {
      const funcConfig = functionAlarmConfigs[funcLogicalId]
      if (funcConfig.IteratorAge.enabled) {
        // The function name may be a literal or an object (e.g., {'Fn::GetAtt': ['stream', 'Arn']})
        const iteratorAgeAlarm = createIteratorAgeAlarm(
          funcLogicalId,
          funcResource,
          funcConfig.IteratorAge
        )
        cfTemplate.addResource(
          iteratorAgeAlarm.resourceName,
          iteratorAgeAlarm.resource
        )
      }
    }
  }

  /**
   * Create alarms for Iterator Age on a Lambda EventSourceMapping
   * The Lambda function name
   */
  function createIteratorAgeAlarm (funcLogicalId: string, funcResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const lambdaAlarmConfig: LambdaAlarm = {
      alarmName:{ 'Fn::Sub': `Lambda_IteratorAge_\${${funcLogicalId}}` } ,
      alarmDescription: { 'Fn::Sub': `Iterator Age for ${funcLogicalId} breaches ${threshold}` },
      funcName: { Ref: funcLogicalId },
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metrics: null,
      metricName: 'IteratorAge',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/Lambda',
      dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } }]
    }
    return {
      resourceName: `slicWatchLambdaIteratorAgeAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmConfig, context)
    }
  }

  function createLambdaErrorsAlarm (funcLogicalId: string, funcResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const lambdaAlarmConfig: LambdaAlarm = {
      alarmName: { 'Fn::Sub': `Lambda_Errors_\${${funcLogicalId}}` },
      alarmDescription: { 'Fn::Sub': `Error count for \${${funcLogicalId}} breaches ${threshold}` },
      funcName: { Ref: funcLogicalId },
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metrics: null,
      metricName: 'Errors',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/Lambda',
      dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } }]
    }
    return {
      resourceName: `slicWatchLambdaErrorsAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmConfig, context)
    }
  }

  function createLambdaThrottlesAlarm (funcLogicalId: string, funcResource: CfResource, config: AlarmConfig) {
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
            Dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } }]
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
            Dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } }]
          },
          Period: period,
          Stat: config.Statistic
        },
        ReturnData: false
      }
    ]
    const lambdaAlarmConfig: LambdaAlarm = {
      alarmName:  { 'Fn::Sub': `Lambda_Throttles_\${${funcLogicalId}}` },
      alarmDescription: { 'Fn::Sub': `Throttles % for \${${funcLogicalId}} breaches ${threshold}` },
      funcName: { Ref: funcLogicalId },
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metrics: metrics,
      metricName: null,
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/Lambda',
      dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } }]
    }
    return {
      resourceName: `slicWatchLambdaThrottlesAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmConfig, context)
    }
  }

  function createLambdaDurationAlarm (funcLogicalId: string, funcResource: CfResource, config: AlarmConfig) {
    const funcTimeout = funcResource.Properties.Timeout || 3
    const threshold = config.Threshold
    const lambdaAlarmConfig: LambdaAlarm = {
      alarmName:  { 'Fn::Sub': `Lambda_Duration_\${${funcLogicalId}}` },
      alarmDescription:  { 'Fn::Sub': `Max duration for \${${funcLogicalId}} breaches ${threshold}% of timeout (${funcTimeout})` },
      funcName: { Ref: funcLogicalId },
      comparisonOperator: config.ComparisonOperator,
      threshold:  (threshold * funcTimeout * 1000) / 100,
      metrics: null,
      metricName: 'Duration',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/Lambda',
      dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } }]
    }
    return {
      resourceName: `slicWatchLambdaDurationAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmConfig, context)
    }
  }

  function createLambdaInvocationsAlarm (funcLogicalId: string, funcResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const lambdaAlarmConfig: LambdaAlarm = {
      alarmName:  { 'Fn::Sub': `Lambda_Invocations_\${${funcLogicalId}}` },
      alarmDescription: { 'Fn::Sub': `Total invocations for \${${funcLogicalId}} breaches ${threshold}` },
      funcName: { Ref: funcLogicalId },
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metrics: null,
      metricName: 'Invocations',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/Lambda',
      dimensions: [{ Name: 'FunctionName', Value: { Ref: funcLogicalId } }]
    }
    return {
      resourceName: `slicWatchLambdaInvocationsAlarm${funcLogicalId}`,
      resource: createAlarm(lambdaAlarmConfig, context)
    }
  }
}
