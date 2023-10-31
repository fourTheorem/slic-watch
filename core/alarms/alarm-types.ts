import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type { IntrinsicFunction } from 'cloudform'

import type { SlicWatchLambdaAlarmsConfig } from './lambda'
import type { SlicWatchApiGwAlarmsConfig } from './api-gateway'
import type { SlicWatchSfAlarmsConfig } from './step-functions'
import type { SlicWatchDynamoDbAlarmsConfig } from './dynamodb'
import type { SlicWatchKinesisAlarmsConfig } from './kinesis'
import type { SlicWatchSqsAlarmsConfig } from './sqs'
import type { SlicWatchEcsAlarmsConfig } from './ecs'
import type { SlicWatchSnsAlarmsConfig } from './sns'
import type { SlicWatchEventsAlarmsConfig } from './eventbridge'
import type { SlicWatchAlbAlarmsConfig } from './alb'
import type { SlicWatchAlbTargetAlarmsConfig } from './alb-target-group'
import type { SlicWatchAppSyncAlarmsConfig } from './appsync'

export type OptionalAlarmProps = 'EvaluationPeriods' | 'ComparisonOperator'

export declare type Value<T> = T | IntrinsicFunction
export interface AlarmTemplate {
  Type: string
  Properties: AlarmProperties
}

export interface SlicWatchAlarmConfig extends Omit<AlarmProperties, OptionalAlarmProps> {
  ComparisonOperator?: string
  enabled?: boolean
}

export interface SlicWatchMergedConfig extends AlarmProperties {
  enabled: boolean
}

export type InputOutput = SlicWatchAlarmConfig | SlicWatchMergedConfig

export interface ReturnAlarm {
  resourceName: string
  resource: Resource
}

export interface AlarmActionsConfig {
  alarmActions: string[]
}

export interface SlicWatchCascadedAlarmsConfig<T extends InputOutput> extends AlarmProperties {
  enabled: boolean
  Lambda: SlicWatchLambdaAlarmsConfig<T>
  ApiGateway: SlicWatchApiGwAlarmsConfig<T>
  States: SlicWatchSfAlarmsConfig<T>
  DynamoDB: SlicWatchDynamoDbAlarmsConfig<T>
  Kinesis: SlicWatchKinesisAlarmsConfig<T>
  SQS: SlicWatchSqsAlarmsConfig<T>
  ECS: SlicWatchEcsAlarmsConfig<T>
  SNS: SlicWatchSnsAlarmsConfig<T>
  Events: SlicWatchEventsAlarmsConfig<T>
  ApplicationELB: SlicWatchAlbAlarmsConfig<T>
  ApplicationELBTarget: SlicWatchAlbTargetAlarmsConfig<T>
  AppSync: SlicWatchAppSyncAlarmsConfig<T>
}

export type CloudFormationResources = Record<string, Resource>
