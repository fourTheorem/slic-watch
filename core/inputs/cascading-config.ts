'use strict'

import { AlbAlarmProperties } from '../alarms/alb'
import { AlbTargetAlarmProperties } from '../alarms/alb-target-group'
import { ApiGwAlarmProperties } from '../alarms/api-gateway'
import { AppSyncAlarmProperties } from '../alarms/appsync'
import { DynamoDbAlarmProperties } from '../alarms/dynamodb'
import { EcsAlarmsConfig } from '../alarms/ecs'
import { EventsAlarmsConfig } from '../alarms/eventbridge'
import { KinesisAlarmProperties } from '../alarms/kinesis'
import { SnsAlarmsConfig } from '../alarms/sns'
import { SqsAlarmsConfig } from '../alarms/sqs'
import { SfAlarmsConfig } from '../alarms/step-functions'
import { AllAlarmsConfig } from '../alarms/default-config-alarms'
import { DashboardConfig, DashboardBodyProperties, LambdaDashboardBodyProperties, ApiGwDashboardBodyProperties, SfDashboardBodyProperties, DynamoDbDashboardBodyProperties, KinesisDashboardBodyProperties, SqsDashboardBodyProperties,
   EcsDashboardBodyProperties, SnsDashboardBodyProperties, RuleDashboardBodyProperties, AlbDashboardBodyProperties, AlbTargetDashboardBodyProperties, AppSyncDashboardBodyProperties } from '../dashboards/default-config-dashboard'
import { LambdaFunctionAlarmPropertiess } from '../alarms/lambda'
import { Statistic } from '../cf-template'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"


const MAX_DEPTH = 10

type ConfigNode =  DashboardConfig | AllAlarmsConfig

type ParentNode ={
  DashboardBodyProperties?: DashboardBodyProperties
  AlarmProperties?: AlarmProperties

}
export type DashboardsCascade ={
  ActionsEnabled?: boolean
  timeRange?: TimeRange
  widgets?: Widgets
 }
 type TimeRange = {
  start: string
  end: string
 } 

export type Widgets = {
  ActionsEnabled?:boolean // remove later ? mark 
  Statistic?: Statistic[]
  Lambda?: LambdaDashboardBodyProperties 
  ApiGateway?: ApiGwDashboardBodyProperties
  States?: SfDashboardBodyProperties,
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

export type AlarmsCascade = {
  ActionsEnabled: boolean
  Lambda?:  LambdaFunctionAlarmPropertiess 
  ApiGateway?: ApiGwAlarmProperties
  States?: SfAlarmsConfig,
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
export function cascade(node:AllAlarmsConfig, parentNode?: ParentNode, depth?:number):AlarmsCascade
export function cascade(node:DashboardConfig, parentNode?: ParentNode, depth?:number) : DashboardsCascade
export function cascade(node:ConfigNode, parentNode?: ParentNode, depth=0 ):AlarmsCascade | DashboardsCascade {
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