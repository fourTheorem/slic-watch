'use strict'

const { test } = require('tap')

const alarms = require('../alarms')
const defaultConfig = require('../default-config')
const CloudFormationTemplate = require('../cf-template')

test('Alarms create all service alarms', (t) => {
  const sls = {
    cli: {
      log: () => {}
    }
  }

  const context = {
    topicArn: 'dummy-arn',
    stackName: 'testStack',
    region: 'eu-west-1'
  }

  const { addAlarms } = alarms(sls, defaultConfig.alarms, context)
  const cfTemplate = CloudFormationTemplate(
    require('./resources/cloudformation-template-stack.json'),
    sls
  )
  addAlarms(cfTemplate)
  const namespaces = new Set()
  for (const resource of Object.values(
    cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  )) {
    if (resource.Properties.Namespace) {
      namespaces.add(resource.Properties.Namespace)
    }
  }
  t.same(namespaces, new Set(['AWS/Lambda', 'AWS/ApiGateway']))
  t.end()
})
