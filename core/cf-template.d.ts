/**
 * Encapsulate a CloudFormation template comprised of compiled Serverless functions/events
 * and directly-specified CloudFormation resources
 *
 * compiledTemplate The compiled CloudFormation template
 * additionalResources Directly-provided CloudFormation resources which are not expected to be included in `compiledTemplate`
 */
export interface CloudFormationTemplate {
    addResource: (resourceName: string, resource: object) => void;
    getResourceByName: (resourceName: string) => ResourceType;
    getResourcesByType: (type: string) => ResourceType;
    getSourceObject: () => object;
    getEventSourceMappingFunctions: () => object;
    resolveFunctionResourceName: (func: object) => object;
}

export type Metric = {
  resourceName?: string
  resource?: CfResource
}

export type CfResource = {
  Type?: string,
  Properties?: Properties
}

export type ResourceType = {
  [key: string]: CfResource
}


export type Properties = AlbTargetGroupProperties & AlbProperties& ApiGatewayProperties & AppSync & DynamoDBProperties & EcsProperties
 & EventBridgeProperties & KinesisProperties & LambdaProperties & SnsProperties & SqsProperties & CommonAlarmProperties


 // Common Alarm
 export type CommonAlarmProperties = {
  ActionsEnabled: boolean
  AlarmActions: string[]
  AlarmName: string
  AlarmDescription: string
  EvaluationPeriods: number
  ComparisonOperator: string
  TreatMissingData: string
  Dimensions: string[]
  MetricName: string
  Namespace: string
  Period: number
  Statistic: string
  ExtendedStatistic?: string

}


// Alb Target Group
export type AlbTargetGroupProperties = {
  TargetType: string
}

// Alb
export type AlbProperties = {
  Name: string
  Type: string
}

// Api Gateway
export type ApiGatewayProperties = {
  Name: string
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
}

// EventBridge
export type EventBridgeProperties = {
  Name: string
}

// Kinesis
export type KinesisProperties = {
  Name: string
}

// Lambda
export type LambdaProperties = {
  Timeout: number
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




