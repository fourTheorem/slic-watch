import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type { Value } from 'cloudform-types/types/dataTypes'

import type { LambdaFunctionAlarmsConfig } from './lambda'
import type { ApiGwAlarmsConfig } from './api-gateway'
import type { SfAlarmsConfig } from './step-functions'
import type { DynamoDbAlarmsConfig } from './dynamodb'
import type { KinesisAlarmsConfig } from './kinesis'
import type { SqsAlarmsConfig } from './sqs'
import type { EcsAlarmsConfig } from './ecs'
import type { SnsAlarmsConfig } from './sns'
import type { EventsAlarmsConfig } from './eventbridge'
import type { AlbAlarmsConfig } from './alb'
import type { AlbTargetAlarmsConfig } from './alb-target-group'
import type { AppSyncAlarmsConfig } from './appsync'

export interface CfAlarm {
  Type: string
  Properties: CfAlarmProperties
}

export interface AlarmTemplate {
  Type: string
  Properties: AlarmProperties
}

export interface ReturnAlarm {
  resourceName: string
  resource: Resource
}

type Modify<T, R> = Omit<T, keyof R> & R
export interface SlicWatchAlarmConfig extends Modify<AlarmProperties, {
  EvaluationPeriods?: Value<number>
  ComparisonOperator?: Value<string>
  enabled?: boolean
}> {}

export interface CfAlarmProperties extends Modify<AlarmProperties, {
  EvaluationPeriods?: Value<number>
  ComparisonOperator?: Value<string>
}> {}

export interface Context {
  alarmActions: string[]
}

export interface SlicWatchAlarmsConfig {
  enabled: boolean
  Period: number
  EvaluationPeriods: number
  TreatMissingData: string
  ComparisonOperator: string
  Lambda?: LambdaFunctionAlarmsConfig
  ApiGateway?: ApiGwAlarmsConfig
  States?: SfAlarmsConfig
  DynamoDB?: DynamoDbAlarmsConfig
  Kinesis?: KinesisAlarmsConfig
  SQS?: SqsAlarmsConfig
  ECS?: EcsAlarmsConfig
  SNS?: SnsAlarmsConfig
  Events?: EventsAlarmsConfig
  ApplicationELB?: AlbAlarmsConfig
  ApplicationELBTarget?: AlbTargetAlarmsConfig
  AppSync?: AppSyncAlarmsConfig
}