import { ConfigType } from './config-types'

export type MetricSurface = 'alarm' | 'widget'

interface MetricNames {
  alarm?: string
  widget?: string
}

type ServiceMetricRegistry = Record<string, MetricNames>

export const metricRegistryByConfigType: Record<ConfigType, ServiceMetricRegistry> = {
  [ConfigType.Lambda]: {
    Errors: { alarm: 'Errors', widget: 'Errors' },
    Throttles: { alarm: 'ThrottlesPc', widget: 'Throttles' },
    Duration: { alarm: 'DurationPc', widget: 'Duration' },
    Invocations: { alarm: 'Invocations', widget: 'Invocations' },
    ConcurrentExecutions: { widget: 'ConcurrentExecutions' },
    IteratorAge: { alarm: 'IteratorAge', widget: 'IteratorAge' }
  },
  [ConfigType.ApiGateway]: {
    '5XXError': { alarm: '5XXError', widget: '5XXError' },
    '4XXError': { alarm: '4XXError', widget: '4XXError' },
    Latency: { alarm: 'Latency', widget: 'Latency' },
    Count: { widget: 'Count' }
  },
  [ConfigType.States]: {
    ExecutionThrottled: { alarm: 'ExecutionThrottled', widget: 'ExecutionThrottled' },
    ExecutionsFailed: { alarm: 'ExecutionsFailed', widget: 'ExecutionsFailed' },
    ExecutionsTimedOut: { alarm: 'ExecutionsTimedOut', widget: 'ExecutionsTimedOut' }
  },
  [ConfigType.DynamoDB]: {
    ReadThrottleEvents: { alarm: 'ReadThrottleEvents', widget: 'ReadThrottleEvents' },
    WriteThrottleEvents: { alarm: 'WriteThrottleEvents', widget: 'WriteThrottleEvents' },
    UserErrors: { alarm: 'UserErrors' },
    SystemErrors: { alarm: 'SystemErrors' }
  },
  [ConfigType.Kinesis]: {
    'GetRecords.IteratorAgeMilliseconds': { alarm: 'GetRecords.IteratorAgeMilliseconds', widget: 'GetRecords.IteratorAgeMilliseconds' },
    ReadProvisionedThroughputExceeded: { alarm: 'ReadProvisionedThroughputExceeded', widget: 'ReadProvisionedThroughputExceeded' },
    WriteProvisionedThroughputExceeded: { alarm: 'WriteProvisionedThroughputExceeded', widget: 'WriteProvisionedThroughputExceeded' },
    'PutRecord.Success': { alarm: 'PutRecord.Success', widget: 'PutRecord.Success' },
    'PutRecords.Success': { alarm: 'PutRecords.Success', widget: 'PutRecords.Success' },
    'GetRecords.Success': { alarm: 'GetRecords.Success', widget: 'GetRecords.Success' }
  },
  [ConfigType.SQS]: {
    AgeOfOldestMessage: { alarm: 'AgeOfOldestMessage' },
    InFlightMessages: { alarm: 'InFlightMessagesPc' },
    NumberOfMessagesSent: { widget: 'NumberOfMessagesSent' },
    NumberOfMessagesReceived: { widget: 'NumberOfMessagesReceived' },
    NumberOfMessagesDeleted: { widget: 'NumberOfMessagesDeleted' },
    ApproximateAgeOfOldestMessage: { widget: 'ApproximateAgeOfOldestMessage' },
    ApproximateNumberOfMessagesVisible: { widget: 'ApproximateNumberOfMessagesVisible' }
  },
  [ConfigType.ECS]: {
    MemoryUtilization: { alarm: 'MemoryUtilization', widget: 'MemoryUtilization' },
    CPUUtilization: { alarm: 'CPUUtilization', widget: 'CPUUtilization' }
  },
  [ConfigType.SNS]: {
    'NumberOfNotificationsFilteredOut-InvalidAttributes': { alarm: 'NumberOfNotificationsFilteredOut-InvalidAttributes', widget: 'NumberOfNotificationsFilteredOut-InvalidAttributes' },
    NumberOfNotificationsFailed: { alarm: 'NumberOfNotificationsFailed', widget: 'NumberOfNotificationsFailed' }
  },
  [ConfigType.Events]: {
    FailedInvocations: { alarm: 'FailedInvocations', widget: 'FailedInvocations' },
    ThrottledRules: { alarm: 'ThrottledRules', widget: 'ThrottledRules' },
    Invocations: { widget: 'Invocations' }
  },
  [ConfigType.ApplicationELB]: {
    HTTPCode_ELB_5XX_Count: { alarm: 'HTTPCode_ELB_5XX_Count', widget: 'HTTPCode_ELB_5XX_Count' },
    RejectedConnectionCount: { alarm: 'RejectedConnectionCount', widget: 'RejectedConnectionCount' }
  },
  [ConfigType.ApplicationELBTarget]: {
    HTTPCode_Target_5XX_Count: { alarm: 'HTTPCode_Target_5XX_Count', widget: 'HTTPCode_Target_5XX_Count' },
    UnHealthyHostCount: { alarm: 'UnHealthyHostCount', widget: 'UnHealthyHostCount' },
    LambdaInternalError: { alarm: 'LambdaInternalError', widget: 'LambdaInternalError' },
    LambdaUserError: { alarm: 'LambdaUserError', widget: 'LambdaUserError' }
  },
  [ConfigType.AppSync]: {
    '5XXError': { alarm: '5XXError', widget: '5XXError' },
    '4XXError': { widget: '4XXError' },
    Latency: { alarm: 'Latency', widget: 'Latency' },
    Requests: { widget: 'Requests' },
    ConnectServerError: { widget: 'ConnectServerError' },
    DisconnectServerError: { widget: 'DisconnectServerError' },
    SubscribeServerError: { widget: 'SubscribeServerError' },
    UnsubscribeServerError: { widget: 'UnsubscribeServerError' },
    PublishDataMessageServerError: { widget: 'PublishDataMessageServerError' }
  },
  [ConfigType.S3]: {
    FirstByteLatency: { alarm: 'FirstByteLatency', widget: 'FirstByteLatency' },
    HeadRequests: { alarm: 'HeadRequests', widget: 'HeadRequests' },
    '5xxErrors': { alarm: '5xxErrors', widget: '5xxErrors' },
    '4xxErrors': { alarm: '4xxErrors', widget: '4xxErrors' },
    TotalRequestLatency: { alarm: 'TotalRequestLatency', widget: 'TotalRequestLatency' },
    AllRequests: { alarm: 'AllRequests', widget: 'AllRequests' }
  }
}

export function getSupportedMetricNames (surface: MetricSurface): Record<ConfigType, string[]> {
  return Object.fromEntries(
    Object.entries(metricRegistryByConfigType).map(([configType, metrics]) => [
      configType,
      Object.values(metrics).flatMap((metricNames) => metricNames[surface] != null ? [metricNames[surface]] : [])
    ])
  ) as Record<ConfigType, string[]>
}
