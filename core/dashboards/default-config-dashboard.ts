import { Widgets } from '../inputs/cascading-config'
import { Statistic } from '../cf-template'
import FunctionProperties from 'cloudform-types/types/lambda/function'

export type YAxis = 'left' | 'right'

export type DashboardConfig = {
  ActionsEnabled?: boolean
  widgets?: Widgets
}

export type DashProperties = {
  ActionsEnabled?: boolean
  metricPeriod?: number
  width?: number
  height?: number
  yAxis?: YAxis
  Statistic?: Statistic[] 
}

export type ServiceDashConfig = {
  DashProperties?: DashProperties
  widgets?: Widgets
}

export type LambdaDashProperties = {
  Errors: DashProperties
  Throttles: DashProperties
  Duration: DashProperties
  Invocations: DashProperties
  ConcurrentExecutions: DashProperties
  IteratorAge: DashProperties
} 

export type ApiGwDashProperties = {
  '5XXError': DashProperties 
  '4XXError': DashProperties
  Latency: DashProperties
  Count: DashProperties
}

export type SfDashProperties = {
  ExecutionsFailed: DashProperties 
  ExecutionThrottled: DashProperties
  ExecutionsTimedOut: DashProperties
}

export type DynamoDbDashProperties = {
  ReadThrottleEvents: DashProperties 
  WriteThrottleEvents: DashProperties
}

export type KinesisDashProperties = {
  'GetRecords.IteratorAgeMilliseconds': DashProperties 
  ReadProvisionedThroughputExceeded: DashProperties
  WriteProvisionedThroughputExceeded: DashProperties
  'PutRecord.Success': DashProperties 
  'PutRecords.Success': DashProperties
  'GetRecords.Success': DashProperties
}

export type SqsDashProperties = {
  NumberOfMessagesSent: DashProperties 
  NumberOfMessagesReceived: DashProperties
  NumberOfMessagesDeleted: DashProperties
  ApproximateAgeOfOldestMessage: DashProperties 
  ApproximateNumberOfMessagesVisible: DashProperties
}

export type EcsDashProperties = {
  ActionsEnabled?: boolean
  MemoryUtilization: DashProperties 
  CPUUtilization: DashProperties
}

export type SnsDashProperties = {
  'NumberOfNotificationsFilteredOut-InvalidAttributes': DashProperties 
  NumberOfNotificationsFailed: DashProperties
}

export type RuleDashProperties = {
  FailedInvocations: DashProperties 
  ThrottledRules: DashProperties
  Invocations: DashProperties
}

export type AlbDashProperties = {
  HTTPCode_ELB_5XX_Count: DashProperties 
  RejectedConnectionCount: DashProperties
}

export type AlbTargetDashProperties = {
  HTTPCode_Target_5XX_Count: DashProperties 
  UnHealthyHostCount: DashProperties
  LambdaInternalError: DashProperties 
  LambdaUserError: DashProperties
}

export type AppSyncDashProperties = {
  '5XXError': DashProperties 
  '4XXError': DashProperties
  Latency: DashProperties 
  Requests: DashProperties
  ConnectServerError: DashProperties 
  DisconnectServerError: DashProperties
  SubscribeServerError: DashProperties 
  UnsubscribeServerError: DashProperties
  PublishDataMessageServerError: DashProperties 
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

// Lambda resources

export type FunctionResources = {
  Type: string
  Properties: FunctionProperties
  DependsOn: string[]
}


