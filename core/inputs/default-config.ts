'use strict'

import { type SlicWatchAlarmProperties } from '../alarms/default-config-alarms'
import { type AllDashboardConfig } from '../dashboards/default-config-dashboard'

/**
 * This is the default configuration for Alarms and Dashboard widgets for all supported AWS services.
 * Any values here can be overridden in the SLIC Watch configuration. See the main README.md for details on how
 * to customise the configuration for any service or specific metric.
 */
export const defaultConfig = {
  alarms: {
    enabled: true,
    Period: 60,
    EvaluationPeriods: 1,
    TreatMissingData: 'notBreaching',
    ComparisonOperator: 'GreaterThanThreshold',
    Lambda: { // Lambda Functions
      Errors: {
        Threshold: 0,
        Statistic: 'Sum'
      },
      ThrottlesPc: { // Throttles are evaluated as a percentage of invocations
        Threshold: 0,
        Statistic: 'Sum'
      },
      DurationPc: { // Duration is evaluated as a percentage of the function timeout
        Threshold: 95,
        Statistic: 'Maximum'
      },
      Invocations: { // No invocation alarms are created by default. Override threshold to create alarms
        enabled: false, // Note: this one requires both `enabled: true` and `Threshold: someValue` to be effectively enabled
        Threshold: null,
        Statistic: 'Sum'
      },
      IteratorAge: {
        Threshold: 10000,
        Statistic: 'Maximum'
      }
    },
    ApiGateway: { // API Gateway REST APIs
      '5XXError': {
        Statistic: 'Average',
        Threshold: 0
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
    States: { // Step Functions
      Statistic: 'Sum',
      ExecutionThrottled: {
        Threshold: 0
      },
      ExecutionsFailed: {
        Threshold: 0
      },
      ExecutionsTimedOut: {
        Threshold: 0
      }
    },
    DynamoDB: {
      // Consumed read/write capacity units are not alarmed. These should either
      // be part of an auto-scaling configuration for provisioned mode or should be automatically
      // avoided for on-demand mode. Instead, we rely on persistent throttling
      // to alert failures in these scenarios.
      // Throttles can occur in normal operation and are handled with retries. Threshold should
      // therefore be configured to provide meaningful alarms based on higher than average throttling.
      Statistic: 'Sum',
      ReadThrottleEvents: {
        Threshold: 10
      },
      WriteThrottleEvents: {
        Threshold: 10
      },
      UserErrors: {
        Threshold: 0
      },
      SystemErrors: {
        Threshold: 0
      }
    },
    Kinesis: {
      'GetRecords.IteratorAgeMilliseconds': {
        Statistic: 'Maximum',
        Threshold: 10000
      },
      ReadProvisionedThroughputExceeded: {
        Statistic: 'Sum',
        Threshold: 0
      },
      WriteProvisionedThroughputExceeded: {
        Statistic: 'Sum',
        Threshold: 0
      },
      'PutRecord.Success': {
        ComparisonOperator: 'LessThanThreshold',
        Statistic: 'Average',
        Threshold: 1
      },
      'PutRecords.Success': {
        ComparisonOperator: 'LessThanThreshold',
        Statistic: 'Average',
        Threshold: 1
      },
      'GetRecords.Success': {
        ComparisonOperator: 'LessThanThreshold',
        Statistic: 'Average',
        Threshold: 1
      }
    },
    SQS: {
      // approximate age of the oldest message in the queue above threshold: messages aren't processed fast enough
      AgeOfOldestMessage: {
        Statistic: 'Maximum',
        enabled: false, // Note: this one requires both `enabled: true` and `Threshold: someValue` to be effectively enabled
        Threshold: null
      },
      // approximate number of messages in flight above threshold (in percentage of hard limit: 120000 for regular queues and 18000 for FIFO queues)
      InFlightMessagesPc: {
        Statistic: 'Maximum',
        Threshold: 80 // 80% of 120000 for regular queues or 80% of 18000 for FIFO queues
      }
    },
    ECS: {
      MemoryUtilization: {
        Statistic: 'Average',
        Threshold: 90
      },
      CPUUtilization: {
        Statistic: 'Average',
        Threshold: 90
      }
    },
    SNS: {
      'NumberOfNotificationsFilteredOut-InvalidAttributes': {
        Statistic: 'Sum',
        Threshold: 1
      },
      NumberOfNotificationsFailed: {
        Statistic: 'Sum',
        Threshold: 1
      }
    },
    Events: {
      // EventBridge
      FailedInvocations: {
        Statistic: 'Sum',
        Threshold: 1
      },
      ThrottledRules: {
        Statistic: 'Sum',
        Threshold: 1
      }
    },
    ApplicationELB: {
      // Application Load Balancer
      HTTPCode_ELB_5XX_Count: {
        Statistic: 'Sum',
        Threshold: 0
      },
      RejectedConnectionCount: {
        Statistic: 'Sum',
        Threshold: 0
      }
    },
    ApplicationELBTarget: {
      HTTPCode_Target_5XX_Count: {
        Statistic: 'Sum',
        Threshold: 0
      },
      UnHealthyHostCount: {
        Statistic: 'Average',
        Threshold: 0
      },
      LambdaInternalError: {
        Statistic: 'Sum',
        Threshold: 0
      },
      LambdaUserError: {
        Statistic: 'Sum',
        Threshold: 0
      }
    },
    AppSync: {
      // AppSync
      '5XXError': {
        Statistic: 'Sum',
        Threshold: 0
      },
      Latency: {
        Statistic: 'Average',
        Threshold: 0
      }
    }
  } as SlicWatchAlarmProperties,
  dashboard: {
    enabled: true,
    timeRange: {
      // For possible 'start' and 'end' values, see
      // https:# docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/CloudWatch-Dashboard-Body-Structure.html
      start: '-PT3H'
    },
    widgets: {
      metricPeriod: 300,
      width: 8,
      height: 6,
      yAxis: 'left',
      Lambda: {
        // Metrics per Lambda Function
        Errors: {
          Statistic: ['Sum']
        },
        Throttles: {
          Statistic: ['Sum']
        },
        Duration: {
          Statistic: ['Average', 'p95', 'Maximum']
        },
        Invocations: {
          Statistic: ['Sum']
        },
        ConcurrentExecutions: {
          Statistic: ['Maximum']
        },
        IteratorAge: {
          Statistic: ['Maximum']
        }
      },
      ApiGateway: {
        '5XXError': {
          Statistic: ['Sum']
        },
        '4XXError': {
          Statistic: ['Sum']
        },
        Latency: {
          Statistic: ['Average', 'p95']
        },
        Count: {
          Statistic: ['Sum']
        }
      },
      States: {
        // Step Functions
        ExecutionsFailed: {
          Statistic: ['Sum']
        },
        ExecutionThrottled: {
          Statistic: ['Sum']
        },
        ExecutionsTimedOut: {
          Statistic: ['Sum']
        }
      },
      DynamoDB: {
        // Tables and GSIs
        ReadThrottleEvents: {
          Statistic: ['Sum']
        },
        WriteThrottleEvents: {
          Statistic: ['Sum']
        }
      },
      Kinesis: {
        // Kinesis Data Streams
        'GetRecords.IteratorAgeMilliseconds': {
          Statistic: ['Maximum']
        },
        ReadProvisionedThroughputExceeded: {
          Statistic: ['Sum']
        },
        WriteProvisionedThroughputExceeded: {
          Statistic: ['Sum']
        },
        'PutRecord.Success': {
          Statistic: ['Average']
        },
        'PutRecords.Success': {
          Statistic: ['Average']
        },
        'GetRecords.Success': {
          Statistic: ['Average']
        }
      },
      SQS: {
        // SQS Queues
        NumberOfMessagesSent: {
          Statistic: ['Sum']
        },
        NumberOfMessagesReceived: {
          Statistic: ['Sum']
        },
        NumberOfMessagesDeleted: {
          Statistic: ['Sum']
        },
        ApproximateAgeOfOldestMessage: {
          Statistic: ['Maximum']
        },
        ApproximateNumberOfMessagesVisible: {
          Statistic: ['Maximum']
        }
      },
      ECS: {
        MemoryUtilization: {
          Statistic: ['Average']
        },
        CPUUtilization: {
          Statistic: ['Average']
        }
      },
      SNS: {
        'NumberOfNotificationsFilteredOut-InvalidAttributes': {
          Statistic: ['Sum']
        },
        NumberOfNotificationsFailed: {
          Statistic: ['Sum']
        }
      },
      Events: {
        // EventBridge
        FailedInvocations: {
          Statistic: ['Sum']
        },
        ThrottledRules: {
          Statistic: ['Sum']
        },
        Invocations: {
          Statistic: ['Sum']
        }
      },
      ApplicationELB: {
        // Application Load Balancer
        HTTPCode_ELB_5XX_Count: {
          Statistic: ['Sum']
        },
        RejectedConnectionCount: {
          Statistic: ['Sum']
        }
      },
      ApplicationELBTarget: {
        HTTPCode_Target_5XX_Count: {
          Statistic: ['Sum']
        },
        UnHealthyHostCount: {
          Statistic: ['Average']
        },
        LambdaInternalError: {
          Statistic: ['Sum']
        },
        LambdaUserError: {
          Statistic: ['Sum']
        }
      },
      AppSync: {
        // AppSync
        '5XXError': {
          Statistic: ['Sum']
        },
        '4XXError': {
          Statistic: ['Sum']
        },
        Latency: {
          Statistic: ['Average'],
          yAxis: 'right'
        },
        Requests: {
          Statistic: ['Maximum']
        },
        ConnectServerError: {
          Statistic: ['Sum']
        },
        DisconnectServerError: {
          Statistic: ['Sum']
        },
        SubscribeServerError: {
          Statistic: ['Sum']
        },
        UnsubscribeServerError: {
          Statistic: ['Sum']
        },
        PublishDataMessageServerError: {
          Statistic: ['Sum']
        }
      }
    }
  } as AllDashboardConfig
}

export default defaultConfig
