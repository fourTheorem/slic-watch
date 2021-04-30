'use strict'

const dashboard = require('../dashboard')
const CloudFormationTemplate = require('../cf-template')

const { test } = require('tap')

const sls = {}
const config = {
  timeRange: {
    start: '-PT3H'
  },
  metricPeriod: 300,
  layout: {
    widgetWidth: 8,
    widgetHeight: 6
  }
}

const context = {
  stackName: 'testStack',
  region: 'eu-west-1'
}

test('An empty template creates a dashboard', (t) => {
  const dash = dashboard(sls, config, context)
  const cfTemplate = CloudFormationTemplate(
    {
      Resources: []
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
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])
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
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])

  t.ok(dashBody.start)

  t.test('dashboards includes Lambda metrics', (t) => {
    const widgets = dashBody.widgets.filter((widget) =>
      widget.properties.title.endsWith('per Function')
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
      'Lambda Duration Average per Function',
      'Lambda Duration p95 per Function',
      'Lambda Duration Maximum per Function',
      'Lambda Invocations Sum per Function',
      'Lambda IteratorAge Maximum per Function',
      'Lambda ConcurrentExecutions Maximum per Function',
      'Lambda Throttles Sum per Function',
      'Lambda Errors Sum per Function'
    ])
    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(expectedTitles, actualTitles)
    t.end()
  })

  t.test('dashboards includes API metrics', (t) => {
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
      'Latency for dev-serverless-test-project API'
    ])
    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(expectedTitles, actualTitles)
    t.end()
  })

  t.test('dashboards includes Step Function metrics', (t) => {
    const widgets = dashBody.widgets.filter((widget) =>
      widget.properties.title.endsWith('Step Function Executions')
    )
    t.equal(widgets.length, 1)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/States']))
    const expectedTitles = new Set(['Workflow Step Function Executions'])

    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(expectedTitles, actualTitles)
    t.end()
  })
  t.end()
})
