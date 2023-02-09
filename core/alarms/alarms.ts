'use strict'

import { AlarmsCascade, cascade } from '../cascading-config'
import { applyAlarmConfig } from '../function-config'
import { FunctionAlarmConfigs, Context } from './default-config-alarms'
import { CloudFormationTemplate } from '../cf-template.d'

import lambdaAlarms, { LambdaFunctionAlarmConfigs } from './lambda'
import apiGatewayAlarms from './api-gateway'
import stepFunctionAlarms from './step-functions'
import dynamoDbAlarms from './dynamodb'
import kinesisAlarms from './kinesis'
import sqsAlarms from './sqs'
import ecsAlarms from './ecs'
import snsAlarms from './sns'
import ruleAlarms from './eventbridge'
import albAlarms from './alb'
import albTargetAlarms from './alb-target-group'
import appSyncAlarms from './appsync'

export default function alarms (alarmConfig:AlarmsCascade , functionAlarmConfigs: FunctionAlarmConfigs, context: Context) {
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
    AppSync: appSyncConfig
  } = cascade(alarmConfig)

  const cascadedFunctionAlarmConfigs = applyAlarmConfig(lambdaConfig, functionAlarmConfigs )
  const { createLambdaAlarms } = lambdaAlarms(cascadedFunctionAlarmConfigs, context)
  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwConfig, context)
  const { createStatesAlarms } = stepFunctionAlarms(sfConfig, context)
  const { createDynamoDbAlarms } = dynamoDbAlarms(dynamoDbConfig, context)
  const { createKinesisAlarms } = kinesisAlarms(kinesisConfig, context)
  const { createSQSAlarms } = sqsAlarms(sqsConfig, context)
  const { createECSAlarms } = ecsAlarms(ecsConfig, context)
  const { createSNSAlarms } = snsAlarms(snsConfig, context)
  const { createRuleAlarms } = ruleAlarms(ruleConfig, context)
  const { createALBAlarms } = albAlarms(albConfig, context)
  const { createALBTargetAlarms } = albTargetAlarms(albTargetConfig, context)
  const { createAppSyncAlarms } = appSyncAlarms(appSyncConfig, context)
  return {
    addAlarms
  }

  /**
   * Add all required alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * A CloudFormation template object
   */
  function addAlarms (cfTemplate: CloudFormationTemplate) {
    if (alarmConfig.enabled) {
      createLambdaAlarms(cfTemplate)
      apiGwConfig.enabled && createApiGatewayAlarms(cfTemplate)
      sfConfig.enabled && createStatesAlarms(cfTemplate)
      dynamoDbConfig.enabled && createDynamoDbAlarms(cfTemplate)
      kinesisConfig.enabled && createKinesisAlarms(cfTemplate)
      sqsConfig.enabled && createSQSAlarms(cfTemplate)
      ecsConfig.enabled && createECSAlarms(cfTemplate)
      snsConfig.enabled && createSNSAlarms(cfTemplate)
      ruleConfig.enabled && createRuleAlarms(cfTemplate)
      albConfig.enabled && createALBAlarms(cfTemplate)
      albTargetConfig.enabled && createALBTargetAlarms(cfTemplate)
      appSyncConfig.enabled && createAppSyncAlarms(cfTemplate)
    }
  }
}
