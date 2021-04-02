'use strict'

module.exports = function alarms(serverless, config) {
  return {
    addAlarms,
  }

  /**
   * Add all required AWS Lambda alarms to the provided CloudFormation template
   * based on the Function resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function addAlarms(cfTemplate) {
    const lambdaResources = cfTemplate.getResourcesByType(
      'AWS::Lambda::Function'
    )

    for (const [funcResourceName, funcResource] of Object.entries(
      lambdaResources
    )) {
      const errAlarm = createLambdaErrorsAlarm(funcResourceName, funcResource)
      cfTemplate.addResource(errAlarm.resourceName, errAlarm.resource)
      const throttlesAlarm = createLambdaThrottlesAlarm(
        funcResourceName,
        funcResource
      )
      cfTemplate.addResource(
        throttlesAlarm.resourceName,
        throttlesAlarm.resource
      )
      const durationAlarm = createLambdaDurationAlarm(
        funcResourceName,
        funcResource
      )
      cfTemplate.addResource(durationAlarm.resourceName, durationAlarm.resource)

      if (config.invocationsThreshold) {
        const invocationsAlarm = createLambdaInvocationsAlarm(
          funcResourceName,
          funcResource
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
      // The function name may be a literal or an object (e.g., {'Fn::GetAtt': ['stream', 'Arn']})
      const iteratorAgeAlarm = createIteratorAgeAlarm(
        funcResourceName,
        funcResource
      )
      cfTemplate.addResource(
        iteratorAgeAlarm.resourceName,
        iteratorAgeAlarm.resource
      )
    }
  }

  function createLambdaAlarm(
    alarmName,
    alarmDescription,
    funcName,
    comparisonOperator,
    threshold,
    metrics,
    metricName,
    statistic
  ) {
    const metricProperties = metrics
      ? { Metrics: metrics }
      : {
          Dimensions: [{ Name: 'FunctionName', Value: funcName }],
          MetricName: metricName,
          Namespace: 'AWS/Lambda',
          Period: config.alarmPeriod,
          Statistic: statistic,
        }

    return {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: [config.topicArn],
        AlarmName: alarmName,
        AlarmDescription: alarmDescription,
        EvaluationPeriods: 1,
        ComparisonOperator: comparisonOperator,
        Threshold: threshold,
        TreatMissingData: 'notBreaching',
        ...metricProperties,
      },
    }
  }

  /**
   * Create alarms for Iterator Age on a Lambda EventSourceMapping
   * @param {(string|Object)} func The Lambda function name
   */
  function createIteratorAgeAlarm(funcResourceName, funcResource) {
    const funcName = funcResource.Properties.FunctionName
    return {
      resourceName: `slicWatchLambdaIteratorAgeAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaIteratorAge_${funcName}`,
        `Iterator Age for ${funcName} exceeds ${config.iteratorAgeThreshold}`,
        funcName,
        'GreaterThanThreshold',
        config.iteratorAgeThreshold,
        null,
        'IteratorAge',
        'Maximum'
      ),
    }
  }

  function createLambdaErrorsAlarm(funcResourceName, funcResource) {
    const funcName = funcResource.Properties.FunctionName
    return {
      resourceName: `slicWatchLambdaErrorsAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaErrors_${funcName}`,
        `Error count for ${funcName} exceeds ${config.errorsThreshold}`,
        funcName,
        'GreaterThanThreshold',
        config.errorsThreshold,
        null,
        'Errors',
        'Sum'
      ),
    }
  }

  function createLambdaThrottlesAlarm(funcResourceName, funcResource) {
    const funcName = funcResource.Properties.FunctionName
    const metrics = [
      {
        Id: 'throttles_pc',
        Expression: '(throttles / throttles + invocations) * 100',
        Label: '% Throttles',
        ReturnData: true,
      },
      {
        Id: 'throttles',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Throttles',
            Dimensions: [{ Name: 'FunctionName', Value: funcName }],
          },
          Period: config.alarmPeriod,
          Stat: 'Sum',
        },
        ReturnData: false,
      },
      {
        Id: 'invocations',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Invocations',
            Dimensions: [{ Name: 'FunctionName', Value: funcName }],
          },
          Period: config.alarmPeriod,
          Stat: 'Sum',
        },
        ReturnData: false,
      },
    ]

    return {
      resourceName: `slicWatchLambdaThrottlesAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaThrottles_${funcName}`,
        `Throttles % for ${funcName} exceeds ${config.throttlesPercentThreshold}`,
        funcName,
        'GreaterThanThreshold',
        config.throttlesPercentThreshold,
        metrics
      ),
    }
  }

  function createLambdaDurationAlarm(funcResourceName, funcResource) {
    const funcName = funcResource.Properties.FunctionName
    const funcTimeout = funcResource.Properties.Timeout
    return {
      resourceName: `slicWatchLambdaDurationAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaDuration_${funcName}`,
        `Max duration for ${funcName} exceeds ${config.durationPercentTimeoutThreshold}% of timeout (${funcTimeout})`,
        funcName,
        'GreaterThanThreshold',
        (config.durationPercentTimeoutThreshold * funcTimeout) / 100,
        null,
        'Duration',
        'Maximum'
      ),
    }
  }

  function createLambdaInvocationsAlarm(funcResourceName, funcResource) {
    const funcName = funcResource.Properties.FunctionName
    return {
      resourceName: `slicWatchLambdaInvocationsAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaInvocations_${funcName}`,
        `Total invocations for ${funcName} exceeds ${config.invocationsThreshold}`,
        funcName,
        'GreaterThanThreshold',
        config.invocationsThreshold,
        null,
        'Invocations',
        'Sum'
      ),
    }
  }
}
