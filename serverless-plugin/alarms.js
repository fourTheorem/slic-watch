'use strict'

const { cascade } = require('./cascading-config')

module.exports = function alarms(serverless, config) {
  const alarmConfig = cascade(config.alarms)

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

      if (alarmConfig.Lambda.Invocations.threshold) {
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
    statistic,
    period
  ) {
    const metricProperties = metrics
      ? { Metrics: metrics }
      : {
          Dimensions: [{ Name: 'FunctionName', Value: funcName }],
          MetricName: metricName,
          Namespace: 'AWS/Lambda',
          Period: period,
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
    const threshold = alarmConfig.Lambda.IteratorAge.Threshold
    return {
      resourceName: `slicWatchLambdaIteratorAgeAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaIteratorAge_${funcName}`,
        `Iterator Age for ${funcName} exceeds ${threshold}`,
        funcName,
        alarmConfig.Lambda.IteratorAge.ComparisonOperator,
        threshold,
        null,
        'IteratorAge',
        alarmConfig.Lambda.IteratorAge.Statistic,
        alarmConfig.Lambda.IteratorAge.Period
      ),
    }
  }

  function createLambdaErrorsAlarm(funcResourceName, funcResource) {
    const funcName = funcResource.Properties.FunctionName
    const threshold = alarmConfig.Lambda.Errors.Threshold
    return {
      resourceName: `slicWatchLambdaErrorsAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaErrors_${funcName}`,
        `Error count for ${funcName} exceeds ${threshold}`,
        alarmConfig.Lambda.Errors.ComparisonOperator,
        'GreaterThanThreshold',
        threshold,
        null,
        'Errors',
        alarmConfig.Lambda.Errors.Statistic,
        alarmConfig.Lambda.Errors.Period
      ),
    }
  }

  function createLambdaThrottlesAlarm(funcResourceName, funcResource) {
    const funcName = funcResource.Properties.FunctionName
    const threshold = alarmConfig.Lambda.ThrottlesPc.Threshold
    const period = alarmConfig.Lambda.ThrottlesPc.Period

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
          Period: period,
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
          Period: period,
          Stat: 'Sum',
        },
        ReturnData: false,
      },
    ]

    return {
      resourceName: `slicWatchLambdaThrottlesAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaThrottles_${funcName}`,
        `Throttles % for ${funcName} exceeds ${threshold}`,
        funcName,
        alarmConfig.Lambda.ThrottlesPc.ComparisonOperator,
        threshold,
        metrics
      ),
    }
  }

  function createLambdaDurationAlarm(funcResourceName, funcResource) {
    const funcName = funcResource.Properties.FunctionName
    const funcTimeout = funcResource.Properties.Timeout
    const threshold = alarmConfig.Lambda.DurationPc.Threshold

    return {
      resourceName: `slicWatchLambdaDurationAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaDuration_${funcName}`,
        `Max duration for ${funcName} exceeds ${threshold}% of timeout (${funcTimeout})`,
        funcName,
        alarmConfig.Lambda.DurationPc.ComparisonOperator,
        (threshold * funcTimeout) / 100,
        null,
        'Duration',
        alarmConfig.Lambda.DurationPc.Statistic,
        alarmConfig.Lambda.DurationPc.Period
      ),
    }
  }

  function createLambdaInvocationsAlarm(funcResourceName, funcResource) {
    const funcName = funcResource.Properties.FunctionName
    const threshold = alarmConfig.Lambda.Invocations.Threshold
    return {
      resourceName: `slicWatchLambdaInvocationsAlarm${funcResourceName}`,
      resource: createLambdaAlarm(
        `LambdaInvocations_${funcName}`,
        `Total invocations for ${funcName} exceeds ${threshold}`,
        funcName,
        'Invocations',
        alarmConfig.Lambda.Invocations.ComparisonOperator,
        config.invocationsThreshold,
        null,
        'Invocations',
        alarmConfig.Lambda.Invocations.Statistic,
        alarmConfig.Lambda.Invocations.Period
      ),
    }
  }
}
