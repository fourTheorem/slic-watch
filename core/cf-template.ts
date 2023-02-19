'use strict'

import { filterObject } from './filter-object'
import pino from 'pino'
import {FunctionProperties} from 'cloudform-types/types/lambda/function'
import {TopicProperties} from 'cloudform-types/types/sns/topic'
import {QueueProperties} from 'cloudform-types/types/sqs/queue'
import {StateMachineProperties} from 'cloudform-types/types/stepFunctions/stateMachine'
import {StreamProperties} from 'cloudform-types/types/kinesis/stream'
import {RuleProperties} from 'cloudform-types/types/events/rule'
import {ServiceProperties} from 'cloudform-types/types/ecs/service'
import {TableProperties} from 'cloudform-types/types/dynamoDb/table'
import {GraphQLApiProperties} from 'cloudform-types/types/appsync/graphQlApi'
import {RestApiProperties} from 'cloudform-types/types/apiGateway/restApi'
import {TargetGroupProperties} from 'cloudform-types/types/elasticLoadBalancingV2/targetGroup'
import {ListenerProperties} from 'cloudform-types/types/elasticLoadBalancingV2/listener'
import {ListenerRuleProperties} from 'cloudform-types/types/elasticLoadBalancingV2/listenerRule'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"
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


export type Properties = TargetGroupProperties & ListenerProperties & ListenerRuleProperties & RestApiProperties & GraphQLApiProperties & TableProperties & ServiceProperties
& RuleProperties & StreamProperties & FunctionProperties & TopicProperties & QueueProperties & StateMachineProperties & AlarmProperties & DashboardProperties


// Common Alarm Properties
export type DashboardProperties = {
DashboardName?: string
DashboardBody?:object
}












