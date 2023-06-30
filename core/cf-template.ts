import pino from 'pino'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

import { filterObject } from './filter-object'

const logger = pino()

export type ResourceType = Record<string, Resource>

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
  if (func['Fn::GetAtt'] != null) {
    return func['Fn::GetAtt'][0]
  }
  if (func.Ref != null) {
    return func.Ref
  }
  logger.warn(`Unable to resolve function resource name from ${JSON.stringify(func)}`)
}

export function addResource (resourceName: string, resource: Resource, compiledTemplate: Template) {
  if (compiledTemplate.Resources != null) {
    compiledTemplate.Resources[resourceName] = resource
  }
}

export function getResourcesByType (type: string, compiledTemplate: Template): ResourceType {
  return filterObject(compiledTemplate.Resources ?? {}, (resource: { Type: string }) => resource.Type === type)
}

export function getEventSourceMappingFunctions (compiledTemplate): ResourceType {
  const eventSourceMappings = getResourcesByType(
    'AWS::Lambda::EventSourceMapping', compiledTemplate)
  const lambdaResources = getResourcesByType('AWS::Lambda::Function', compiledTemplate)
  const eventSourceMappingFunctions = {}
  for (const eventSourceMapping of Object.values(eventSourceMappings)) {
    const funcResourceName = resolveFunctionResourceName(
      eventSourceMapping.Properties?.FunctionName
    )
    if (funcResourceName != null) {
      const funcResource = lambdaResources[funcResourceName]
      if (funcResource != null) {
        eventSourceMappingFunctions[funcResourceName] = funcResource
      }
    }
  }
  return eventSourceMappingFunctions
}
