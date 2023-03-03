
import { filterObject } from './filter-object'
import pino from 'pino'
import { FunctionProperties } from 'cloudform-types/types/lambda/function'
import { TopicProperties } from 'cloudform-types/types/sns/topic'
import { QueueProperties } from 'cloudform-types/types/sqs/queue'
import { StateMachineProperties } from 'cloudform-types/types/stepFunctions/stateMachine'
import { StreamProperties } from 'cloudform-types/types/kinesis/stream'
import { RuleProperties } from 'cloudform-types/types/events/rule'
import { ServiceProperties } from 'cloudform-types/types/ecs/service'
import { TableProperties } from 'cloudform-types/types/dynamoDb/table'
import { RestApiProperties } from 'cloudform-types/types/apiGateway/restApi'
import { TargetGroupProperties } from 'cloudform-types/types/elasticLoadBalancingV2/targetGroup'
import { ListenerProperties } from 'cloudform-types/types/elasticLoadBalancingV2/listener'
import { ListenerRuleProperties } from 'cloudform-types/types/elasticLoadBalancingV2/listenerRule'
import { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import { DashboardProperties } from 'cloudform-types/types/cloudWatch/dashboard'
import Resource from 'cloudform-types/types/resource'
import Template from 'cloudform-types/types/template'

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
export function resolveFunctionResourceName (func) {
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
  compiledTemplate.Resources[resourceName] = resource
}

export function getResourcesByType (type: string, compiledTemplate, additionalResources = {}): ResourceType {
  const resources = Object.assign({}, compiledTemplate.Resources, additionalResources)
  return filterObject(resources, resource => resource.Type === type)
}

export function getEventSourceMappingFunctions (compiledTemplate, additionalResources = {}): ResourceType {
  const eventSourceMappings = getResourcesByType(
    'AWS::Lambda::EventSourceMapping', compiledTemplate, additionalResources)
  const lambdaResources = getResourcesByType('AWS::Lambda::Function', compiledTemplate, additionalResources)
  const eventSourceMappingFunctions = {}
  for (const eventSourceMapping of Object.values(eventSourceMappings)) {
    const funcResourceName = resolveFunctionResourceName(
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
