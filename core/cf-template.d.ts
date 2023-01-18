/**
 * Encapsulate a CloudFormation template comprised of compiled Serverless functions/events
 * and directly-specified CloudFormation resources
 *
 * compiledTemplate The compiled CloudFormation template
 * additionalResources Directly-provided CloudFormation resources which are not expected to be included in `compiledTemplate`
 */
export interface CloudFormationTemplate {
    addResource: (resourceName: string, resource: object) => Metric;
    getResourceByName: (resourceName: string) => ResourceType;
    getResourcesByType: (type: string) => ResourceType;
    getSourceObject: () => CompiledTemplate;
    getEventSourceMappingFunctions: () => FunctionAlarmConfigs;
    resolveFunctionResourceName: (func: object) => object;
}

export type Statistic = 'Average'| 'Maximum'| 'Minimum'| 'SampleCount'| 'Sum'
// export enum Statistic {'Average', 'Maximum', 'Minimum', 'SampleCount', 'Sum'}

export type Metric = {
  resourceName?: string
  resource?: CfResource
}

export type CfResource = {
  Type?: string,
  Properties?: Properties
  DependsOn?: string[]
}

export type ResourceType = {
  [key: string]: CfResource
}


export type Properties = AlbTargetGroupProperties & AlbProperties& ApiGatewayProperties & AppSync & DynamoDBProperties & EcsProperties
 & EventBridgeProperties & KinesisProperties & LambdaProperties & SnsProperties & SqsProperties & SmProperties & CommonAlarmProperties


 // Common Alarm Properties
 export type CommonAlarmProperties = {
  ActionsEnabled: boolean
  AlarmActions: string[]
  AlarmName: string
  AlarmDescription: string
  EvaluationPeriods: number
  ComparisonOperator: string
  Threshold: number
  TreatMissingData: string
  Dimensions: string[]
  MetricName: string
  Namespace: string
  Period: number
  Statistic: Statistic
  ExtendedStatistic?: string
  DashboardName?: string
  DashboardBody?:object
}


// Alb Target Group
export type AlbTargetGroupProperties = {
  TargetType: string
  Targets: object[],
  Name: string
  Tags: object[]
  TargetGroupAttributes: object[],
  HealthCheckEnabled: boolean
  HealthCheckPath: string
  HealthCheckIntervalSeconds: number
  HealthyThresholdCount: number
  UnhealthyThresholdCount: number
  Matcher: object
}

// Alb
export type AlbProperties = {
  Name: string
  Type: string
  Subnets: []
  SecurityGroups: []
}

// Api Gateway
export type ApiGatewayProperties = {
  Name: string
  BinaryMediaTypes: object
  DisableExecuteApiEndpoint: object
  EndpointConfiguration: object[]
  Policy: string
}

// AppSync
export type AppSync = {
  Name: string
}

// DynamoDB
export type DynamoDBProperties = {
  TableName: string
  ProvisionedThroughput: object
  AttributeDefinitions: object[]
  KeySchema: object[]
  GlobalSecondaryIndexes: Indexes[]
  LocalSecondaryIndexes: object[]
}
type Indexes = {
  IndexName: string
}

// Ecs
export type EcsProperties = {
  ServiceName: string
  Cluster: object
  DesiredCount: 0
  LaunchType: string
  TaskDefinition: object[]
  NetworkConfiguration: object[]
}

// EventBridge
export type EventBridgeProperties = {
  EventBusName: object
  EventPattern: obejct[]
  Name: string
  ScheduleExpression: object
  State: string
  Targets: []
}

// Kinesis
export type KinesisProperties = {
  Name: string
  ShardCount: number
}

// Lambda
export type LambdaProperties = {
  Code: object
  Handler: string
  Runtime: string
  FunctionName: string
  MemorySize: number
  Timeout: number
  Role: object[]
}

// SNS
 export type SnsProperties = {
  TopicName: string
 }

 // SQS
 export type SqsProperties = {
  QueueName: string
  FifoQueue: boolean
 }

 // Step Function
 export type SmProperties = {
  DefinitionString: object
  RoleArn: object
  StateMachineType: string
  LoggingConfiguration: object
  TracingConfiguration: object
  StateMachineName: string
 }




