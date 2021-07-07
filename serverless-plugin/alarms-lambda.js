'use strict'

const _ = require('lodash')

/**
 * @param {object} lambdaAlarmConfig The fully resolved alarm plugin configuration
 * @param {object} functionAlarmConfigs The function-specific configuration by function name
 */
module.exports = function LambdaAlarms (lambdaAlarmConfig, functionAlarmConfigs, context) {
  return {
    createLambdaAlarms
  }

  /**
   * Add all required Lambda alarms to the provided CloudFormation template
   * based on the Lambda resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createLambdaAlarms (cfTemplate) {
    const lambdaResources = cfTemplate.getResourcesByType(
      'AWS::Lambda::Function'
    )

    for (const [funcResourceName, funcResource] of Object.entries(lambdaResources)) {
      const functionName = funcResource.Properties.Name
      const funcConfig = _.merge(lambdaAlarmConfig, functionAlarmConfigs[functionName])
      if (lambdaAlarmConfig.Errors.enabled) {
        const errAlarm = createLambdaErrorsAlarm(
          funcResourceName,
          funcResource,
          funcConfig.Errors
        )
        cfTemplate.addResource(errAlarm.resourceName, errAlarm.resource)
      }

      if (lambdaAlarmConfig.ThrottlesPc.enabled) {
        const throttlesAlarm = createLambdaThrottlesAlarm(
          funcResourceName,
          funcResource,
          funcConfig.ThrottlesPc
        )

        cfTemplate.addResource(
          throttlesAlarm.resourceName,
          throttlesAlarm.resource
        )
      }

      if (lambdaAlarmConfig.DurationPc.enabled) {
        const durationAlarm = createLambdaDurationAlarm(
          funcResourceName,
          funcResource,
          funcConfig.DurationPc
        )
        cfTemplate.addResource(durationAlarm.resourceName, durationAlarm.resource)
      }

      if (lambdaAlarmConfig.Invocations.enabled) {
        if (lambdaAlarmConfig.Invocations.Threshold == null) {
          throw new Error('Lambda invocation alarm is enabled but `Threshold` is not specified. Please specify a threshold or disable the alarm.')
        }

        const invocationsAlarm = createLambdaInvocationsAlarm(
          funcResourceName,
          funcResource,
          funcConfig.Invocations
        )
        cfTemplate.addResource(
          invocationsAlarm.resourceName,
          invocationsAlarm.resource
        )
      }
    }

    if (lambdaAlarmConfig.IteratorAge.enabled) {
      for (const [funcResourceName, funcResource] of Object.entries(
        cfTemplate.getEventSourceMappingFunctions()
      )) {
        const funcConfig = _.merge(lambdaAlarmConfig, functionAlarmConfigs[funcResource.Properties.Name])
        // The function name may be a literal or an object (e.g., {'Fn::GetAtt': ['stream', 'Arn']})
        const iteratorAgeAlarm = createIteratorAgeAlarm(
          funcResourceName,
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

  function createLambdaAlarm (
    alarmName,
    alarmDescription,
    funcName,
    comparisonOperator,
    threshold,
    metrics,
    metricName,
    statistic,
    period,
    evaluationPeriods,
    treatMissingData
  ) {
    const metricProperties = metrics
      ? { Metrics: metrics }
      : {
          Dimensions: [{ Name: 'FunctionName', Value: funcName }],
          MetricName: metricName,
          Namespace: 'AWS/Lambda',
          Period: period,
          Statistic: statistic
        }

    return {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: context.alarmActions,
        AlarmName: alarmName,
        AlarmDescription: alarmDescription,
        EvaluationPeriods: evaluationPeriods,
        ComparisonOperator: comparisonOperator,
        Threshold: threshold,
        TreatMissingData: treatMissingData,
        ...metricProperties
      }
    }
  }

  /**
   * Create alarms for Iterator Age on a Lambda EventSourceMapping
   * @param {(string|Object)} func The Lambda function name
   */
  function createIteratorAgeAlarm (funcResourceName, funcResource, config) {
    const funcName = funcResource.Properties.FunctionName
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchLambdaIteratorAgeAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaIteratorAge_${funcName}`,
        `Iterator Age for ${funcName} exceeds ${threshold}`,
        funcName,
        config.ComparisonOperator,
        threshold,
        null,
        'IteratorAge',
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createLambdaErrorsAlarm (funcResourceName, funcResource, config) {
    const funcName = funcResource.Properties.FunctionName
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchLambdaErrorsAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaErrors_${funcName}`,
        `Error count for ${funcName} exceeds ${threshold}`,
        funcName,
        config.ComparisonOperator,
        threshold,
        null,
        'Errors',
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createLambdaThrottlesAlarm (funcResourceName, funcResource, config) {
    const funcName = funcResource.Properties.FunctionName
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
            Dimensions: [{ Name: 'FunctionName', Value: funcName }]
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
            Dimensions: [{ Name: 'FunctionName', Value: funcName }]
          },
          Period: period,
          Stat: config.Statistic
        },
        ReturnData: false
      }
    ]

    return {
      resourceName: `slicWatchLambdaThrottlesAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaThrottles_${funcName}`, // alarmName
        `Throttles % for ${funcName} exceeds ${threshold}`, // alarmDescription
        funcName, // funcName
        config.ComparisonOperator, // comparisonOperator
        threshold, // threshold
        metrics, // metrics
        null, // metricName
        config.Statistic, // statistic
        config.Period, // period
        config.EvaluationPeriods, // evaluationPeriods
        config.TreatMissingData // treatMissingData
      )
    }
  }

  function createLambdaDurationAlarm (funcResourceName, funcResource, config) {
    const funcName = funcResource.Properties.FunctionName
    const funcTimeout = funcResource.Properties.Timeout
    const threshold = config.Threshold

    return {
      resourceName: `slicWatchLambdaDurationAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaDuration_${funcName}`,
        `Max duration for ${funcName} exceeds ${threshold}% of timeout (${funcTimeout})`,
        funcName,
        config.ComparisonOperator,
        (threshold * funcTimeout * 1000) / 100,
        null,
        'Duration',
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createLambdaInvocationsAlarm (
    funcResourceName,
    funcResource,
    config
  ) {
    const funcName = funcResource.Properties.FunctionName
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchLambdaInvocationsAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaInvocations_${funcName}`,
        `Total invocations for ${funcName} exceeds ${threshold}`,
        funcName,
        config.ComparisonOperator,
        threshold,
        null,
        'Invocations',
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }
}
