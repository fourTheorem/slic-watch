'use strict'

const { cloneDeep } = require('lodash')
const { test } = require('tap')

const dashboard = require('../dashboard')
const defaultConfig = require('../default-config')

const { createTestCloudFormationTemplate, defaultCfTemplate, slsMock } = require('./testing-utils')

const context = {
  stackName: 'testStack',
  region: 'eu-west-1'
}

test('An empty template creates a dashboard', (t) => {
  const dash = dashboard(slsMock, defaultConfig.dashboard, context)

  const cfTemplate = createTestCloudFormationTemplate({ Resources: [] })
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
  t.equal(widgets.length, 0)
  t.end()
})

test('A dashboard includes metrics', (t) => {
  const dash = dashboard(slsMock, defaultConfig.dashboard, context)
  const cfTemplate = createTestCloudFormationTemplate()
  dash.addDashboard(cfTemplate)
  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
  t.equal(Object.keys(dashResources).length, 1)
  const [, dashResource] = Object.entries(dashResources)[0]
  t.equal(dashResource.Properties.DashboardName, 'testStackDashboard')
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])

  t.ok(dashBody.start)

  t.test('dashboards includes Lambda metrics', (t) => {
    const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
      title.startsWith('Lambda')
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
      'Lambda IteratorAge serverless-test-project-dev-streamProcessor Maximum',
      'Lambda ConcurrentExecutions Maximum per Function',
      'Lambda Throttles Sum per Function',
      'Lambda Errors Sum per Function'
    ])
    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboards includes API metrics', (t) => {
    const widgets = dashBody.widgets.filter((widget) =>
      widget.properties.title.indexOf(' API ') > 0
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
      '4XXError API dev-serverless-test-project',
      '5XXError API dev-serverless-test-project',
      'Count API dev-serverless-test-project',
      'Latency API dev-serverless-test-project'
    ])
    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
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
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboards includes DynamoDB metrics', (t) => {
    const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
      title.indexOf('Table') > 0 || title.indexOf('GSI') > 0
    )
    t.equal(widgets.length, 4)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/DynamoDB']))
    const expectedTitles = new Set([
      'ReadThrottleEvents Table MyTable',
      'ReadThrottleEvents GSI GSI1 in MyTable',
      'WriteThrottleEvents Table MyTable',
      'WriteThrottleEvents GSI GSI1 in MyTable'
    ])

    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes Kinesis metrics', (t) => {
    const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
      title.endsWith('Kinesis')
    )
    t.equal(widgets.length, 3)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/Kinesis']))
    const expectedTitles = new Set([
      'IteratorAge awesome-savage-stream Kinesis',
      'Get/Put Success awesome-savage-stream Kinesis',
      'Provisioned Throughput awesome-savage-stream Kinesis'
    ])

    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes SQS metrics', (t) => {
    const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
      title.endsWith('SQS')
    )
    t.equal(widgets.length, 6) // 3 groups * 2 queues
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/SQS']))
    const expectedTitles = new Set([
      'Messages SomeRegularQueue SQS',
      'Oldest Message age SomeRegularQueue SQS',
      'Messages in queue SomeRegularQueue SQS',
      'Messages SomeFifoQueue.fifo SQS',
      'Oldest Message age SomeFifoQueue.fifo SQS',
      'Messages in queue SomeFifoQueue.fifo SQS'
    ])

    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.end()
})

test('DynamoDB widgets are created without GSIs', (t) => {
  const dash = dashboard(slsMock, defaultConfig.dashboard, context)
  const tableResource = cloneDeep(defaultCfTemplate.Resources.dataTable)
  delete tableResource.Properties.GlobalSecondaryIndexes
  const compiledTemplate = {
    Resources: {
      dataTable: tableResource
    }
  }

  const cfTemplate = createTestCloudFormationTemplate(compiledTemplate)
  dash.addDashboard(cfTemplate)
  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
  const [, dashResource] = Object.entries(dashResources)[0]
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])
  const widgets = dashBody.widgets

  t.equal(widgets.length, 2)
  const expectedTitles = new Set([
    'ReadThrottleEvents Table MyTable',
    'WriteThrottleEvents Table MyTable'
  ])

  const actualTitles = new Set(
    widgets.map((widget) => widget.properties.title)
  )
  t.same(actualTitles, expectedTitles)
  t.end()
})
