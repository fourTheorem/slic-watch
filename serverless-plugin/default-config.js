'use strict'

module.exports = {
  dashboard: {
    timeRange: {
      start: '-PT3H'
    },
    metricPeriod: 300,
    layout: {
      widgetWidth: 8,
      widgetHeight: 6
    }
  },
  alarms: {
    enabled: true,
    Period: 60,
    EvaluationPeriods: 1,
    TreatMissingData: 'notBreaching',
    ComparisonOperator: 'GreaterThanThreshold',
    Lambda: {
      enabled: true,
      Errors: {
        Threshold: 0,
        Statistic: 'Sum'
      },
      ThrottlesPc: {
        // Throttles are evaluated as a percentage of invocations
        Threshold: 0
      },
      DurationPc: {
        // Duration is evaluated as a percentage of the function timeout
        Threshold: 95,
        Statistic: 'Maximum'
      },
      Invocations: {
        /* No invocation alarms are created by default. Override threshold to create alarms */
        enabled: false,
        Threshold: null,
        Statistic: 'Sum'
      },
      IteratorAge: {
        Threshold: 10000,
        Statistic: 'Maximum'
      }
    },
    ApiGateway: {
      enabled: true,
      '5XXError': {
        Statistic: 'Average',
        Threshold: 0.0
      },
      '4XXError': {
        Statistic: 'Average',
        Threshold: 0.05
      },
      Latency: {
        ExtendedStatistic: 'p99',
        Threshold: 5000
      }
    },
    States: {
      enabled: true,
      Statistic: 'Sum',
      ExecutionsThrottled: {
        Threshold: 0
      },
      ExecutionsFailed: {
        Threshold: 0
      },
      ExecutionsTimedOut: {
        Threshold: 0
      }
    }
  }
}
