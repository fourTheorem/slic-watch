/* eslint-disable no-template-curly-in-string */
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

const lambdaMetrics = ['Errors', 'Duration', 'IteratorAge', 'Invocations', 'ConcurrentExecutions', 'Throttles']
const emptyFuncConfigs = {}

test('An empty template creates no dashboard', (t) => {
  const dash = dashboard(slsMock, defaultConfig.dashboard, emptyFuncConfigs, context)

  const cfTemplate = createTestCloudFormationTemplate({ Resources: [] })
  dash.addDashboard(cfTemplate)

  const dashResources = cfTemplate.getResourcesByType(
    'AWS::CloudWatch::Dashboard'
  )
  t.equal(Object.keys(dashResources).length, 0)
  t.end()
})

test('A dashboard includes metrics', (t) => {
  const dash = dashboard(slsMock, defaultConfig.dashboard, emptyFuncConfigs, context)
  const cfTemplate = createTestCloudFormationTemplate()
  dash.addDashboard(cfTemplate)
  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
  t.equal(Object.keys(dashResources).length, 1)
  const [, dashResource] = Object.entries(dashResources)[0]
  t.same(dashResource.Properties.DashboardName, {
    'Fn::Sub': '${AWS::StackName}Dashboard'
  })
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
        t.equal(metric.length, 5)
        const metricProperties = metric[4]
        const propKeys = Object.keys(metricProperties)
        t.same(propKeys, ['stat'])
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/Lambda']))
    const expectedTitles = new Set([
      'Lambda Duration Average per Function',
      'Lambda Duration p95 per Function',
      'Lambda Duration Maximum per Function',
      'Lambda Invocations Sum per Function',
      'Lambda IteratorAge ${StreamProcessorLambdaFunction} Maximum',
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
    t.equal(widgets.length, 2)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/States']))
    const expectedTitles = new Set(['Workflow Step Function Executions', 'ExpressWorkflow Step Function Executions'])

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
      'ReadThrottleEvents Table ${dataTable}',
      'ReadThrottleEvents GSI GSI1 in ${dataTable}',
      'WriteThrottleEvents Table ${dataTable}',
      'WriteThrottleEvents GSI GSI1 in ${dataTable}'
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
      'IteratorAge ${stream} Kinesis',
      'Get/Put Success ${stream} Kinesis',
      'Provisioned Throughput ${stream} Kinesis'
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

  t.test('dashboard includes ECS metrics', (t) => {
    const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
      title.startsWith('ECS')
    )
    t.equal(widgets.length, 1)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/ECS']))
    const expectedTitles = new Set([
      'ECS Service awesome-service'
    ])

    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes SNS metrics', (t) => {
    const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
      title.startsWith('SNS')
    )
    t.equal(widgets.length, 1)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/SNS']))
    const expectedTitles = new Set(['SNS Topic ${topic.TopicName}'])

    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes Events metrics', (t) => {
    const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
      title.startsWith('EventBridge')
    )
    t.equal(widgets.length, 1)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/Events']))
    const expectedTitles = new Set(['EventBridge Rule serverless-test-project-dev-eventsRule-rule-1'])

    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.end()
})

test('DynamoDB widgets are created without GSIs', (t) => {
  const dash = dashboard(slsMock, defaultConfig.dashboard, emptyFuncConfigs, context)
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
    'ReadThrottleEvents Table ${dataTable}',
    'WriteThrottleEvents Table ${dataTable}'
  ])

  const actualTitles = new Set(
    widgets.map((widget) => widget.properties.title)
  )
  t.same(actualTitles, expectedTitles)
  t.end()
})

test('No dashboard is created if all widgets are disabled', (t) => {
  const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events']
  const dashConfig = cloneDeep(defaultConfig.dashboard)
  for (const service of services) {
    dashConfig.widgets[service].enabled = false
  }
  const dash = dashboard(slsMock, dashConfig, emptyFuncConfigs, context)
  const cfTemplate = createTestCloudFormationTemplate()
  dash.addDashboard(cfTemplate)
  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
  t.same(dashResources, {})
  t.end()
})

test('No dashboard is created if all metrics are disabled', (t) => {
  const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events']
  const dashConfig = cloneDeep(defaultConfig.dashboard)
  for (const service of services) {
    for (const metricConfig of Object.values(dashConfig.widgets[service])) {
      metricConfig.enabled = false
    }
  }
  const dash = dashboard(slsMock, dashConfig, emptyFuncConfigs, context)
  const cfTemplate = createTestCloudFormationTemplate()
  dash.addDashboard(cfTemplate)
  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
  t.same(dashResources, {})
  t.end()
})

test('A widget is not created for Lambda if disabled at a function level', (t) => {
  const disabledFunctionName = 'serverless-test-project-dev-hello'
  for (const metric of lambdaMetrics) {
    const funcConfigs = {
      [disabledFunctionName]: {
        [metric]: { enabled: false }
      }
    }

    const dash = dashboard(slsMock, defaultConfig.dashboard, funcConfigs, context)
    const cfTemplate = createTestCloudFormationTemplate()
    dash.addDashboard(cfTemplate)
    const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
    const [, dashResource] = Object.entries(dashResources)[0]
    const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])

    const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
      title.startsWith(`Lambda ${metric}`)
    )
    const widgetMetrics = widgets[0].properties.metrics
    const functionNames = widgetMetrics.map(widgetMetric => widgetMetric[3])
    t.ok(functionNames.length > 0)
    t.equal(functionNames.indexOf(disabledFunctionName), -1, `${metric} is disabled`)
  }
  t.end()
})

test('No Lambda widgets are created if all metrics for functions are disabled', (t) => {
  const funcConfigs = {}
  const cfTemplate = createTestCloudFormationTemplate()
  const allFunctionLogicalIds = Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))
  for (const funcLogicalId of allFunctionLogicalIds) {
    funcConfigs[funcLogicalId] = {}
    for (const metric of lambdaMetrics) {
      funcConfigs[funcLogicalId][metric] = { enabled: false }
    }
  }
  const dash = dashboard(slsMock, defaultConfig.dashboard, funcConfigs, context)
  dash.addDashboard(cfTemplate)
  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
  const [, dashResource] = Object.entries(dashResources)[0]
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])

  const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
    title.startsWith('Lambda')
  )
  t.equal(widgets.length, 0)
  t.end()
})
