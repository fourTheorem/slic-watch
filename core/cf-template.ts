'use strict'
// @ts-ignore
import { type } from 'case';
import { CloudFormationTemplate, ResourceType, Properties } from './cf-template.d'

import { filterObject } from './util'
import { getLogger } from './logging'

const logger = getLogger()

// type Resource = {
//   Name?: string
//   Type: string
//   Properties: Properties
//   DependsOn?: []
// }

// type CompiledTemplate = {
//   AWSTemplateFormatVersion: string
//   Description: string
//   Resources: Resource[] 
//   Outputs: object
// }

// type AdditionalResources = {
//   Resources: Resource []
  
// }

export default function CloudFormationTemplate  (compiledTemplate, additionalResources?):CloudFormationTemplate  {
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

  function getResourcesByType (type:string):ResourceType  {
    
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
        // @ts-ignore
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
