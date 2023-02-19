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
import { AlarmsCascade } from '../inputs/cascading-config'
import { AlbTargetAlarm } from './alb-target-group'
import { AlbAlarm  } from "./alb";
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"


export type ReturnAlarm = {
  Type: string
  Properties: AlarmProperties
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
export function createAlarm(alarm:AllAlarms, context?: Context ): ReturnAlarm {
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
        Metrics:alarm.Metrics,
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
