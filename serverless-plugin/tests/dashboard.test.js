'use strict'

const { cloneDeep } = require('lodash')
const { test } = require('tap')

const defaultConfig = require('../default-config')

const { createTestCloudFormationTemplate, defaultCfTemplate, slsMock } = require('./testing-utils')

const context = {
  stackName: 'testStack',
  region: 'eu-west-1'
}

const lambdaMetrics = ['Errors', 'Duration', 'IteratorAge', 'Invocations', 'ConcurrentExecutions', 'Throttles']
const emptyFuncConfigs = {}

async function createDashboard (t) {
  const dashboard = t.mock('../dashboard.js', {
    '@aws-sdk/client-elastic-load-balancing-v2': {
      ElasticLoadBalancingV2Client: function () {
        this.send = async command => {
          return {
            TargetGroups: [{ TargetGroupArn: 'dummy-arn/1234567/1234890' }],
            LoadBalancers: [{ LoadBalancerArn: 'dummy-arn/app/awesome-alb/1234890' }]
          }
        }
      },
      DescribeTargetGroupsCommand: function ({ Names }) {},
      DescribeLoadBalancersCommand: function ({ Names }) {}
    }
  })
  const dash = dashboard(slsMock, defaultConfig.dashboard, emptyFuncConfigs, context)
  const cfTemplate = createTestCloudFormationTemplate()
  await dash.addDashboard(cfTemplate)
  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
  const [, dashResource] = Object.entries(dashResources)[0]
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])
  return {
    dashResources, dashResource, dashBody
  }
}

async function notCreateDashboard (t) {
  const dashboard = t.mock('../dashboard.js', {
    '@aws-sdk/client-elastic-load-balancing-v2': {
      ElasticLoadBalancingV2Client: function () {
        this.send = async command => {
          return {
            TargetGroups: [],
            LoadBalancers: []
          }
        }
      },
      DescribeTargetGroupsCommand: function ({ Names }) {},
      DescribeLoadBalancersCommand: function ({ Names }) {}
    }
  })
  const dash = dashboard(slsMock, defaultConfig.dashboard, emptyFuncConfigs, context)

  const cfTemplate = createTestCloudFormationTemplate({ Resources: [] })
  await dash.addDashboard(cfTemplate)

  const dashResources = cfTemplate.getResourcesByType(
    'AWS::CloudWatch::Dashboard'
  )
  return {
    dashResources
  }
}
test('An empty template creates no dashboard', async (t) => {
  const { dashResources } = await notCreateDashboard(t)
  t.equal(Object.keys(dashResources).length, 0)
  t.end()
})

