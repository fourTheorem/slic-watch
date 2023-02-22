import { Widgets } from '../inputs/cascading-config'
import { Statistic } from '../cf-template'
import FunctionProperties from 'cloudform-types/types/lambda/function'

export type YAxis = 'left' | 'right'

export type DashboardConfig = {
  ActionsEnabled?: boolean
  widgets?: Widgets
}

export type DashboardBodyProperties = {
  ActionsEnabled?: boolean
  metricPeriod?: number
  width?: number
  height?: number
  yAxis?: YAxis
  Statistic?: Statistic[]
}

export type ServiceDashConfig = {
  DashboardBodyProperties?: DashboardBodyProperties
  widgets?: Widgets
}

export type LambdaDashboardBodyProperties = {
  Errors: DashboardBodyProperties
  Throttles: DashboardBodyProperties
  Duration: DashboardBodyProperties
  Invocations: DashboardBodyProperties
  ConcurrentExecutions: DashboardBodyProperties
  IteratorAge: DashboardBodyProperties
}

export type ApiGwDashboardBodyProperties = {
  '5XXError': DashboardBodyProperties
  '4XXError': DashboardBodyProperties
  Latency: DashboardBodyProperties
  Count: DashboardBodyProperties
}

export type SfDashboardBodyProperties = {
  ExecutionsFailed: DashboardBodyProperties
  ExecutionThrottled: DashboardBodyProperties
  ExecutionsTimedOut: DashboardBodyProperties
}

export type DynamoDbDashboardBodyProperties = {
  ReadThrottleEvents: DashboardBodyProperties
  WriteThrottleEvents: DashboardBodyProperties
}

export type KinesisDashboardBodyProperties = {
  'GetRecords.IteratorAgeMilliseconds': DashboardBodyProperties
  ReadProvisionedThroughputExceeded: DashboardBodyProperties
  WriteProvisionedThroughputExceeded: DashboardBodyProperties
  'PutRecord.Success': DashboardBodyProperties
  'PutRecords.Success': DashboardBodyProperties
  'GetRecords.Success': DashboardBodyProperties
}

export type SqsDashboardBodyProperties = {
  NumberOfMessagesSent: DashboardBodyProperties
  NumberOfMessagesReceived: DashboardBodyProperties
  NumberOfMessagesDeleted: DashboardBodyProperties
  ApproximateAgeOfOldestMessage: DashboardBodyProperties
  ApproximateNumberOfMessagesVisible: DashboardBodyProperties
}

export type EcsDashboardBodyProperties = {
  ActionsEnabled?: boolean
  MemoryUtilization: DashboardBodyProperties
  CPUUtilization: DashboardBodyProperties
}

export type SnsDashboardBodyProperties = {
  'NumberOfNotificationsFilteredOut-InvalidAttributes': DashboardBodyProperties
  NumberOfNotificationsFailed: DashboardBodyProperties
}

export type RuleDashboardBodyProperties = {
  FailedInvocations: DashboardBodyProperties
  ThrottledRules: DashboardBodyProperties
  Invocations: DashboardBodyProperties
}

export type AlbDashboardBodyProperties = {
  HTTPCode_ELB_5XX_Count: DashboardBodyProperties
  RejectedConnectionCount: DashboardBodyProperties
}

export type AlbTargetDashboardBodyProperties = {
  HTTPCode_Target_5XX_Count: DashboardBodyProperties
  UnHealthyHostCount: DashboardBodyProperties
  LambdaInternalError: DashboardBodyProperties
  LambdaUserError: DashboardBodyProperties
}

export type AppSyncDashboardBodyProperties = {
  '5XXError': DashboardBodyProperties
  '4XXError': DashboardBodyProperties
  Latency: DashboardBodyProperties
  Requests: DashboardBodyProperties
  ConnectServerError: DashboardBodyProperties
  DisconnectServerError: DashboardBodyProperties
  SubscribeServerError: DashboardBodyProperties
  UnsubscribeServerError: DashboardBodyProperties
  PublishDataMessageServerError: DashboardBodyProperties
}

// Lambda resources

export type FunctionResources = {
  Type: string
  Properties: FunctionProperties
  DependsOn: string[]
}

export type FunctionDashboardConfigs = {
  HelloLambdaFunction?: FunctionResources
  PingLambdaFunction?: FunctionResources
  ThrottlerLambdaFunction?: FunctionResources
  DriveStreamLambdaFunction?: FunctionResources
  DriveQueueLambdaFunction?: FunctionResources
  DriveTableLambdaFunction?: FunctionResources
  StreamProcessorLambdaFunction?: FunctionResources
  HttpGetterLambdaFunction?: FunctionResources
  SubscriptionHandlerLambdaFunction?: FunctionResources
  EventsRuleLambdaFunction?: FunctionResources
  AlbEventLambdaFunction?: FunctionResources
}
