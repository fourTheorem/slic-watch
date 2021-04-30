'use strict'

const { filterObject } = require('./util')

/**
 * Encapsulate a CloudFormation template comprised of compiled Serverless functions/events
 * and directly-specified CloudFormation resources
 *
 * @param {object} compiledTemplate The compiled CloudFormation template
 * @param {object} serviceResources Directly-provided CloudFormation resources (from serverless.yml resources.Resources)
 * @param {object} serverless The Serverless Framework instance
 */
module.exports = function CloudFormationTemplate (compiledTemplate, serviceResources, serverless) {
  /**
   * Take a function or resource name and resolve the function resource name in the current stack
   *
   * @param {(string|Object)} func The function or CloudFormation intrinsic resolving a function
   */
  function resolveFunctionResourceName (func, funcResources) {
    if (typeof func === 'string') {
      return func
    }
    if (func['Fn::GetAtt']) {
      return func['Fn::GetAtt'][0]
    }
    if (func.Ref) {
      return func.Ref
    }
    serverless.cli.log(
      `WARNING: Unable to resolve function resource name from ${JSON.stringify(
        func
      )}`
    )
  }

  function addResource (resourceName, resource) {
    compiledTemplate.Resources[resourceName] = resource
  }

  function getResourcesByType (type) {
    return filterObject(
      {
        ...compiledTemplate.Resources,
        ...serviceResources
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

  function getSourceObject () {
    return compiledTemplate
  }

  return {
    addResource,
    getResourcesByType,
    getSourceObject,
    getEventSourceMappingFunctions,
    resolveFunctionResourceName
  }
}
