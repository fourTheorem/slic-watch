'use strict'

import { type AlbTargetAlarmProperties, type AlbTargetAlarm } from './alb-target-group'
import { type AlbAlarmProperties, type AlbAlarm } from './alb'
import { type ApiAlarm, type ApiGwAlarmProperties } from './api-gateway'
import { type AppSyncAlarm, type AppSyncAlarmProperties } from './appsync'
import { type DynamoDbAlarmProperties } from './dynamodb'
import { type EcsAlarm, type EcsAlarmsConfig } from './ecs'
import { type EventbridgeAlarm, type EventsAlarmsConfig } from './eventbridge'
import { type KinesisAlarmProperties } from './kinesis'
import { type LambdaAlarm, type LambdaFunctionAlarmProperties } from './lambda'
import { type SnsAlarm, type SnsAlarmsConfig } from './sns'
import { type SqsAlarm, type SqsAlarmsConfig } from './sqs'
import { type SfAlarmsConfig, type SmAlarm } from './step-functions'
import { type SlicWatchAlarmsConfig } from '../inputs/cascading-config'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'

export interface ReturnResource {
  Type: string
  Properties: AlarmProperties
}

export interface ReturnAlarm {
  resourceName: string
  resource: Resource
}

// export interface SlicWatchAlarmProperties {
//   enabled: boolean
//   Period: number
//   EvaluationPeriods: number
//   TreatMissingData: string
//   ComparisonOperator: string
// }

export interface DefaultAlarmsProperties extends AlarmProperties {
  enabled?: boolean
}

export interface Context {
  alarmActions: string[]
}

export type AllAlarms = AlarmProperties | AlbAlarm | AlbTargetAlarm | ApiAlarm | AppSyncAlarm | EcsAlarm | EventbridgeAlarm | LambdaAlarm | SnsAlarm | SqsAlarm | SmAlarm

export function createAlarm (alarm: AlarmProperties, context?: Context): ReturnResource
export function createAlarm (alarm: AlbAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: AlbTargetAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: ApiAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: AppSyncAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: EcsAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: EventbridgeAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: LambdaAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: SnsAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: SqsAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: SmAlarm, context?: Context): ReturnResource
export function createAlarm (alarm: AllAlarms, context?: Context): ReturnResource {
  return {
    Type: 'AWS::CloudWatch::Alarm',
    Properties: {
      ActionsEnabled: true,
      AlarmActions: context?.alarmActions,
      ...alarm
    }
  }
}

export interface AllAlarmsConfig {
  enabled: boolean
  alarms?: SlicWatchAlarmsConfig
}

export type AlarmsConfig = AlbTargetAlarmProperties & AlbAlarmProperties & ApiGwAlarmProperties & AppSyncAlarmProperties & DynamoDbAlarmProperties
& EcsAlarmsConfig & EventsAlarmsConfig & KinesisAlarmProperties & LambdaFunctionAlarmProperties & SnsAlarmsConfig & SqsAlarmsConfig & SfAlarmsConfig

export interface FunctionAlarmProperties {
  HelloLambdaFunction?: LambdaFunctionAlarmProperties
  ThrottlerLambdaFunction?: LambdaFunctionAlarmProperties
  DriveStreamLambdaFunction?: LambdaFunctionAlarmProperties
  DriveQueueLambdaFunction?: LambdaFunctionAlarmProperties
  DriveTableLambdaFunction?: LambdaFunctionAlarmProperties
  StreamProcessorLambdaFunction?: LambdaFunctionAlarmProperties
  HttpGetterLambdaFunction?: LambdaFunctionAlarmProperties
  SubscriptionHandlerLambdaFunction?: LambdaFunctionAlarmProperties
  EventsRuleLambdaFunction?: LambdaFunctionAlarmProperties
  AlbEventLambdaFunction?: LambdaFunctionAlarmProperties
}
