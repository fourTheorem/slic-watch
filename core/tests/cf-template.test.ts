'use strict'

import CloudFormationTemplate, {CompiledTemplate,AdditionalResources } from '../cf-template'

import { test } from 'tap'

const emptyTemplate:CompiledTemplate  = {
  Resources: []
}

test('Source is returned', (t) => {
  const template = CloudFormationTemplate(emptyTemplate)
  t.same(template.getSourceObject(), emptyTemplate)
  t.end()
})

test('Function resource name can be resolved using Ref', (t) => {
  const template = CloudFormationTemplate(emptyTemplate)
  const resName = template.resolveFunctionResourceName({ Ref: 'res1' })
  t.equal(resName, 'res1')
  t.end()
})

test('Function resource name can be resolved using name', (t) => {
  const template = CloudFormationTemplate(emptyTemplate)
  const resName = template.resolveFunctionResourceName('resName1')
  t.equal(resName, 'resName1')
  t.end()
})

test('Resource can be resolved by type from compiled template', (t) => {
  const compiledTemplate:CompiledTemplate = {
    Resources: [
      { Type: 'AWS::DynamoDB::Table' }
    ]
  }
  const template = CloudFormationTemplate(compiledTemplate, {})
  const resources = template.getResourcesByType('AWS::DynamoDB::Table')
  t.equal(Object.keys(resources).length, 1)
  t.equal(Object.values(resources)[0].Type, 'AWS::DynamoDB::Table')
  t.end()
})

test('Resource can be resolved by type from template with additional resource ', (t) => {
  const compiledTemplate = {
    Resources: [
      { Type: 'AWS::DynamoDB::Table' }
    ]
  }
  const additionalResources: AdditionalResources = {
    Resources:[
      { Type: 'AWS::SQS::Queue' }
    ]
  }
  const template = CloudFormationTemplate(compiledTemplate, additionalResources) 
  
  const tableResources = template.getResourcesByType('AWS::DynamoDB::Table')
  for (const [, tableResource] of Object.entries(tableResources)) {
    t.equal(tableResource.Type, 'AWS::DynamoDB::Table')
  }
  const queueResources = template.getResourcesByType('AWS::SQS::Queue')
  for (const [, queueResource] of Object.entries(queueResources)) {
    t.equal(queueResource.Type, 'AWS::SQS::Queue')
  } 
  t.end()
})

test('Resource can be resolved by type from service resources', (t) => {
  const compiledTemplate: CompiledTemplate = {}
  const serviceResources:AdditionalResources = {
    Resources: [
      { Type: 'AWS::DynamoDB::Table' }
    ]
  }
  const template = CloudFormationTemplate(compiledTemplate, serviceResources)
  const resources = template.getResourcesByType('AWS::DynamoDB::Table')
  for (const [, tableResource] of Object.entries(resources)) {
    t.equal(tableResource.Type, 'AWS::DynamoDB::Table')
  }
  t.end()
})

test('Function resource name can be resolved using GetAtt', (t) => {
  const template = CloudFormationTemplate(emptyTemplate)
  const resName = template.resolveFunctionResourceName({
    'Fn::GetAtt': ['resName2', 'Arn']
  })
  t.equal(resName, 'resName2')
  t.end()
})

test('Function resource name is undefined otherwise', (t) => {
  const template = CloudFormationTemplate(emptyTemplate)
  const resName = template.resolveFunctionResourceName({})
  t.equal(typeof resName, 'undefined')
  t.end()
})
