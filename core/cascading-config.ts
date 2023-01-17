'use strict'

import { AlbAlarmConfig } from "./alarms-alb"
import { AlbTargetAlarmConfig } from "./alarms-alb-target-group"
import { ApiGwAlarmConfig } from "./alarms-api-gateway"
import { AppSyncAlarmConfig } from "./alarms-appsync"
import { DynamoDbAlarmConfig } from "./alarms-dynamodb"
import { EcsAlarmsConfig } from "./alarms-ecs"
import { EventsAlarmsConfig } from "./alarms-eventbridge"
import { KinesisAlarmConfig } from "./alarms-kinesis"
import { LambdaFunctionAlarmConfigs } from "./alarms-lambda"
import { SnsAlarmsConfig } from "./alarms-sns"
import { SqsAlarmsConfig } from "./alarms-sqs"
import { SfAlarmsConfig } from "./alarms-step-functions"
import { AlarmConfig, AllAlarmsConfig } from "./default-config-alarms.d"
import { DashboardConfig, DashConfig, LambdaDashConfig, ApiGwDashConfig, SfDashConfig, DynamoDbDashConfig, KinesisDashConfig, SqsDashConfig,
   EcsDashConfig, SnsDashConfig, RuleDashConfig, AlbDashConfig, AlbTargetDashConfig, AppSyncDashConfig } from "./default-config-dashboard.d"


const MAX_DEPTH = 10

type ConfigNode = {
  dashboardConfig?: DashboardConfig
  alarmConfig?: AllAlarmsConfig
}

type ParentNode ={
  dashConfig: DashConfig
  alarmConfig: AlarmConfig

}
export type DashboardsCascade ={
  enabled?: boolean
  timeRange: number
  widgets: Widgets
  dashConfig?: DashConfig
 }

export type Widgets = {
  Lambda: LambdaDashConfig 
  ApiGateway: ApiGwDashConfig
  States: SfDashConfig,
  DynamoDB: DynamoDbDashConfig 
  Kinesis: KinesisDashConfig
  SQS: SqsDashConfig
  ECS: EcsDashConfig
  SNS: SnsDashConfig  
  Events: RuleDashConfig
  ApplicationELB: AlbDashConfig
  ApplicationELBTarget: AlbTargetDashConfig
  AppSync: AppSyncDashConfig 
}

export type AlarmsCascade ={
  Lambda?: LambdaFunctionAlarmConfigs 
  ApiGateway?: ApiGwAlarmConfig
  States?: SfAlarmsConfig,
  DynamoDB?: DynamoDbAlarmConfig 
  Kinesis?: KinesisAlarmConfig
  SQS?: SqsAlarmsConfig
  ECS?: EcsAlarmsConfig
  SNS?: SnsAlarmsConfig  
  Events?: EventsAlarmsConfig
  ApplicationELB?: AlbAlarmConfig
  ApplicationELBTarget?: AlbTargetAlarmConfig
  AppSync?: AppSyncAlarmConfig  
}

/**
 * Accept an object configuration with multiple levels. Return an applied version of this object
 * with default parameters from parent nodes cascaded to child objects where no override is present.
 *
 * node hierarchical configuration
 * parentNode The configuration from the parent node to be applied to the current node where no conflict occurs
 */
export function cascade(node:AllAlarmsConfig, parentNode?: ParentNode, depth?:number): AlarmsCascade
export function cascade(node:DashboardConfig, parentNode?: ParentNode, depth?:number) : DashboardsCascade
export function cascade(node:DashboardConfig| AllAlarmsConfig, parentNode?: ParentNode, depth=0 ):AlarmsCascade | DashboardsCascade {
  if (depth > 10) {
    throw new Error(`Maximum configuration depth of ${MAX_DEPTH} reached`)
  }
  const childNodes = {}
  const compiledNode = {}
  // @ts-ignore
  for (const [key, value] of Object.entries({ ...parentNode, ...node })) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      childNodes[key] = value
    } else {
      compiledNode[key] = value
    }
  }

  const compiledChildren = {}
  for (const [key, value] of Object.entries(childNodes)) {
    // @ts-ignore
    compiledChildren[key] = cascade(value, compiledNode, depth + 1)
  }
   return {
    ...compiledNode,
    ...compiledChildren
  } as DashboardsCascade | AlarmsCascade
}