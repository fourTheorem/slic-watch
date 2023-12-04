export enum ConfigType {
  Lambda = 'Lambda',
  ApiGateway = 'ApiGateway',
  States = 'States',
  DynamoDB = 'DynamoDB',
  Kinesis = 'Kinesis',
  SQS = 'SQS',
  ECS = 'ECS',
  SNS = 'SNS',
  Events = 'Events',
  ApplicationELB = 'ApplicationELB',
  ApplicationELBTarget = 'ApplicationELBTarget',
  AppSync = 'AppSync'
}

export const cfTypeByConfigType = {
  [ConfigType.Lambda]: 'AWS::Lambda::Function',
  [ConfigType.ApiGateway]: 'AWS::ApiGateway::RestApi',
  [ConfigType.States]: 'AWS::StepFunctions::StateMachine',
  [ConfigType.DynamoDB]: 'AWS::DynamoDB::Table',
  [ConfigType.Kinesis]: 'AWS::Kinesis::Stream',
  [ConfigType.SQS]: 'AWS::SQS::Queue',
  [ConfigType.ECS]: 'AWS::ECS::Service',
  [ConfigType.SNS]: 'AWS::SNS::Topic',
  [ConfigType.Events]: 'AWS::Events::Rule',
  [ConfigType.ApplicationELB]: 'AWS::ElasticLoadBalancingV2::LoadBalancer',
  [ConfigType.ApplicationELBTarget]: 'AWS::ElasticLoadBalancingV2::TargetGroup',
  [ConfigType.AppSync]: 'AWS::AppSync::GraphQLApi'
}

export const configTypesByCfType = Object.fromEntries(Object.entries(cfTypeByConfigType).map(
  ([configType, cfType]) => [cfType, configType] as [string, ConfigType]
))
