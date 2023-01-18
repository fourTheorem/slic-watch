import { AlbTargetAlarmConfig } from './alarms-alb-target-group'
import { AlbAlarmConfig } from './alarms-alb'
import { ApiGwAlarmConfig } from './alarms-api-gateway'
import { AppSyncAlarmConfig } from './alarms-appsync'
import { DynamoDbAlarmConfig } from './alarms-dynamodb'
import { EcsAlarmsConfig } from './alarms-ecs'
import { EventsAlarmsConfig } from './alarms-eventbridge'
import { KinesisAlarmConfig } from './alarms-kinesis'
import { LambdaFunctionAlarmConfigs } from './alarms-lambda'
import { SnsAlarmsConfig } from './alarms-sns'
import { SqsAlarmsConfig } from './alarms-sqs'
import { SfAlarmsConfig } from './alarms-step-functions'
import { AlarmsCascade } from './cascading-config'

export type AlarmConfig ={
  enabled?: boolean
  Period?: number
  EvaluationPeriods?: number
  TreatMissingData: string
  ComparisonOperator?: string
  Statistic?: string
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
