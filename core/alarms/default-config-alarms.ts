
import type { AlbTargetAlarmsConfig } from './alb-target-group'
import type { AlbAlarmsConfig } from './alb'
import type { ApiGwAlarmsConfig } from './api-gateway'
import type { AppSyncAlarmsConfig } from './appsync'
import type { DynamoDbAlarmsConfig } from './dynamodb'
import type { EcsAlarmsConfig } from './ecs'
import type { EventsAlarmsConfig } from './eventbridge'
import type { KinesisAlarmsConfig } from './kinesis'
import type { LambdaFunctionAlarmsConfig } from './lambda'
import type { SnsAlarmsConfig } from './sns'
import type { SqsAlarmsConfig } from './sqs'
import type { SfAlarmsConfig } from './step-functions'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Resource from 'cloudform-types/types/resource'
import type { Value } from 'cloudform-types/types/dataTypes'
import { getResourcesByType } from '../cf-template'
import { makeResourceName } from './make-name'
import type Template from 'cloudform-types/types/template'

export function fetchAlarmResources (type: string, service: string, metrics: string[], config: DefaultAlarmsProperties, context: Context, compiledTemplate: Template, getAlarm) {
  const resources = {}
  const resourcesOfType = getResourcesByType(type, compiledTemplate)

  for (const resourceName of Object.keys(resourcesOfType)) {
    for (const metric of metrics) {
      const { enabled, ...rest } = config[metric]
      if (enabled !== false) {
        const alarm = getAlarm({ metric, resourceName, config: rest })
        const name = makeResourceName(service, resourceName, metric.replaceAll('-', ''))
        const resource = createAlarm({
          MetricName: metric,
          ...alarm,
          ...rest
        }, context)
        resources[name] = resource
      }
    }
  }
  return resources
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
export interface ReturnResource {
  Type: string
  Properties: CfAlarmsProperties
}

export interface ReturnAlarm {
  resourceName: string
  resource: Resource
}

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

export type AlarmsConfig = AlbTargetAlarmsConfig & AlbAlarmsConfig & ApiGwAlarmsConfig & AppSyncAlarmsConfig & DynamoDbAlarmsConfig
& EcsAlarmsConfig & EventsAlarmsConfig & KinesisAlarmsConfig & LambdaFunctionAlarmsConfig & SnsAlarmsConfig & SqsAlarmsConfig & SfAlarmsConfig

export interface FunctionAlarmProperties {
  HelloLambdaFunction?: LambdaFunctionAlarmsConfig
  ThrottlerLambdaFunction?: LambdaFunctionAlarmsConfig
  DriveStreamLambdaFunction?: LambdaFunctionAlarmsConfig
  DriveQueueLambdaFunction?: LambdaFunctionAlarmsConfig
  DriveTableLambdaFunction?: LambdaFunctionAlarmsConfig
  StreamProcessorLambdaFunction?: LambdaFunctionAlarmsConfig
  HttpGetterLambdaFunction?: LambdaFunctionAlarmsConfig
  SubscriptionHandlerLambdaFunction?: LambdaFunctionAlarmsConfig
  EventsRuleLambdaFunction?: LambdaFunctionAlarmsConfig
  AlbEventLambdaFunction?: LambdaFunctionAlarmsConfig
}
