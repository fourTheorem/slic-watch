
import { filterObject } from './filter-object'
import pino from 'pino'
import { type FunctionProperties } from 'cloudform-types/types/lambda/function'
import { type TopicProperties } from 'cloudform-types/types/sns/topic'
import { type QueueProperties } from 'cloudform-types/types/sqs/queue'
import { type StateMachineProperties } from 'cloudform-types/types/stepFunctions/stateMachine'
import { type StreamProperties } from 'cloudform-types/types/kinesis/stream'
import { type RuleProperties } from 'cloudform-types/types/events/rule'
import { type ServiceProperties } from 'cloudform-types/types/ecs/service'
import { type TableProperties } from 'cloudform-types/types/dynamoDb/table'
import { type RestApiProperties } from 'cloudform-types/types/apiGateway/restApi'
import { type TargetGroupProperties } from 'cloudform-types/types/elasticLoadBalancingV2/targetGroup'
import { type ListenerProperties } from 'cloudform-types/types/elasticLoadBalancingV2/listener'
import { type ListenerRuleProperties } from 'cloudform-types/types/elasticLoadBalancingV2/listenerRule'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import { type DashboardProperties } from 'cloudform-types/types/cloudWatch/dashboard'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

const logger = pino()

export type ResourceType = Record<string, Resource>

export type Statistic = 'Average' | 'Maximum' | 'Minimum' | 'SampleCount' | 'Sum' | 'p95'

// (compiledTemplate: Template, additionalResources: ResourceType = {})

export type Properties = TargetGroupProperties & ListenerProperties & ListenerRuleProperties & RestApiProperties & TableProperties & ServiceProperties
& RuleProperties & StreamProperties & FunctionProperties & TopicProperties & QueueProperties & StateMachineProperties & AlarmProperties & DashboardProperties

/**
   * Take a CloudFormation reference to a Lambda Function name and attempt to resolve this function's
   * CloudFormation logical ID from within this stack
   *
   *The function logical ID or CloudFormation intrinsic resolving a function
   */
export function resolveFunctionResourceName (func): string | undefined {
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

export function addResource (resourceName: string, resource: Resource, compiledTemplate: Template) {
  if (compiledTemplate.Resources) {
    compiledTemplate.Resources[resourceName] = resource
  } else {
    compiledTemplate.Resources = { [resourceName]: resource }
  }
}

export function getResourcesByType (type: string, compiledTemplate: Template, additionalResources = {}): ResourceType {
  const resources = Object.assign({}, compiledTemplate.Resources, additionalResources)
  return filterObject(resources, (resource: { Type: string }) => resource.Type === type)
}

export function getEventSourceMappingFunctions (compiledTemplate, additionalResources = {}): ResourceType {
  const eventSourceMappings = getResourcesByType(
    'AWS::Lambda::EventSourceMapping', compiledTemplate, additionalResources)
  const lambdaResources = getResourcesByType('AWS::Lambda::Function', compiledTemplate, additionalResources)
  const eventSourceMappingFunctions = {}
  for (const eventSourceMapping of Object.values(eventSourceMappings)) {
    const funcResourceName = resolveFunctionResourceName(
      eventSourceMapping.Properties?.FunctionName
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
