import { test } from 'tap'
import type Template from 'cloudform-types/types/template'
import { addResource, getEventSourceMappingFunctions, type ResourceType } from './../cf-template'

import { resolveFunctionResourceName, getResourcesByType } from '../cf-template'

test('Function resource name can be resolved using Ref', (t) => {
  const resName = resolveFunctionResourceName({ Ref: 'res1' })
  t.equal(resName, 'res1')
  t.end()
})

test('Function resource name can be resolved using name', (t) => {
  const resName = resolveFunctionResourceName('resName1')
  t.equal(resName, 'resName1')
  t.end()
})

test('Resource can be resolved by type from compiled template', (t) => {
  const compiledTemplate: Template = {
    Resources: {
      a: { Type: 'AWS::DynamoDB::Table' }
    }
  }
  const resources = getResourcesByType('AWS::DynamoDB::Table', compiledTemplate)
  t.equal(Object.keys(resources).length, 1)
  t.equal(Object.values(resources)[0].Type, 'AWS::DynamoDB::Table')
  t.end()
})

test('Resource can be resolved by type from template with additional resource ', (t) => {
  const compiledTemplate = {
    Resources: {
      a: { Type: 'AWS::DynamoDB::Table' }
    }
  }
  const additionalResources = {
    Resources: {
      b: { Type: 'AWS::SQS::Queue' }
    }
  }
  const tableResources = getResourcesByType('AWS::DynamoDB::Table', compiledTemplate)
  for (const [, tableResource] of Object.entries(tableResources)) {
    t.equal(tableResource.Type, 'AWS::DynamoDB::Table')
  }
  const queueResources = getResourcesByType('AWS::SQS::Queue', additionalResources)
  for (const [, queueResource] of Object.entries(queueResources)) {
    t.equal(queueResource.Type, 'AWS::SQS::Queue')
  }
  t.end()
})

test('Resource can be resolved by type from service resources', (t) => {
  const serviceResources: ResourceType = {
    b: { Type: 'AWS::DynamoDB::Table' }
  }
  const resources = getResourcesByType('AWS::DynamoDB::Table', serviceResources)
  for (const [, tableResource] of Object.entries(resources)) {
    t.equal(tableResource.Type, 'AWS::DynamoDB::Table')
  }
  t.end()
})

test('Function resource name can be resolved using GetAtt', (t) => {
  const resName = resolveFunctionResourceName({
    'Fn::GetAtt': ['resName2', 'Arn']
  })
  t.equal(resName, 'resName2')
  t.end()
})

test('Function resource name is undefined otherwise', (t) => {
  const resName = resolveFunctionResourceName({})
  t.equal(typeof resName, 'undefined')
  t.end()
})

test('should noat affect the compiled template if the resources are missing', (t) => {
  const compiledTemplate = {}
  addResource('testResource', { Type: 'MissingResources' }, compiledTemplate)
  t.same(Object.keys(compiledTemplate), [])
  t.end()
})

test('should not contain any event source mapping functions when the lambda is not found', (t) => {
  const compiledTemplate = {
    Resources: {
      eventMapping: { Type: 'AWS::Lambda::EventSourceMapping', Properties: { FunctionName: 'testFunction' } },
      MyTestFunction: { Type: 'AWS::Lambda::Function' }
    }
  }
  const result = getEventSourceMappingFunctions(compiledTemplate)
  t.same(Object.keys(result), [])
  t.end()
})
