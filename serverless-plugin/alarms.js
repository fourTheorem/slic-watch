'use strict'

const { filterObject } = require('./util')

const PERIOD = 60
const ERRORS_THRESHOLD = 0
const THROTTLES_PERCENT_THRESHOLD = 0
const DURATION_PERCENT_TIMEOUT_THRESHOLD = 0
const DEFAULT_SLS_LAMBDA_TIMEOUT = 3

module.exports = function alarms(serverless, config) {
  return {
    addAlarms,
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
    const funcTimeout =
      funcResource.Properties.Timeout || DEFAULT_SLS_LAMBDA_TIMEOUT
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

  function addAlarms(cfTemplate) {
    const lambdaResources = filterObject(
      cfTemplate.Resources,
      (resource) => resource.Type == 'AWS::Lambda::Function'
    )

    const alarmResources = []
    for (const [funcResourceName, funcResource] of Object.entries(
      lambdaResources
    )) {
      const errAlarm = createLambdaErrorsAlarm(funcResourceName, funcResource)
      cfTemplate.Resources[errAlarm.resourceName] = errAlarm.resource
      const throttlesAlarm = createLambdaThrottlesAlarm(
        funcResourceName,
        funcResource
      )
      cfTemplate.Resources[throttlesAlarm.resourceName] =
        throttlesAlarm.resource
      const durationAlarm = createLambdaDurationAlarm(
        funcResourceName,
        funcResource
      )
      cfTemplate.Resources[durationAlarm.resourceName] = durationAlarm.resource

      if (config.invocationsThreshold) {
        const invocationsAlarm = createLambdaInvocationsAlarm(
          funcResourceName,
          funcResource
        )
        cfTemplate.Resources[invocationsAlarm.resourceName] = invocationsAlarm.resource
      }
    }
  }
}
