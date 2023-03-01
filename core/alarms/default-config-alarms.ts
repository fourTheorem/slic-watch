'use strict'

import { AlbTargetAlarmProperties, AlbTargetAlarm } from './alb-target-group'
import { AlbAlarmProperties, AlbAlarm } from './alb'
import { ApiAlarm, ApiGwAlarmProperties } from './api-gateway'
import { AppSyncAlarm, AppSyncAlarmProperties } from './appsync'
import { DynamoDbAlarmProperties } from './dynamodb'
import { EcsAlarm, EcsAlarmsConfig } from './ecs'
import { EventbridgeAlarm, EventsAlarmsConfig } from './eventbridge'
import { KinesisAlarmProperties } from './kinesis'
import { LambdaAlarm, LambdaFunctionAlarmPropertiess } from './lambda'
import { SnsAlarm, SnsAlarmsConfig } from './sns'
import { SqsAlarm, SqsAlarmsConfig } from './sqs'
import { SfAlarmsConfig, SmAlarm } from './step-functions'
import { AlarmsCascade } from '../inputs/cascading-config'
import { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

export type ReturnAlarm = {
  Type: string
  Properties: AlarmProperties
}

export type Context = {
  alarmActions: string[]
}

type AllAlarms = AlarmProperties | AlbAlarm | AlbTargetAlarm | ApiAlarm | AppSyncAlarm | EcsAlarm | EventbridgeAlarm | LambdaAlarm | SnsAlarm | SqsAlarm | SmAlarm

export function createAlarm(alarm: AlarmProperties, context?: Context): ReturnAlarm
export function createAlarm(alarm: AlbAlarm, context?: Context): ReturnAlarm
export function createAlarm(alarm: AlbTargetAlarm, context?: Context): ReturnAlarm
export function createAlarm(alarm: ApiAlarm, context?: Context): ReturnAlarm
export function createAlarm(alarm: AppSyncAlarm, context?: Context): ReturnAlarm
export function createAlarm(alarm: EcsAlarm, context?: Context): ReturnAlarm
export function createAlarm(alarm: EventbridgeAlarm, context?: Context): ReturnAlarm
export function createAlarm(alarm: LambdaAlarm, context?: Context): ReturnAlarm
export function createAlarm(alarm: SnsAlarm, context?: Context): ReturnAlarm
export function createAlarm(alarm: SqsAlarm, context?: Context): ReturnAlarm
export function createAlarm(alarm: SmAlarm, context?: Context): ReturnAlarm
export function createAlarm (alarm:AllAlarms, context?: Context): ReturnAlarm {
  return {
    Type: 'AWS::CloudWatch::Alarm',
    Properties: {
      ActionsEnabled: true,
      AlarmActions: context.alarmActions,
      AlarmName: alarm.AlarmName,
      AlarmDescription: alarm.AlarmDescription,
      EvaluationPeriods: alarm.EvaluationPeriods,
      ComparisonOperator: alarm.ComparisonOperator,
      Threshold: alarm.Threshold,
      TreatMissingData: alarm.TreatMissingData,
      Dimensions: alarm.Dimensions,
      Metrics: alarm.Metrics,
      MetricName: alarm.MetricName,
      Namespace: alarm.Namespace,
      Period: alarm.Period,
      Statistic: alarm.Statistic,
      ExtendedStatistic: alarm.ExtendedStatistic
    }
  }
}

export type AllAlarmsConfig = {
  ActionsEnabled: boolean
  alarms?: AlarmsCascade
}

export type AlarmsConfig = AlbTargetAlarmProperties & AlbAlarmProperties & ApiGwAlarmProperties & AppSyncAlarmProperties & DynamoDbAlarmProperties
& EcsAlarmsConfig & EventsAlarmsConfig & KinesisAlarmProperties & LambdaFunctionAlarmPropertiess & SnsAlarmsConfig & SqsAlarmsConfig & SfAlarmsConfig

export type FunctionAlarmPropertiess = {
  HelloLambdaFunction?: LambdaFunctionAlarmPropertiess
  ThrottlerLambdaFunction?: LambdaFunctionAlarmPropertiess
  DriveStreamLambdaFunction?: LambdaFunctionAlarmPropertiess
  DriveQueueLambdaFunction?: LambdaFunctionAlarmPropertiess
  DriveTableLambdaFunction?: LambdaFunctionAlarmPropertiess
  StreamProcessorLambdaFunction?: LambdaFunctionAlarmPropertiess
  HttpGetterLambdaFunction?: LambdaFunctionAlarmPropertiess
  SubscriptionHandlerLambdaFunction?: LambdaFunctionAlarmPropertiess
  EventsRuleLambdaFunction?: LambdaFunctionAlarmPropertiess
  AlbEventLambdaFunction?: LambdaFunctionAlarmPropertiess
}
