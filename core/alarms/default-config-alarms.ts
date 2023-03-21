'use strict'

import type { AlbTargetAlarmProperties } from './alb-target-group'
import type { AlbAlarmProperties } from './alb'
import type { ApiGwAlarmProperties } from './api-gateway'
import type { AppSyncAlarmProperties } from './appsync'
import type { DynamoDbAlarmProperties } from './dynamodb'
import type { EcsAlarmsConfig } from './ecs'
import type { EventsAlarmsConfig } from './eventbridge'
import type { KinesisAlarmProperties } from './kinesis'
import type { LambdaFunctionAlarmProperties } from './lambda'
import type { SnsAlarmsConfig } from './sns'
import type { SqsAlarmsConfig } from './sqs'
import type { SfAlarmsConfig } from './step-functions'
import type { SlicWatchAlarmsConfig } from '../inputs/cascading-config'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type { Value } from 'cloudform-types/types/dataTypes'

export interface ReturnResource {
  Type: string
  Properties: CfAlarmsProperties
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

type Modify<T, R> = Omit<T, keyof R> & R
export interface DefaultAlarmsProperties extends Modify<AlarmProperties, {
  EvaluationPeriods?: Value<number>
  ComparisonOperator?: Value<string>
  enabled?: boolean
}> {}

export interface CfAlarmsProperties extends Modify<AlarmProperties, {
  EvaluationPeriods?: Value<number>
  ComparisonOperator?: Value<string>
}> {}

export interface Context {
  alarmActions: string[]
}

export function createAlarm (alarm: CfAlarmsProperties, context?: Context): ReturnResource {
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
