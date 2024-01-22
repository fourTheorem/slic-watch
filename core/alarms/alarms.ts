import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

import { cascade } from '../inputs/cascading-config'
import type {
  AlarmActionsConfig,
  SlicWatchAlarmConfig,
  SlicWatchCascadedAlarmsConfig, SlicWatchMergedConfig
} from './alarm-types'

import createLambdaAlarms from './lambda'
import createApiGatewayAlarms from './api-gateway'
import createStatesAlarms from './step-functions'
import createDynamoDbAlarms from './dynamodb'
import createKinesisAlarms from './kinesis'
import createSQSAlarms from './sqs'
import createECSAlarms from './ecs'
import createSnsAlarms from './sns'
import createRuleAlarms from './eventbridge'
import createAlbAlarms from './alb'
import createAlbTargetAlarms from './alb-target-group'
import createAppSyncAlarms from './appsync'
import { addResource } from '../cf-template'

/**
 * Add Alarm resources for all supported and enabled services and metrics
 *
 * @param alarmProperties The cascaded SLIC Watch alarm configuration (still without optional alarm properties like EvaluatedPeriods)
 * @param functionAlarmProperties Specific properties optionally set per Lambda function
 * @param alarmActionsConfig Defines whether actions occur when alarms change status
 * @param compiledTemplate The template to which alarms will be added
 */
export default function addAlarms (
  alarmProperties: SlicWatchCascadedAlarmsConfig<SlicWatchAlarmConfig>,
  alarmActionsConfig: AlarmActionsConfig,
  compiledTemplate: Template
) {
  const {
    Lambda: lambdaConfig,
    ApiGateway: apiGwConfig,
    States: sfConfig,
    DynamoDB: dynamoDbConfig,
    Kinesis: kinesisConfig,
    SQS: sqsConfig,
    ECS: ecsConfig,
    SNS: snsConfig,
    Events: ruleConfig,
    ApplicationELB: albConfig,
    ApplicationELBTarget: albTargetConfig,
    AppSync: appSyncConfig,
    enabled
  } = cascade(alarmProperties) as SlicWatchCascadedAlarmsConfig<SlicWatchMergedConfig>

  const funcsWithConfig: Array<{ config: SlicWatchMergedConfig, alarmFunc: any }> = [
    { config: apiGwConfig, alarmFunc: createApiGatewayAlarms },
    { config: sfConfig, alarmFunc: createStatesAlarms },
    { config: dynamoDbConfig, alarmFunc: createDynamoDbAlarms },
    { config: kinesisConfig, alarmFunc: createKinesisAlarms },
    { config: sqsConfig, alarmFunc: createSQSAlarms },
    { config: ecsConfig, alarmFunc: createECSAlarms },
    { config: snsConfig, alarmFunc: createSnsAlarms },
    { config: ruleConfig, alarmFunc: createRuleAlarms },
    { config: albConfig, alarmFunc: createAlbAlarms },
    { config: albTargetConfig, alarmFunc: createAlbTargetAlarms },
    { config: appSyncConfig, alarmFunc: createAppSyncAlarms },
    { config: lambdaConfig, alarmFunc: createLambdaAlarms }
  ]
  const resources = {}

  if (enabled) {
    for (const { config, alarmFunc } of funcsWithConfig) {
      Object.assign(resources, alarmFunc(config, alarmActionsConfig, compiledTemplate))
    }
  }
  for (const [resourceName, resource] of Object.entries(resources)) {
    addResource(resourceName, resource as Resource, compiledTemplate)
  }
}
