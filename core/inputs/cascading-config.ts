'use strict'

import type { AlbAlarmProperties } from '../alarms/alb'
import type { AlbTargetAlarmProperties } from '../alarms/alb-target-group'
import type { ApiGwAlarmProperties } from '../alarms/api-gateway'
import type { AppSyncAlarmProperties } from '../alarms/appsync'
import type { DynamoDbAlarmProperties } from '../alarms/dynamodb'
import type { EcsAlarmsConfig } from '../alarms/ecs'
import type { EventsAlarmsConfig } from '../alarms/eventbridge'
import type { KinesisAlarmProperties } from '../alarms/kinesis'
import type { SnsAlarmsConfig } from '../alarms/sns'
import type { SqsAlarmsConfig } from '../alarms/sqs'
import type { SfAlarmsConfig } from '../alarms/step-functions'
import type {
  DashboardBodyProperties, LambdaDashboardBodyProperties, ApiGwDashboardBodyProperties, SfDashboardBodyProperties, DynamoDbDashboardBodyProperties,
  KinesisDashboardBodyProperties, SqsDashboardBodyProperties, EcsDashboardBodyProperties, SnsDashboardBodyProperties, RuleDashboardBodyProperties,
  AlbDashboardBodyProperties, AlbTargetDashboardBodyProperties, AppSyncDashboardBodyProperties
} from '../dashboards/default-config-dashboard'
import type { LambdaFunctionAlarmProperties } from '../alarms/lambda'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

const MAX_DEPTH = 10

type ConfigNode = SlicWatchDashboardConfig | SlicWatchAlarmsConfig

interface ParentNode {
  DashboardBodyProperties?: DashboardBodyProperties
  AlarmProperties?: AlarmProperties
}

interface TimeRange {
  start: string
  end?: string
}

export interface Widgets {
  metricPeriod?: number
  width?: number
  height?: number
  yAxis?: string
  Statistic?: string[]
  Lambda?: LambdaDashboardBodyProperties
  ApiGateway?: ApiGwDashboardBodyProperties
  States?: SfDashboardBodyProperties
  DynamoDB?: DynamoDbDashboardBodyProperties
  Kinesis?: KinesisDashboardBodyProperties
  SQS?: SqsDashboardBodyProperties
  ECS?: EcsDashboardBodyProperties
  SNS?: SnsDashboardBodyProperties
  Events?: RuleDashboardBodyProperties
  ApplicationELB?: AlbDashboardBodyProperties
  ApplicationELBTarget?: AlbTargetDashboardBodyProperties
  AppSync?: AppSyncDashboardBodyProperties
}

export interface SlicWatchDashboardConfig {
  enabled?: boolean
  timeRange?: TimeRange
  widgets: Widgets
}

export interface SlicWatchAlarmsConfig {
  enabled: boolean
  Period: number
  EvaluationPeriods: number
  TreatMissingData: string
  ComparisonOperator: string
  Lambda?: LambdaFunctionAlarmProperties
  ApiGateway?: ApiGwAlarmProperties
  States?: SfAlarmsConfig
  DynamoDB?: DynamoDbAlarmProperties
  Kinesis?: KinesisAlarmProperties
  SQS?: SqsAlarmsConfig
  ECS?: EcsAlarmsConfig
  SNS?: SnsAlarmsConfig
  Events?: EventsAlarmsConfig
  ApplicationELB?: AlbAlarmProperties
  ApplicationELBTarget?: AlbTargetAlarmProperties
  AppSync?: AppSyncAlarmProperties
}

/**
 * Accept an object configuration with multiple levels. Return an applied version of this object
 * with default parameters from parent nodes cascaded to child objects where no override is present.
 *
 * node hierarchical configuration
 * parentNode The configuration from the parent node to be applied to the current node where no conflict occurs
 */
export function cascade (node: SlicWatchAlarmsConfig, parentNode?: ParentNode, depth?: number): SlicWatchAlarmsConfig
export function cascade (node: SlicWatchDashboardConfig, parentNode?: ParentNode, depth?: number): SlicWatchDashboardConfig
export function cascade (node: ConfigNode, parentNode?: ParentNode, depth = 0): SlicWatchAlarmsConfig | SlicWatchDashboardConfig {
  if (depth > 10) {
    throw new Error(`Maximum configuration depth of ${MAX_DEPTH} reached`)
  }
  const childNodes = {}
  const compiledNode = {}
  for (const [key, value] of Object.entries({ ...parentNode, ...node })) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      childNodes[key] = value
    } else {
      compiledNode[key] = value
    }
  }

  const compiledChildren = {}
  for (const [key, value] of Object.entries(childNodes)) {
    compiledChildren[key] = cascade(value, compiledNode, depth + 1)
  }
  return {
    ...compiledNode,
    ...compiledChildren
  } as SlicWatchDashboardConfig | SlicWatchAlarmsConfig
}
