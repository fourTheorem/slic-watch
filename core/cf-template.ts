'use strict'

import { filterObject } from './filter-object'
import pino from 'pino'

const logger = pino()

type Resource = {
  Type: string
  Properties?: { [key: string]: Properties } 
  DependsOn?: []
}

export type CompiledTemplate = {
  AWSTemplateFormatVersion?: string
  Description?: string
  Resources?: Resource[] | {[key: string]: object} | undefined 
  Outputs?: {[key: string]: object} | undefined | object
}

export type AdditionalResources = {
  Resources?: Resource []
  
}

export default function CloudFormationTemplate  (compiledTemplate: CompiledTemplate, additionalResources?: AdditionalResources): CloudFormationTemplate  {
  /**
   * Take a CloudFormation reference to a Lambda Function name and attempt to resolve this function's
   * CloudFormation logical ID from within this stack
   *
   *The function logical ID or CloudFormation intrinsic resolving a function
   */
  function resolveFunctionLogicalId (func) {
    if (typeof func === 'string') {
      return func
    }
    if (func['Fn::GetAtt']) {
      return func['Fn::GetAtt'][0]
    }
    if (func.Ref) {
      return func.Ref
    }
    logger.warn(`Unable to resolve function resource name from ${JSON.stringify(func)}`)
  }

  function addResource(resourceName: string, resource: object): Metric {
    return compiledTemplate.Resources[resourceName] = resource
  }

  function getResourceByName (resourceName:string): ResourceType {
    return compiledTemplate.Resources[resourceName] || additionalResources[resourceName]
  }

  function getResourcesByType (type:string): ResourceType  {
    
    return filterObject(
      {
        ...compiledTemplate.Resources,
        ...additionalResources
      },
      (resource) => resource.Type === type
    )
  }

  function getEventSourceMappingFunctions () {
    const eventSourceMappings = getResourcesByType(
      'AWS::Lambda::EventSourceMapping'
    )
    const lambdaResources = getResourcesByType('AWS::Lambda::Function')
    const eventSourceMappingFunctions = {}
    for (const eventSourceMapping of Object.values(eventSourceMappings)) {
      const funcResourceName = resolveFunctionLogicalId(
        eventSourceMapping.Properties.FunctionName
      )
      if (funcResourceName) {
        const funcResource = lambdaResources[funcResourceName]
        if (funcResource) {
          eventSourceMappingFunctions[funcResourceName] = funcResource
        }
      }
    }
    return eventSourceMappingFunctions
  }

  function getSourceObject ():CompiledTemplate {
    return compiledTemplate
  }

  return {
    addResource,
    getResourceByName,
    getResourcesByType,
    getSourceObject,
    getEventSourceMappingFunctions,
    resolveFunctionResourceName: resolveFunctionLogicalId
  }
}

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
  getEventSourceMappingFunctions: () => object;
  resolveFunctionResourceName: (func: string|object) => object;
}

export type Statistic = 'Average'| 'Maximum'| 'Minimum'| 'SampleCount'| 'Sum' | 'p95'

export type Metric = {
resourceName?: string
resource?: CfResource
}

export type CfResource = {
Type?: string,
Properties?: Properties
DependsOn?: string[]
Metadata
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
Actions
ListenerArn
DefaultActions
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
LoadBalancerArn
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
EventPattern: object[]
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





