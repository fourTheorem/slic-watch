import type { Widget } from 'cloudwatch-dashboard-types'
import { type ConfigType } from '../inputs/config-types'

export type YAxisPos = 'left' | 'right'

interface TimeRange {
  start: string
  end?: string
}

export interface MetricDefs {
  namespace: string
  metric: string
  dimensions: Record<string, string>
  stat: string
  yAxis?: YAxisPos
}

export interface WidgetWithSize extends Omit<Widget, 'width' | 'height'> {
  width: number
  height: number
}

export interface WidgetMetricProperties {
  enabled: boolean
  metricPeriod: number
  width: number
  height: number
  yAxis: YAxisPos
  Statistic: string[]
}

export interface Widgets extends WidgetMetricProperties {
  [ConfigType.Lambda]: LambdaDashboardProperties
  [ConfigType.ApiGateway]: ApiGwDashboardProperties
  [ConfigType.States]: SfDashboardProperties
  [ConfigType.DynamoDB]: DynamoDbDashboardProperties
  [ConfigType.Kinesis]: KinesisDashboardProperties
  [ConfigType.SQS]: SqsDashboardProperties
  [ConfigType.ECS]: EcsDashboardProperties
  [ConfigType.SNS]: SnsDashboardProperties
  [ConfigType.Events]: RuleDashboardProperties
  [ConfigType.ApplicationELB]: AlbDashboardProperties
  [ConfigType.ApplicationELBTarget]: AlbTargetDashboardProperties
  [ConfigType.AppSync]: AppSyncDashboardProperties
  [ConfigType.S3]: S3DashboardProperties
}

type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R> ? Array<NestedPartial<R>> : NestedPartial<T[K]>
}

export interface SlicWatchDashboardConfig extends WidgetMetricProperties {
  timeRange: TimeRange
  widgets: Widgets
}

export type SlicWatchInputDashboardConfig = NestedPartial<SlicWatchDashboardConfig>

export interface LambdaDashboardProperties extends WidgetMetricProperties {
  Errors: WidgetMetricProperties
  Throttles: WidgetMetricProperties
  Duration: WidgetMetricProperties
  Invocations: WidgetMetricProperties
  ConcurrentExecutions: WidgetMetricProperties
  IteratorAge: WidgetMetricProperties
}

export interface ApiGwDashboardProperties extends WidgetMetricProperties {
  '5XXError': WidgetMetricProperties
  '4XXError': WidgetMetricProperties
  Latency: WidgetMetricProperties
  Count: WidgetMetricProperties
}

export interface SfDashboardProperties extends WidgetMetricProperties {
  ExecutionsFailed: WidgetMetricProperties
  ExecutionThrottled: WidgetMetricProperties
  ExecutionsTimedOut: WidgetMetricProperties
}

export interface DynamoDbDashboardProperties extends WidgetMetricProperties {
  ReadThrottleEvents: WidgetMetricProperties
  WriteThrottleEvents: WidgetMetricProperties
}

export interface KinesisDashboardProperties extends WidgetMetricProperties {
  'GetRecords.IteratorAgeMilliseconds': WidgetMetricProperties
  ReadProvisionedThroughputExceeded: WidgetMetricProperties
  WriteProvisionedThroughputExceeded: WidgetMetricProperties
  'PutRecord.Success': WidgetMetricProperties
  'PutRecords.Success': WidgetMetricProperties
  'GetRecords.Success': WidgetMetricProperties
}

export interface SqsDashboardProperties extends WidgetMetricProperties {
  NumberOfMessagesSent: WidgetMetricProperties
  NumberOfMessagesReceived: WidgetMetricProperties
  NumberOfMessagesDeleted: WidgetMetricProperties
  ApproximateAgeOfOldestMessage: WidgetMetricProperties
  ApproximateNumberOfMessagesVisible: WidgetMetricProperties
}

export interface EcsDashboardProperties extends WidgetMetricProperties {
  MemoryUtilization: WidgetMetricProperties
  CPUUtilization: WidgetMetricProperties
}

export interface SnsDashboardProperties extends WidgetMetricProperties {
  'NumberOfNotificationsFilteredOut-InvalidAttributes': WidgetMetricProperties
  NumberOfNotificationsFailed: WidgetMetricProperties
}

export interface RuleDashboardProperties extends WidgetMetricProperties {
  FailedInvocations: WidgetMetricProperties
  ThrottledRules: WidgetMetricProperties
  Invocations: WidgetMetricProperties
}

export interface AlbDashboardProperties extends WidgetMetricProperties {
  HTTPCode_ELB_5XX_Count: WidgetMetricProperties
  RejectedConnectionCount: WidgetMetricProperties
}

export interface AlbTargetDashboardProperties extends WidgetMetricProperties {
  HTTPCode_Target_5XX_Count: WidgetMetricProperties
  UnHealthyHostCount: WidgetMetricProperties
  LambdaInternalError: WidgetMetricProperties
  LambdaUserError: WidgetMetricProperties
}

export interface AppSyncDashboardProperties extends WidgetMetricProperties {
  '5XXError': WidgetMetricProperties
  '4XXError': WidgetMetricProperties
  Latency: WidgetMetricProperties
  Requests: WidgetMetricProperties
  ConnectServerError: WidgetMetricProperties
  DisconnectServerError: WidgetMetricProperties
  SubscribeServerError: WidgetMetricProperties
  UnsubscribeServerError: WidgetMetricProperties
  PublishDataMessageServerError: WidgetMetricProperties
}

export interface S3DashboardProperties extends WidgetMetricProperties {
  FirstByteLatency: WidgetMetricProperties
  HeadRequests: WidgetMetricProperties
  '5xxErrors': WidgetMetricProperties
  '4xxErrors': WidgetMetricProperties
  TotalRequestLatency: WidgetMetricProperties
  AllRequests: WidgetMetricProperties
}
