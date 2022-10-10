'use strict'

const { test } = require('tap')
const CloudFormationTemplate = require('../../core/cf-template')

const cdkStack = require('./resources/cdk-ecs-cf.json')
const cfMacroHandler = require('../index')

/**
 * Test the synthesized output from the CDK ECS Stack in `cdk-test-project`
 */
test('ECS CDK stack', async (t) => {
  const event = {
    fragment: cdkStack
  }
  const handlerResponse = await cfMacroHandler.handler(event)
  t.equal(handlerResponse.status, 'success')
  const transformedTemplate = CloudFormationTemplate(handlerResponse.fragment)

  test('alarms are generated', (t) => {
    const alarms = transformedTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
    t.equal(Object.keys(alarms).length, 8)
    t.end()
  })

  t.end()
})
