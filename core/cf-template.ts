import { type } from 'case';
'use strict'

const { filterObject } = require('./util')
const { getLogger } = require('./logging')

const logger = getLogger()

// type ResourceType = {
//   Name: string
//   Type: string
//   Properties: object
//   DependsOn: []
// }

// type CompiledTemplate = {
//   AWSTemplateFormatVersion: string
//   Description: string
//   Resources: ResourceType[] 
//   Outputs: object
// }

// type AdditionalResources = {
//   Resources: ResourceType []
  
// }

/**
 * Encapsulate a CloudFormation template comprised of compiled Serverless functions/events
 * and directly-specified CloudFormation resources
 *
 * compiledTemplate The compiled CloudFormation template
 * additionalResources Directly-provided CloudFormation resources which are not expected to be included in `compiledTemplate`
 */
export default function CloudFormationTemplate (compiledTemplate, additionalResources) {
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

  function addResource(resourceName: string, resource: object) {
    compiledTemplate.Resources[resourceName] = resource
  }

  function getResourceByName (resourceName:string) {
    return compiledTemplate.Resources[resourceName] || additionalResources[resourceName]
  }

  function getResourcesByType (type:string) {
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

  function getSourceObject () {
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
