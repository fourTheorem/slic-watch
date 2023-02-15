import { AlbTargetAlarmConfig } from './alb-target-group'
import { AlbAlarmConfig } from './alb'
import { ApiAlarm, ApiGwAlarmConfig } from './api-gateway'
import { AppSyncAlarm, AppSyncAlarmConfig } from './appsync'
import { DynamoDbAlarmConfig } from './dynamodb'
import { EcsAlarm, EcsAlarmsConfig } from './ecs'
import { EventbridgeAlarm, EventsAlarmsConfig } from './eventbridge'
import { KinesisAlarmConfig } from './kinesis'
import { LambdaAlarm, LambdaFunctionAlarmConfigs } from './lambda'
import { SnsAlarm, SnsAlarmsConfig } from './sns'
import { SqsAlarm, SqsAlarmsConfig } from './sqs'
import { SfAlarmsConfig, SmAlarm } from './step-functions'
import { AlarmsCascade } from '../cascading-config'
import { Statistic } from '../cf-template'
import { AlbTargetAlarm } from './alb-target-group'
import { AlbAlarm  } from "./alb";

export type Alarm = {
  alarmName,
  alarmDescription,
  comparisonOperator: string,
  threshold: number,
  metrics?
  metricName: string,
  statistic: Statistic,
  period: number,
  extendedStatistic?: string,
  evaluationPeriods: number,
  treatMissingData: string,
  namespace: string,
  dimensions: object //todo figure out how to make this more specific
}

export type AlarmProperties = {
  ActionsEnabled: boolean
  AlarmActions: string[] //todo
  AlarmName: string
  AlarmDescription: string
  EvaluationPeriods: number
  ComparisonOperator: string
  Threshold: number
  TreatMissingData: string
  Dimensions: object
  Metrics?
  MetricName: string
  Namespace: string
  Period: number
  Statistic: Statistic //todo
  ExtendedStatistic?: string //todo
}

export type ReturnAlarm = {
  Type: string
  Properties: AlarmProperties
}

type AllAlarms = Alarm | AlbAlarm | AlbTargetAlarm | ApiAlarm | AppSyncAlarm | EcsAlarm | EventbridgeAlarm | LambdaAlarm | SnsAlarm | SqsAlarm | SmAlarm

export function createAlarm(alarm: Alarm, context?: Context): ReturnAlarm
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
export function createAlarm(alarm:AllAlarms, context?: Context ): ReturnAlarm {
    return {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: context.alarmActions,
        AlarmName: alarm.alarmName,
        AlarmDescription: alarm.alarmDescription,
        EvaluationPeriods: alarm.evaluationPeriods,
        ComparisonOperator: alarm.comparisonOperator,
        Threshold: alarm.threshold,
        TreatMissingData: alarm.treatMissingData,
        Dimensions: alarm.dimensions,
        Metrics:alarm.metrics,
        MetricName: alarm.metricName,
        Namespace: alarm.namespace,
        Period: alarm.period,
        Statistic: alarm.statistic,
        ExtendedStatistic: alarm.extendedStatistic
      }
    }
}


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
  alarmActions: string[]
}