test('A dashboard includes metrics', async (t) => {
  const { dashResources, dashResource, dashBody } = await createDashboard(t)
  t.equal(Object.keys(dashResources).length, 1)
  t.equal(dashResource.Properties.DashboardName, 'testStackDashboard')

  t.ok(dashBody.start)

  t.end()
})
test('dashboards includes Lambda metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
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

test('dashboards includes API metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
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

test('dashboards includes Step Function metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
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

test('dashboards includes DynamoDB metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
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

test('dashboard includes Kinesis metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
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

test('dashboard includes SQS metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
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

test('dashboard includes ECS metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
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

test('dashboard includes SNS metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
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
  const expectedTitles = new Set([
    'SNS Topic awesome-savage-topic'
  ])

  const actualTitles = new Set(
    widgets.map((widget) => widget.properties.title)
  )
  t.same(actualTitles, expectedTitles)
  t.end()
})

test('dashboard includes Events metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
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

test('dashboard includes ALB metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
  const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
    title.startsWith('Application Load Balancer awesome-loadBalancer')
  )
  t.equal(widgets.length, 1)
  const namespaces = new Set()
  for (const widget of widgets) {
    for (const metric of widget.properties.metrics) {
      namespaces.add(metric[0])
    }
  }
  t.same(namespaces, new Set(['AWS/ApplicationELB']))
  const expectedTitles = new Set(['Application Load Balancer awesome-loadBalancer'])

  const actualTitles = new Set(
    widgets.map((widget) => widget.properties.title)
  )
  t.same(actualTitles, expectedTitles)
  t.end()
})

test('dashboard includes ALB Target Group metrics', async (t) => {
  const { dashBody } = await createDashboard(t)
  const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
    title.startsWith('Application Load Balancer/Target Group')
  )
  t.equal(widgets.length, 1)
  const namespaces = new Set()
  for (const widget of widgets) {
    for (const metric of widget.properties.metrics) {
      namespaces.add(metric[0])
    }
  }
  t.same(namespaces, new Set(['AWS/ApplicationELB']))
  const expectedTitles = new Set(['Application Load Balancer/Target Group awesome-loadBalancer'])

  const actualTitles = new Set(
    widgets.map((widget) => widget.properties.title)
  )
  t.same(actualTitles, expectedTitles)
  t.end()
})

async function createDynamoDBWidgets (t) {
  const dashboard = t.mock('../dashboard.js', {
    '@aws-sdk/client-elastic-load-balancing-v2': {
      ElasticLoadBalancingV2Client: function () {
        this.send = async command => {
          return {
            TargetGroups: [{ TargetGroupArn: 'dummy-arn/1234567/1234890' }],
            LoadBalancers: [{ LoadBalancerArn: 'dummy-arn/app/awesome-alb/1234890' }]
          }
        }
      },
      DescribeTargetGroupsCommand: function ({ Names }) {},
      DescribeLoadBalancersCommand: function ({ Names }) {}
    }
  })
  const dash = dashboard(slsMock, defaultConfig.dashboard, emptyFuncConfigs, context)
  const tableResource = cloneDeep(defaultCfTemplate.Resources.dataTable)
  delete tableResource.Properties.GlobalSecondaryIndexes
  const compiledTemplate = {
    Resources: {
      dataTable: tableResource
    }
  }
  const cfTemplate = createTestCloudFormationTemplate(compiledTemplate)
  await dash.addDashboard(cfTemplate)
  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
  const [, dashResource] = Object.entries(dashResources)[0]
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])
  const widgets = dashBody.widgets

  return {
    dashResources, dashResource, dashBody, widgets
  }
}

test('DynamoDB widgets are created without GSIs', async (t) => {
  const { widgets } = await createDynamoDBWidgets(t)
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

async function createNoDashboard (t) {
  const dashboard = t.mock('../dashboard.js', {
    '@aws-sdk/client-elastic-load-balancing-v2': {
      ElasticLoadBalancingV2Client: function () {
        this.send = async command => {
          return {
            TargetGroups: [{ TargetGroupArn: 'dummy-arn/1234567/1234890' }],
            LoadBalancers: [{ LoadBalancerArn: 'dummy-arn/app/awesome-alb/1234890' }]
          }
        }
      },
      DescribeTargetGroupsCommand: function ({ Names }) {},
      DescribeLoadBalancersCommand: function ({ Names }) {}
    }
  })
  const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events', 'ApplicationELB', 'ApplicationELBTarget']
  const dashConfig = cloneDeep(defaultConfig.dashboard)
  for (const service of services) {
    dashConfig.widgets[service].enabled = false
  }
  const dash = dashboard(slsMock, dashConfig, emptyFuncConfigs, context)
  const cfTemplate = createTestCloudFormationTemplate()
  await dash.addDashboard(cfTemplate)
  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')

  return {
    dashResources
  }
}
test('No dashboard is created if all widgets are disabled', async (t) => {
  const { dashResources } = await createNoDashboard(t)
  t.same(dashResources, {})
  t.end()
})

test('No dashboard is created if all metrics are disabled', async (t) => {
  const { dashResources } = await createNoDashboard(t)
  t.same(dashResources, {})
  t.end()
})

async function * createNoDashboardForLambda (t) {
  const dashboard = t.mock('../dashboard.js', {
    '@aws-sdk/client-elastic-load-balancing-v2': {
      ElasticLoadBalancingV2Client: function () {
        this.send = async command => {
          return {
            TargetGroups: [{ TargetGroupArn: 'dummy-arn/1234567/1234890' }],
            LoadBalancers: [{ LoadBalancerArn: 'dummy-arn/app/awesome-alb/1234890' }]
          }
        }
      },
      DescribeTargetGroupsCommand: function ({ Names }) {},
      DescribeLoadBalancersCommand: function ({ Names }) {}
    }
  })
  const disabledFunctionName = 'serverless-test-project-dev-hello'
  for (const metric of lambdaMetrics) {
    const funcConfigs = {
      [disabledFunctionName]: {
        [metric]: { enabled: false }
      }
    }

    const dash = dashboard(slsMock, defaultConfig.dashboard, funcConfigs, context)
    const cfTemplate = createTestCloudFormationTemplate()
    await dash.addDashboard(cfTemplate)
    const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
    const [, dashResource] = Object.entries(dashResources)[0]
    const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])

    const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
      title.startsWith(`Lambda ${metric}`)
    )
    const widgetMetrics = widgets[0].properties.metrics
    const functionNames = widgetMetrics.map(widgetMetric => widgetMetric[3])

    yield {
      functionNames, disabledFunctionName, metric
    }
  }
}

test('A widget is not created for Lambda if disabled at a function level', async (t) => {
  for await (const { functionNames, disabledFunctionName, metric } of createNoDashboardForLambda(t)) {
    t.ok(functionNames.length > 0)
    t.equal(functionNames.indexOf(disabledFunctionName), -1, `${metric} is disabled`)
  }
  t.end()
})

async function createNoDashboardForDisabledFunctions (t) {
  const dashboard = t.mock('../dashboard.js', {
    '@aws-sdk/client-elastic-load-balancing-v2': {
      ElasticLoadBalancingV2Client: function () {
        this.send = async command => {
          return {
            TargetGroups: [{ TargetGroupArn: 'dummy-arn/1234567/1234890' }],
            LoadBalancers: [{ LoadBalancerArn: 'dummy-arn/app/awesome-alb/1234890' }]
          }
        }
      },
      DescribeTargetGroupsCommand: function ({ Names }) {},
      DescribeLoadBalancersCommand: function ({ Names }) {}
    }
  })
  const funcConfigs = {}

  const predash = dashboard(slsMock, defaultConfig.dashboard, funcConfigs, context)
  const preCfTemplate = createTestCloudFormationTemplate()
  await predash.addDashboard(preCfTemplate)
  const lambdaResources = preCfTemplate.getResourcesByType(
    'AWS::Lambda::Function'
  )
  for (const res of Object.values(lambdaResources)) {
    const functionName = res.Properties.FunctionName
    funcConfigs[functionName] = {}
    for (const metric of lambdaMetrics) {
      funcConfigs[functionName][metric] = { enabled: false }
    }
  }
  const dash = dashboard(slsMock, defaultConfig.dashboard, funcConfigs, context)
  const cfTemplate = createTestCloudFormationTemplate()
  await dash.addDashboard(cfTemplate)

  const dashResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Dashboard')
  const [, dashResource] = Object.entries(dashResources)[0]
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody['Fn::Sub'])

  const widgets = dashBody.widgets.filter(({ properties: { title } }) =>
    title.startsWith('Lambda')
  )

  return {
    dashResources, dashResource, dashBody, widgets
  }
}
test('No Lambda widgets are created if all metrics for functions are disabled', async (t) => {
  const { widgets } = await createNoDashboardForDisabledFunctions(t)
  t.equal(widgets.length, 0)
  t.end()
})
