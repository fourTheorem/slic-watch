export type DashboardConfig = {
  enabled: boolean
  timeRange: object
  widgets: Widgets
  dashConfig?: DashConfig
}

type DashConfig = {
  enabled: boolean
  metricPeriod: object
  width: number
  height: number
  yAxis: string
  Statistic?: string[]
}

export type Widgets = LambdaDashConfig & ApiGwDashConfig & SfDashConfig & DynamoDbDashConfig & KinesisDashConfig & SqsDashConfig
& EcsDashConfig & SnsDashConfig & RuleDashConfig & AlbDashConfig & AlbTargetDashConfig & AppSyncDashConfig

export type LambdaDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig 
  Errors: DashConfig
  Throttles: DashConfig
  Duration: DashConfig
  Invocations: DashConfig
  ConcurrentExecutions: DashConfig
  IteratorAge: DashConfig
} 

export type ApiGwDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  '5XXError': DashConfig 
  '4XXError': DashConfig
  Latency: DashConfig
  Count: DashConfig
}

export type SfDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  ExecutionsFailed: DashConfig 
  ExecutionThrottled: DashConfig
  ExecutionsTimedOut: DashConfig
}

export type DynamoDbDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  ReadThrottleEvents: DashConfig 
  WriteThrottleEvents: DashConfig
}

export type KinesisDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  'GetRecords.IteratorAgeMilliseconds': DashConfig 
  ReadProvisionedThroughputExceeded: DashConfig
  WriteProvisionedThroughputExceeded: DashConfig
  'PutRecord.Success': DashConfig 
  'PutRecords.Success': DashConfig
  'GetRecords.Success': DashConfig
}

export type SqsDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  NumberOfMessagesSent: DashConfig 
  NumberOfMessagesReceived: DashConfig
  NumberOfMessagesDeleted: DashConfig
  ApproximateAgeOfOldestMessage: DashConfig 
  ApproximateNumberOfMessagesVisible: DashConfig
}

export type EcsDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  MemoryUtilization: DashConfig 
  CPUUtilization: DashConfig
}

export type SnsDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  'NumberOfNotificationsFilteredOut-InvalidAttributes': DashConfig 
  NumberOfNotificationsFailed: DashConfig
}

export type RuleDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  FailedInvocations: DashConfig 
  ThrottledRules: DashConfig
  Invocations: DashConfig
}

export type AlbDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  HTTPCode_ELB_5XX_Count: DashConfig 
  RejectedConnectionCount: DashConfig
}

export type AlbTargetDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
  HTTPCode_Target_5XX_Count: DashConfig 
  UnHealthyHostCount: DashConfig
  LambdaInternalError: DashConfig 
  LambdaUserError: DashConfig
}

export type AppSyncDashConfig = {
  enabled: boolean
  timeRange
  widgets
  dashcConfig: DashConfig  
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




