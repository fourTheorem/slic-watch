'use strict'

/**
 * @param {object} functionAlarmConfigs The cascaded Lambda alarm configuration with
 *                                      function-specific overrides by function name
 * @param {object} context Deployment context (region, stackName, alarmActions)
 * @param {object} serverless The Serverless Framework instance
 */
module.exports = function LambdaAlarms (functionAlarmConfigs, context, serverless) {
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
      const functionName = funcResource.Properties.FunctionName ? funcResource.Properties.FunctionName : `${funcResourceName}Name`
      const funcConfig = functionAlarmConfigs[functionName]
      if (!funcConfig) {
        // Function is likely injected by another plugin and not a top-level user function
        serverless.cli.log(`${functionName} is not defined in Serverless 'functions'. Alarms will not be created.`)
        return
      }

      if (funcConfig.Errors.enabled) {
        const errAlarm = createLambdaErrorsAlarm(
          funcResourceName,
          funcResource,
          funcConfig.Errors
        )
        cfTemplate.addResource(errAlarm.resourceName, errAlarm.resource)
      }

      if (funcConfig.ThrottlesPc.enabled) {
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

      if (funcConfig.DurationPc.enabled) {
        const durationAlarm = createLambdaDurationAlarm(
          funcResourceName,
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

    for (const [funcResourceName, funcResource] of Object.entries(
      cfTemplate.getEventSourceMappingFunctions()
    )) {
      const funcConfig = functionAlarmConfigs[funcResource.Properties.FunctionName]
      if (funcConfig.IteratorAge.enabled) {
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
    const funcName = funcResource.Properties.FunctionName ? funcResource.Properties.FunctionName : `${funcResourceName}Name`
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchLambdaIteratorAgeAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaIteratorAge_${funcName}`,
        `Iterator Age for ${funcName} breaches ${threshold}`,
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
    const funcName = funcResource.Properties.FunctionName ? funcResource.Properties.FunctionName : `${funcResourceName}Name`
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchLambdaErrorsAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaErrors_${funcName}`,
        `Error count for ${funcName} breaches ${threshold}`,
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
    const funcName = funcResource.Properties.FunctionName ? funcResource.Properties.FunctionName : `${funcResourceName}Name`
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
        `Throttles % for ${funcName} breaches ${threshold}`, // alarmDescription
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
    const funcName = funcResource.Properties.FunctionName ? funcResource.Properties.FunctionName : `${funcResourceName}Name`
    const funcTimeout = funcResource.Properties.Timeout || 3
    const threshold = config.Threshold

    return {
      resourceName: `slicWatchLambdaDurationAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaDuration_${funcName}`,
        `Max duration for ${funcName} breaches ${threshold}% of timeout (${funcTimeout})`,
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
    const funcName = funcResource.Properties.FunctionName ? funcResource.Properties.FunctionName : `${funcResourceName}Name`
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchLambdaInvocationsAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaInvocations_${funcName}`,
        `Total invocations for ${funcName} breaches ${threshold}`,
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
