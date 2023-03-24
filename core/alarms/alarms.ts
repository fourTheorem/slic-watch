
import { cascade } from '../inputs/cascading-config'
import type { SlicWatchAlarmsConfig } from '../inputs/cascading-config'
import { applyAlarmConfig } from '../inputs/function-config'
import type { FunctionAlarmProperties, Context } from './default-config-alarms'
import type Template from 'cloudform-types/types/template'

import createLambdaAlarms from './lambda'
import createApiGatewayAlarms from './api-gateway'
import createStatesAlarms from './step-functions'
import createDynamoDbAlarms from './dynamodb'
import createKinesisAlarms from './kinesis'
import createSQSAlarms from './sqs'
import createECSAlarms from './ecs'
import createSNSAlarms from './sns'
import createRuleAlarms from './eventbridge'
import createALBAlarms from './alb'
import createALBTargetAlarms from './alb-target-group'
import createAppSyncAlarms from './appsync'
import { addResource } from '../cf-template'
import type Resource from 'cloudform-types/types/resource'

export default function addAlarms (alarmProperties: SlicWatchAlarmsConfig, functionAlarmProperties: FunctionAlarmProperties, context: Context, compiledTemplate: Template): void {
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
  } = cascade(alarmProperties) as SlicWatchAlarmsConfig

  const cascadedFunctionAlarmProperties = applyAlarmConfig(lambdaConfig, functionAlarmProperties)

  const alarmFunctions = [createLambdaAlarms, createApiGatewayAlarms, createStatesAlarms, createDynamoDbAlarms, createKinesisAlarms, createSQSAlarms,
    createECSAlarms, createSNSAlarms, createRuleAlarms, createALBAlarms, createALBTargetAlarms, createAppSyncAlarms]
  const alarmConfigs = [cascadedFunctionAlarmProperties, apiGwConfig, sfConfig, dynamoDbConfig, kinesisConfig, sqsConfig, ecsConfig, snsConfig, ruleConfig,
    albConfig, albTargetConfig, appSyncConfig]

  const resources = {}
  Object.assign(resources,
    ...alarmFunctions.map((alarmFn, i) => {
      const config: any = alarmConfigs[i]
      if (config?.enabled !== false || i === 0) {
        return alarmFn(config, context, compiledTemplate) ?? {}
      }
      return {}
    }))
  for (const resourceName in resources) {
    addResource(resourceName, resources[resourceName] as Resource, compiledTemplate)
  }
}
