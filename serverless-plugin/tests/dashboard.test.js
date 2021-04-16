'use strict'

const dashboard = require('../dashboard')
const CloudFormationTemplate = require('../cf-template')

const { test } = require('tap')

const sls = {}
const config = {}
const context = {
  stackName: 'testStack',
  region: 'eu-west-1',
}

test('An empty template creates a dashboard', (t) => {
  const dash = dashboard(sls, config, context)
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

test('A dashboard includes metrics', (t) => {
  const dash = dashboard(sls, config, context)
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

  t.test('dashboards includes Lambda metrics', (t) => {
    const widgets = dashBody.widgets.filter((widget) =>
      widget.properties.title.endsWith('Function')
    )
    t.equal(widgets.length, 8)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/Lambda']))
    const expectedTitles = new Set([
      'Duration Average per Function',
      'Duration p95 per Function',
      'Duration Maximum per Function',
      'Invocations Sum per Function',
      'IteratorAge Maximum per Function',
      'ConcurrentExecutions Maximum per Function',
      'Throttles Sum per Function',
      'Errors Sum per Function',
    ])
    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(expectedTitles, actualTitles)
    t.end()
  })

  t.test('dashboards includes API metrics', (t) => {
    const dashResources = cfTemplate.getResourcesByType(
      'AWS::CloudWatch::Dashboard'
    )
    t.equal(Object.keys(dashResources).length, 1)
    const [, dashResource] = Object.entries(dashResources)[0]
    t.equal(dashResource.Properties.DashboardName, 'testStackDashboard')
    const dashBody = JSON.parse(dashResource.Properties.DashboardBody)
    t.ok(dashBody.start)
    const widgets = dashBody.widgets.filter((widget) =>
      widget.properties.title.endsWith('API')
    )
    t.equal(widgets.length, 4)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/ApiGateway']))
    const expectedTitles = new Set([
      '4XXError for dev-serverless-test-project API',
      '5XXError for dev-serverless-test-project API',
      'Count for dev-serverless-test-project API',
      'Latency for dev-serverless-test-project API',
    ])
    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(expectedTitles, actualTitles)
    t.end()
  })
  t.end()
})
