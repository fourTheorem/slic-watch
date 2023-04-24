'use strict'

const { getLogger } = require('./logging')

const logging = getLogger()

/**
 * @param {object} functionAlarmConfigs The cascaded Lambda alarm configuration with
 *                                      function-specific overrides by function logical ID
 * @param {object} context Deployment context (alarmActions)
 */
module.exports = function LambdaAlarms (functionAlarmConfigs, context) {
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
  function createIteratorAgeAlarm (funcLogicalId, funcResource, config) {
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchLambdaIteratorAgeAlarm${funcLogicalId}`,
      resource: createLambdaAlarm(
        { 'Fn::Sub': `Lambda_IteratorAge_\${${funcLogicalId}}` },
        { 'Fn::Sub': `Iterator Age for ${funcLogicalId} breaches ${threshold}` },
        { Ref: funcLogicalId },
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

  function createLambdaErrorsAlarm (funcLogicalId, funcResource, config) {
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchLambdaErrorsAlarm${funcLogicalId}`,
      resource: createLambdaAlarm(
        { 'Fn::Sub': `Lambda_Errors_\${${funcLogicalId}}` },
        { 'Fn::Sub': `Error count for \${${funcLogicalId}} breaches ${threshold}` },
        { Ref: funcLogicalId },
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

  function createLambdaThrottlesAlarm (funcLogicalId, funcResource, config) {
    const threshold = config.Threshold
    const period = config.Period

    const metrics = [
      {
        Id: 'throttles_pc',
        Expression: '(throttles / (throttles + invocations)) * 100',
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

    return {
      resourceName: `slicWatchLambdaThrottlesAlarm${funcLogicalId}`,
      resource: createLambdaAlarm(
        { 'Fn::Sub': `Lambda_Throttles_\${${funcLogicalId}}` },
        { 'Fn::Sub': `Throttles % for \${${funcLogicalId}} breaches ${threshold}` },
        { Ref: funcLogicalId },
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

  function createLambdaDurationAlarm (funcLogicalId, funcResource, config) {
    const funcTimeout = funcResource.Properties.Timeout || 3
    const threshold = config.Threshold

    return {
      resourceName: `slicWatchLambdaDurationAlarm${funcLogicalId}`,
      resource: createLambdaAlarm(
        { 'Fn::Sub': `Lambda_Duration_\${${funcLogicalId}}` },
        { 'Fn::Sub': `Max duration for \${${funcLogicalId}} breaches ${threshold}% of timeout (${funcTimeout})` },
        { Ref: funcLogicalId },
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
    funcLogicalId,
    funcResource,
    config
  ) {
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchLambdaInvocationsAlarm${funcLogicalId}`,
      resource: createLambdaAlarm(
        { 'Fn::Sub': `Lambda_Invocations_\${${funcLogicalId}}` },
        { 'Fn::Sub': `Total invocations for \${${funcLogicalId}} breaches ${threshold}` },
        { Ref: funcLogicalId },
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
