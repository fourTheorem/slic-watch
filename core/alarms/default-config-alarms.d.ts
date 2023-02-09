import { AlbTargetAlarmConfig } from './alb-target-group'
import { AlbAlarmConfig } from './alb'
import { ApiGwAlarmConfig } from './api-gateway'
import { AppSyncAlarmConfig } from './appsync'
import { DynamoDbAlarmConfig } from './dynamodb'
import { EcsAlarmsConfig } from './ecs'
import { EventsAlarmsConfig } from './eventbridge'
import { KinesisAlarmConfig } from './kinesis'
import { LambdaFunctionAlarmConfigs } from './lambda'
import { SnsAlarmsConfig } from './sns'
import { SqsAlarmsConfig } from './sqs'
import { SfAlarmsConfig } from './step-functions'
import { AlarmsCascade } from '../cascading-config'
import { Statistic } from '../cf-template'

export type AlarmConfig ={
  enabled?: boolean
  Period?: number
  EvaluationPeriods?: number
  TreatMissingData: string
  ComparisonOperator?: string
  Statistic?: Statistic
  ExtendedStatistic?: string
  Threshold?: number
}

export type AllAlarmsConfig = {
  enabled?: boolean
  alarmConfig?: AlarmConfig
  alarms?: AlarmsCascade
}

export type AlarmsConfig = AlbTargetAlarmConfig & AlbAlarmConfig & ApiGwAlarmConfig & AppSyncAlarmConfig & DynamoDbAlarmConfig
& EcsAlarmsConfig & EventsAlarmsConfig & KinesisAlarmConfig & LambdaFunctionAlarmConfigs & SnsAlarmsConfig & SqsAlarmsConfig & SfAlarmsConfig

export type FunctionAlarmConfigs = {
  HelloLambdaFunction?: LambdaFunctionAlarmConfigs
  ThrottlerLambdaFunction?: LambdaFunctionAlarmConfigs
  DriveStreamLambdaFunction?: LambdaFunctionAlarmConfigs
  DriveQueueLambdaFunction?: LambdaFunctionAlarmConfigs
  DriveTableLambdaFunction?: LambdaFunctionAlarmConfigs
  StreamProcessorLambdaFunction?: LambdaFunctionAlarmConfigs
  HttpGetterLambdaFunction?: LambdaFunctionAlarmConfigs
  SubscriptionHandlerLambdaFunction?: LambdaFunctionAlarmConfigs
  EventsRuleLambdaFunction?: LambdaFunctionAlarmConfigs
  AlbEventLambdaFunction?: LambdaFunctionAlarmConfigs
}

export type Context = {
  alarmActions?: string[]
}
