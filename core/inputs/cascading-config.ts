'use strict'

import { type AlbAlarmProperties } from '../alarms/alb'
import { type AlbTargetAlarmProperties } from '../alarms/alb-target-group'
import { type ApiGwAlarmProperties } from '../alarms/api-gateway'
import { type AppSyncAlarmProperties } from '../alarms/appsync'
import { type DynamoDbAlarmProperties } from '../alarms/dynamodb'
import { type EcsAlarmsConfig } from '../alarms/ecs'
import { type EventsAlarmsConfig } from '../alarms/eventbridge'
import { type KinesisAlarmProperties } from '../alarms/kinesis'
import { type SnsAlarmsConfig } from '../alarms/sns'
import { type SqsAlarmsConfig } from '../alarms/sqs'
import { type SfAlarmsConfig } from '../alarms/step-functions'
import { type AllAlarmsConfig } from '../alarms/default-config-alarms'
import {
  type DashboardConfig, type DashboardBodyProperties, type LambdaDashboardBodyProperties, type ApiGwDashboardBodyProperties, type SfDashboardBodyProperties, type DynamoDbDashboardBodyProperties,
  type KinesisDashboardBodyProperties, type SqsDashboardBodyProperties, type EcsDashboardBodyProperties, type SnsDashboardBodyProperties, type RuleDashboardBodyProperties,
  type AlbDashboardBodyProperties, type AlbTargetDashboardBodyProperties, type AppSyncDashboardBodyProperties
} from '../dashboards/default-config-dashboard'
import { type LambdaFunctionAlarmPropertiess } from '../alarms/lambda'
import { type Statistic } from '../cf-template'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

const MAX_DEPTH = 10

type ConfigNode = DashboardConfig | AllAlarmsConfig

interface ParentNode {
  DashboardBodyProperties?: DashboardBodyProperties
  AlarmProperties?: AlarmProperties
}

interface TimeRange {
  start: string
  end: string
}

export interface Widgets {
  enabled?: boolean // remove later ? mark
  Statistic?: Statistic[]
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

export interface DashboardsCascade {
  enabled?: boolean
  timeRange?: TimeRange
  widgets?: Widgets
}

export interface AlarmsCascade {
  ActionsEnabled: boolean
  Lambda?: LambdaFunctionAlarmPropertiess
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
export function cascade (node: AllAlarmsConfig, parentNode?: ParentNode, depth?: number): AlarmsCascade
export function cascade (node: DashboardConfig, parentNode?: ParentNode, depth?: number): DashboardsCascade
export function cascade (node: ConfigNode, parentNode?: ParentNode, depth = 0): AlarmsCascade | DashboardsCascade {
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
  } as DashboardsCascade | AlarmsCascade
}
