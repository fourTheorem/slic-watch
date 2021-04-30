'use strict'

const CloudFormationTemplate = require('../cf-template')

const { test } = require('tap')

const sls = {
  cli: {
    log: () => {}
  }
}

const emptyTemplate = {
  Resources: {}
}

test('Source is returned', (t) => {
  const template = CloudFormationTemplate(emptyTemplate, {}, sls)
  t.same(template.getSourceObject(), emptyTemplate)
  t.end()
})

test('Function resource name can be resolved using Ref', (t) => {
  const template = CloudFormationTemplate(emptyTemplate, {}, sls)
  const resName = template.resolveFunctionResourceName({ Ref: 'res1' })
  t.equal(resName, 'res1')
  t.end()
})

test('Function resource name can be resolved using name', (t) => {
  const template = CloudFormationTemplate(emptyTemplate, {}, sls)
  const resName = template.resolveFunctionResourceName('resName1')
  t.equal(resName, 'resName1')
  t.end()
})

test('Resource can be resolved by type from compiled template', (t) => {
  const compiledTemplate = {
    Resources: {
      a: { Type: 'AWS::DynamoDB::Table' }
    }
  }
  const template = CloudFormationTemplate(compiledTemplate, {}, sls)
  const resources = template.getResourcesByType('AWS::DynamoDB::Table')
  t.equal(Object.keys(resources).length, 1)
  t.equal(Object.values(resources)[0].Type, 'AWS::DynamoDB::Table')
  t.end()
})

test('Resource can be resolved by type from service resources', (t) => {
  const compiledTemplate = {}
  const serviceResources = {
    a: { Type: 'AWS::DynamoDB::Table' }
  }
  const template = CloudFormationTemplate(compiledTemplate, serviceResources, sls)
  const resources = template.getResourcesByType('AWS::DynamoDB::Table')
  t.equal(Object.keys(resources).length, 1)
  t.equal(Object.values(resources)[0].Type, 'AWS::DynamoDB::Table')
  t.end()
})

test('Function resource name can be resolved using GetAtt', (t) => {
  const template = CloudFormationTemplate(emptyTemplate, {}, sls)
  const resName = template.resolveFunctionResourceName({
    'Fn::GetAtt': ['resName2', 'Arn']
  })
  t.equal(resName, 'resName2')
  t.end()
})

test('Function resource name is undefined otherwise', (t) => {
  const template = CloudFormationTemplate(emptyTemplate, {}, sls)
  const resName = template.resolveFunctionResourceName({})
  t.equal(typeof resName, 'undefined')
  t.end()
})
