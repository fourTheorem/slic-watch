'use strict'

module.exports = {
  dashboard: {},
  alarms: {
    Period: 60,
    EvaluationPeriods: 1,
    TreatMissingData: 'notBreaching',
    ComparisonOperator: 'GreaterThanThreshold',
    Lambda: {
      Errors: {
        Threshold: 0,
        Statistic: 'Sum',
      },
      ThrottlesPc: {
        // Throttles are evaluated as a percentage of invocations
        Threshold: 0,
      },
      DurationPc: {
        // Duration is evaluated as a percentage of the function timeout
        Threshold: 95,
        Statistic: 'Maximum',
      },
      Invocations: {
        /* No invocation alarms are created by default. Override threshold to create alarms */
        Threshold: null,
        Statistic: 'Sum',
      },
      IteratorAge: {
        Threshold: 10000,
        Statistic: 'Maximum',
      },
    },
    ApiGateway: {
      '5XXError': {
        Statistic: 'Average',
        Threshold: 0.0,
      },
      '4XXError': {
        Statistic: 'Average',
        Threshold: 0.05,
      },
      Latency: {
        ExtendedStatistic: 'p99',
        Threshold: 5000,
      },
    },
  },
}
