'use strict'

const dashboard = require('../dashboard')
const CloudFormationTemplate = require('../cf-template')

const { test } = require('tap')

const sls = {}
const config = {
  stackName: 'testStack',
  region: 'eu-west-1',
}

test('An empty template creates a dashboard', (t) => {
  const dash = dashboard(sls, config)
  const cfTemplate = CloudFormationTemplate(
    {
      Resources: [],
    },
    sls
  )
  dash.addDashboard(cfTemplate)

  const dashResources = cfTemplate.getResourcesByType(
    'AWS::CloudWatch::Dashboard'
  )
  t.equal(Object.keys(dashResources).length, 1)
  const [, dashResource] = Object.entries(dashResources)[0]
  t.equal(dashResource.Properties.DashboardName, 'testStackDashboard')
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody)
  t.ok(dashBody.start)
  const widgets = dashBody.widgets
  t.equal(widgets.length, 7)
  t.end()
})

test('A dashboard includes Lambda metrics', (t) => {
  const dash = dashboard(sls, config)
  const cfTemplate = CloudFormationTemplate(
    require('./resources/cloudformation-template-stack.json'),
    sls
  )
  dash.addDashboard(cfTemplate)

  const dashResources = cfTemplate.getResourcesByType(
    'AWS::CloudWatch::Dashboard'
  )
  t.equal(Object.keys(dashResources).length, 1)
  const [, dashResource] = Object.entries(dashResources)[0]
  t.equal(dashResource.Properties.DashboardName, 'testStackDashboard')
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody)
  t.ok(dashBody.start)
  const widgets = dashBody.widgets
  t.equal(widgets.length, 8)
  const expectedTitles = [
    'Duration Average per Function',
    'Duration p95 per Function',
    'Duration Maximum per Function',
    'Invocations Sum per Function',
    'IteratorAge Maximum per Function',
    'ConcurrentExecutions Maximum per Function',
    'Throttles Sum per Function',
    'Errors Sum per Function',
  ].sort()
  const actualTitles = widgets.map((widget) => widget.properties.title).sort()
  t.same(expectedTitles, actualTitles)
  t.end()
})
