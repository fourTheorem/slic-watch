import { dashboard } from 'slic-watch-core/dashboard';
import { Widgets } from './cascading-config'

export type DashboardConfig = {
  enabled?: boolean
  timeRange?
  widgets?: Widgets
  dashConfig?: DashConfig
}

type DashConfig = {
  enabled?: boolean
  metricPeriod?: object
  width?: number
  height?: number
  yAxis?: string
  Statistic?: string[]
}

// export type Widgets = LambdaDashConfig & ApiGwDashConfig & SfDashConfig & DynamoDbDashConfig & KinesisDashConfig & SqsDashConfig
// & EcsDashConfig & SnsDashConfig & RuleDashConfig & AlbDashConfig & AlbTargetDashConfig & AppSyncDashConfig

export type LambdaDashConfig = {
  enabled?: boolean
  Errors: DashConfig
  Throttles: DashConfig
  Duration: DashConfig
  Invocations: DashConfig
  ConcurrentExecutions: DashConfig
  IteratorAge: DashConfig
} 

export type ApiGwDashConfig = {
  enabled?: boolean
  '5XXError': DashConfig 
  '4XXError': DashConfig
  Latency: DashConfig
  Count: DashConfig
}

export type SfDashConfig = {
  enabled?: boolean
  ExecutionsFailed: DashConfig 
  ExecutionThrottled: DashConfig
  ExecutionsTimedOut: DashConfig
}

export type DynamoDbDashConfig = {
  enabled?: boolean
  ReadThrottleEvents: DashConfig 
  WriteThrottleEvents: DashConfig
}

export type KinesisDashConfig = {
  enabled?: boolean
  'GetRecords.IteratorAgeMilliseconds': DashConfig 
  ReadProvisionedThroughputExceeded: DashConfig
  WriteProvisionedThroughputExceeded: DashConfig
  'PutRecord.Success': DashConfig 
  'PutRecords.Success': DashConfig
  'GetRecords.Success': DashConfig
}

export type SqsDashConfig = {
  enabled?: boolean
  NumberOfMessagesSent: DashConfig 
  NumberOfMessagesReceived: DashConfig
  NumberOfMessagesDeleted: DashConfig
  ApproximateAgeOfOldestMessage: DashConfig 
  ApproximateNumberOfMessagesVisible: DashConfig
}

export type EcsDashConfig = {
  enabled?: boolean
  MemoryUtilization: DashConfig 
  CPUUtilization: DashConfig
}

export type SnsDashConfig = {
  enabled?: boolean
  'NumberOfNotificationsFilteredOut-InvalidAttributes': DashConfig 
  NumberOfNotificationsFailed: DashConfig
}

export type RuleDashConfig = {
  enabled?: boolean
  FailedInvocations: DashConfig 
  ThrottledRules: DashConfig
  Invocations: DashConfig
}

export type AlbDashConfig = {
  enabled?: boolean 
  HTTPCode_ELB_5XX_Count: DashConfig 
  RejectedConnectionCount: DashConfig
}

export type AlbTargetDashConfig = {
  enabled?: boolean
  HTTPCode_Target_5XX_Count: DashConfig 
  UnHealthyHostCount: DashConfig
  LambdaInternalError: DashConfig 
  LambdaUserError: DashConfig
}

export type AppSyncDashConfig = {
  enabled?: boolean
  '5XXError': DashConfig 
  '4XXError': DashConfig
  Latency: DashConfig 
  Requests: DashConfig
  ConnectServerError: DashConfig 
  DisconnectServerError: DashConfig
  SubscribeServerError: DashConfig 
  UnsubscribeServerError: DashConfig
  PublishDataMessageServerError: DashConfig 
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
  Properties: {
    Code: object
    Handler: string
    Runtime: string
    FunctionName: string
    MemorySize: number
    Timeout: number
    Role: object
    ReservedConcurrentExecutions?: number
  }
  DependsOn: string[]
}

export type ApiResources = {
  Type: string
}




