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

export interface ReturnAlarm {
  resourceName: string
  resource: Resource
}

export interface Context {
  alarmActions: string[]
}

export interface SlicWatchCascadeAlarmsConfig {
  enabled: boolean
  Lambda?: SlicWatchLambdaAlarmsConfig
  ApiGateway?: SlicWatchApiGwAlarmsConfig
  States?: SlicWatchSfAlarmsConfig
  DynamoDB?: SlicWatchDynamoDbAlarmsConfig
  Kinesis?: SlicWatchKinesisAlarmsConfig
  SQS?: SlicWatchSqsAlarmsConfig
  ECS?: SlicWatchEcsAlarmsConfig
  SNS?: SlicWatchSnsAlarmsConfig
  Events?: SlicWatchEventsAlarmsConfig
  ApplicationELB?: SlicWatchAlbAlarmsConfig
  ApplicationELBTarget?: SlicWatchAlbTargetAlarmsConfig
  AppSync?: SlicWatchAppSyncAlarmsConfig
}
