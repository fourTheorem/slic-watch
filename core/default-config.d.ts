import { AlbTargetAlarmConfig } from './alarms-alb-target-group'
import { AlbAlarmConfig } from './alarms-alb'
import { ApiGwAlarmConfig } from './alarms-api-gateway'
import { AppSyncAlarmConfig } from './alarms-appsync'
import { DynamoDbAlarmConfig } from './alarms-dynamodb'
import { EcsAlarmsConfig } from './alarms-ecs'
import { EventsAlarmsConfig } from './alarms-eventbridge'
import { KinesisAlarmConfig } from './alarms-kinesis'
import { FunctionAlarmConfigs } from './alarms-lambda'
import { SnsAlarmsConfig } from './alarms-sns'
import { SqsAlarmsConfig } from './alarms-sqs'
import { SfAlarmsConfig } from './alarms-step-functions'

export type Config ={
  enabled?: boolean,
  Period?: number,
  EvaluationPeriods?: number,
  ComparisonOperator?: string,
  Static?: string,
  ExtendedStatistic?: string
  Threshold?: number
}

export type AllAlarmsConfig = {
  config: Config
  alarmsConfig: AlarmsConfig
}

export type AlarmsConfig = AlbTargetAlarmConfig & AlbAlarmConfig & ApiGwAlarmConfig & AppSyncAlarmConfig & DynamoDbAlarmConfig
& EcsAlarmsConfig & EventsAlarmsConfig & KinesisAlarmConfig & FunctionAlarmConfigs & SnsAlarmsConfig & SqsAlarmsConfig & SfAlarmsConfig

export type FunctionAlarmConfigs = {
  HelloLambdaFunction: object
  PingLambdaFunction: object
  ThrottlerLambdaFunction: object
  DriveStreamLambdaFunction: object
  DriveQueueLambdaFunction: object
  DriveTableLambdaFunction: object
  StreamProcessorLambdaFunction: object
  HttpGetterLambdaFunction: object
  SubscriptionHandlerLambdaFunction: object
  EventsRuleLambdaFunction: object
}

export type Context = {
  alarmActions: string[]
}
