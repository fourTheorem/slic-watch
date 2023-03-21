'use strict'

import { type Widgets } from '../inputs/cascading-config'
import type FunctionProperties from 'cloudform-types/types/lambda/function'

export type YAxis = 'left' | 'right'

export interface AllDashboardConfig {
  enabled?: boolean
  widgets: Widgets
}

export interface DashboardBodyProperties {
  enabled?: boolean
  metricPeriod?: number
  width?: number
  height?: number
  yAxis?: string
  Statistic?: string[]
}

export interface ServiceDashConfig {
  DashboardBodyProperties?: DashboardBodyProperties
  widgets?: Widgets
}

export interface LambdaDashboardBodyProperties {
  Errors: DashboardBodyProperties
  Throttles: DashboardBodyProperties
  Duration: DashboardBodyProperties
  Invocations: DashboardBodyProperties
  ConcurrentExecutions: DashboardBodyProperties
  IteratorAge: DashboardBodyProperties
}

export interface ApiGwDashboardBodyProperties {
  '5XXError': DashboardBodyProperties
  '4XXError': DashboardBodyProperties
  Latency: DashboardBodyProperties
  Count: DashboardBodyProperties
}

export interface SfDashboardBodyProperties {
  ExecutionsFailed: DashboardBodyProperties
  ExecutionThrottled: DashboardBodyProperties
  ExecutionsTimedOut: DashboardBodyProperties
}

export interface DynamoDbDashboardBodyProperties {
  ReadThrottleEvents: DashboardBodyProperties
  WriteThrottleEvents: DashboardBodyProperties
}

export interface KinesisDashboardBodyProperties {
  'GetRecords.IteratorAgeMilliseconds': DashboardBodyProperties
  ReadProvisionedThroughputExceeded: DashboardBodyProperties
  WriteProvisionedThroughputExceeded: DashboardBodyProperties
  'PutRecord.Success': DashboardBodyProperties
  'PutRecords.Success': DashboardBodyProperties
  'GetRecords.Success': DashboardBodyProperties
}

export interface SqsDashboardBodyProperties {
  NumberOfMessagesSent: DashboardBodyProperties
  NumberOfMessagesReceived: DashboardBodyProperties
  NumberOfMessagesDeleted: DashboardBodyProperties
  ApproximateAgeOfOldestMessage: DashboardBodyProperties
  ApproximateNumberOfMessagesVisible: DashboardBodyProperties
}

export interface EcsDashboardBodyProperties {
  enabled?: boolean
  MemoryUtilization: DashboardBodyProperties
  CPUUtilization: DashboardBodyProperties
}

export interface SnsDashboardBodyProperties {
  'NumberOfNotificationsFilteredOut-InvalidAttributes': DashboardBodyProperties
  NumberOfNotificationsFailed: DashboardBodyProperties
}

export interface RuleDashboardBodyProperties {
  FailedInvocations: DashboardBodyProperties
  ThrottledRules: DashboardBodyProperties
  Invocations: DashboardBodyProperties
}

export interface AlbDashboardBodyProperties {
  HTTPCode_ELB_5XX_Count: DashboardBodyProperties
  RejectedConnectionCount: DashboardBodyProperties
}

export interface AlbTargetDashboardBodyProperties {
  HTTPCode_Target_5XX_Count: DashboardBodyProperties
  UnHealthyHostCount: DashboardBodyProperties
  LambdaInternalError: DashboardBodyProperties
  LambdaUserError: DashboardBodyProperties
}

export interface AppSyncDashboardBodyProperties {
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

export interface FunctionResources {
  Type: string
  Properties: FunctionProperties
  DependsOn: string[]
}

export interface FunctionDashboardConfigs {
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
