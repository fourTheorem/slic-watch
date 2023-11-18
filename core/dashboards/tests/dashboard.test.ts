import _ from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, defaultCfTemplate, albCfTemplate, appSyncCfTemplate, getDashboardFromTemplate } from '../../tests/testing-utils'
import { type ResourceType, getResourcesByType } from '../../cf-template'
import { type Widgets } from '../dashboard-types'

const lambdaMetrics = ['Errors', 'Duration', 'IteratorAge', 'Invocations', 'ConcurrentExecutions', 'Throttles']

test('An empty template creates no dashboard', (t) => {
  const compiledTemplate = createTestCloudFormationTemplate({ Resources: {} })
  addDashboard(defaultConfig.dashboard, compiledTemplate)

  const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
  t.equal(Object.keys(dashResources).length, 0)
  t.end()
})

test('A dashboard includes metrics', (t) => {
  const template = createTestCloudFormationTemplate()
  addDashboard(defaultConfig.dashboard, template)

  const { dashboard, dashProperties } = getDashboardFromTemplate(template)
  t.ok(dashboard)
  t.ok(dashProperties)
  t.same(dashProperties.DashboardName, { 'Fn::Sub': '${AWS::StackName}-${AWS::Region}-Dashboard' })

  t.ok(dashboard.start)

  t.test('dashboards includes Step Function metrics', (t) => {
    const widgets = dashboard.widgets.filter((widget) => {
      const widgetProperties = widget.properties as MetricWidgetProperties
      return (widgetProperties.title ?? '').endsWith('Step Function Executions')
    })
    t.equal(widgets.length, 2)
    const namespaces = new Set()
    for (const widget of widgets) {
      const widgetProperties = widget.properties as MetricWidgetProperties
      for (const metric of widgetProperties.metrics ?? []) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/States']))
    const expectedTitles = new Set(['${Workflow.Name} Step Function Executions', '${ExpressWorkflow.Name} Step Function Executions'])

    const actualTitles = new Set(
      widgets.map((widget) => (widget.properties as MetricWidgetProperties).title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboards includes DynamoDB metrics', (t) => {
    const widgets = dashboard.widgets.filter(({ properties }) => {
      const title = (properties as MetricWidgetProperties).title ?? ''
      return title.indexOf('Table') > 0 || title.indexOf('GSI') > 0
    })
    t.equal(widgets.length, 4)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of (widget.properties as MetricWidgetProperties).metrics ?? []) {
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
      widgets.map((widget) => (widget.properties as MetricWidgetProperties).title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes Kinesis metrics', (t) => {
    const widgets = dashboard.widgets.filter(({ properties }) =>
      ((properties as MetricWidgetProperties).title ?? '').endsWith('Kinesis')
    )
    t.equal(widgets.length, 3)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of (widget.properties as MetricWidgetProperties).metrics ?? []) {
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
      widgets.map((widget) => (widget.properties as MetricWidgetProperties).title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes SQS metrics', (t) => {
    const widgets = dashboard.widgets.filter(({ properties }) =>
      ((properties as MetricWidgetProperties).title ?? '').endsWith('SQS')
    )
    t.equal(widgets.length, 6) // 3 groups * 2 queues
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of (widget.properties as MetricWidgetProperties).metrics ?? []) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/SQS']))
    const expectedTitles = new Set([
      'Messages ${regularQueue.QueueName} SQS',
      'Oldest Message age ${regularQueue.QueueName} SQS',
      'Messages in queue ${regularQueue.QueueName} SQS',
      'Messages ${fifoQueue.QueueName} SQS',
      'Oldest Message age ${fifoQueue.QueueName} SQS',
      'Messages in queue ${fifoQueue.QueueName} SQS'
    ])

    const actualTitles = new Set(
      widgets.map((widget) => (widget.properties as MetricWidgetProperties).title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes ECS metrics', (t) => {
    const widgets = dashboard.widgets.filter(({ properties }) =>
      ((properties as MetricWidgetProperties).title ?? '').startsWith('ECS')
    )
    t.equal(widgets.length, 1)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of (widget.properties as MetricWidgetProperties).metrics ?? []) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/ECS']))
    const expectedTitles = new Set([
      'ECS Service ${ecsService.Name}'
    ])

    const actualTitles = new Set(
      widgets.map((widget) => (widget.properties as MetricWidgetProperties).title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes SNS metrics', (t) => {
    const widgets = dashboard.widgets.filter(({ properties }) =>
      ((properties as MetricWidgetProperties).title ?? '').startsWith('SNS')
    )
    t.equal(widgets.length, 1)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of (widget.properties as MetricWidgetProperties).metrics ?? []) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/SNS']))
    const expectedTitles = new Set(['SNS Topic ${topic.TopicName}'])

    const actualTitles = new Set(
      widgets.map((widget) => (widget.properties as MetricWidgetProperties).title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes Events metrics', (t) => {
    const widgets = dashboard.widgets.filter(({ properties }) =>
      ((properties as MetricWidgetProperties).title ?? '').startsWith('EventBridge')
    )
    t.equal(widgets.length, 1)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of (widget.properties as MetricWidgetProperties).metrics ?? []) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/Events']))
    const expectedTitles = new Set(['EventBridge Rule ${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}'])

    const actualTitles = new Set(
      widgets.map((widget) => (widget.properties as MetricWidgetProperties).title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.end()
})

test('A dashboard includes metrics for ALB', (t) => {
  const compiledTemplate = createTestCloudFormationTemplate((albCfTemplate))
  addDashboard(defaultConfig.dashboard, compiledTemplate)
  const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
  t.equal(Object.keys(dashResources).length, 1)
  const [, dashResource] = Object.entries(dashResources)[0]
  t.same(dashResource.Properties?.DashboardName, { 'Fn::Sub': '${AWS::StackName}-${AWS::Region}-Dashboard' })
  const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])

  t.ok(dashboard.start)

  t.test('dashboard includes Application Load Balancer metrics', (t) => {
    const widgets = dashboard.widgets.filter(({ properties: { title } }) =>
      title.startsWith('ALB')
    )
    t.equal(widgets.length, 1)
    const namespaces = new Set()
    for (const widget of widgets) {
      for (const metric of widget.properties.metrics) {
        namespaces.add(metric[0])
      }
    }
    t.same(namespaces, new Set(['AWS/ApplicationELB']))
    const expectedTitles = new Set(['ALB ${alb.LoadBalancerName}'])

    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()
  })

  t.test('dashboard includes Application Load Balancer Target Groups metrics', (t) => {
    const widgets = dashboard.widgets.filter(({ properties: { title } }) =>
      title.startsWith('Target')
    )
    t.equal(widgets.length, 1)
    const namespaces = new Set()
    const metricNames: string[] = []
    for (const metric of widgets[0].properties.metrics) {
      namespaces.add(metric[0])
      metricNames.push(metric[1])
    }
    t.same(namespaces, new Set(['AWS/ApplicationELB']))
    t.same(metricNames.sort(), ['HTTPCode_Target_5XX_Count', 'UnHealthyHostCount', 'LambdaInternalError', 'LambdaUserError'].sort())
    const expectedTitles = new Set(['Target Group ${alb.LoadBalancerName}/${AlbEventAlbTargetGrouphttpListener.TargetGroupName}'])

    const actualTitles = new Set(
      widgets.map((widget) => widget.properties.title)
    )
    t.same(actualTitles, expectedTitles)
    t.end()

    test('No widgets are created if all AppSync metrics are disabled', (t) => {
      const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events', 'ApplicationELB', 'ApplicationELBTarget', 'AppSync']
      const dashConfig = _.cloneDeep(defaultConfig.dashboard)
      for (const service of services) {
        (dashConfig.widgets as Widgets)[service].enabled = false
      }
      const compiledTemplate = createTestCloudFormationTemplate((appSyncCfTemplate))
      addDashboard(dashConfig, compiledTemplate)
      const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
      t.same(dashResources, {})
      t.end()
    })

    test('No widgets are created if all Application Load Balancer metrics are disabled', (t) => {
      const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events', 'ApplicationELB', 'ApplicationELBTarget', 'AppSync']
      const dashConfig = _.cloneDeep(defaultConfig.dashboard)
      for (const service of services) {
        (dashConfig.widgets as Widgets)[service].enabled = false
      }
      const compiledTemplate = createTestCloudFormationTemplate((albCfTemplate))
      addDashboard(dashConfig, compiledTemplate)
      const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
      t.same(dashResources, {})
      t.end()
    })
  })

  t.test('target groups with no Lambda targets are excluded from metrics', (t) => {
    const compiledTemplate = createTestCloudFormationTemplate({
      Resources: {
        listener: {
          Type: 'AWS::ElasticLoadBalancingV2::Listener',
          Properties: {
            DefaultActions: [
              {
                TargetGroupArn: { Ref: 'tg' }
              }
            ],
            LoadBalancerArn: { Ref: 'alb' }
          }
        },
        tg: {
          Type: 'AWS::ElasticLoadBalancingV2::TargetGroup',
          Properties: {
            TargetType: 'redirect'
          }
        },
        alb: {
          Type: ''
        }
      }
    })
    addDashboard(defaultConfig.dashboard, compiledTemplate)
    const tgDashResource = Object.values(getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate))[0]
    const tgDashBody = JSON.parse(tgDashResource.Properties?.DashboardBody['Fn::Sub'])

    const widgets = tgDashBody.widgets.filter(({ properties: { title } }) =>
      title.startsWith('Target')
    )
    t.equal(widgets.length, 1)
    const metricNames: string[] = []
    for (const metric of widgets[0].properties.metrics) {
      metricNames.push(metric[1])
    }
    t.same(metricNames.sort(), ['HTTPCode_Target_5XX_Count', 'UnHealthyHostCount'].sort())
    t.end()
  })

  test('A dashboard includes metrics for AppSync', (t) => {
    const compiledTemplate = createTestCloudFormationTemplate((appSyncCfTemplate))
    addDashboard(defaultConfig.dashboard, compiledTemplate)
    const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
    t.equal(Object.keys(dashResources).length, 1)
    const [, dashResource] = Object.entries(dashResources)[0]
    t.same(dashResource.Properties?.DashboardName, { 'Fn::Sub': '${AWS::StackName}-${AWS::Region}-Dashboard' })
    const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])

    t.ok(dashboard.start)

    t.test('dashboard includes AppSync metrics', (t) => {
      const widgets = dashboard.widgets.filter(({ properties: { title } }) =>
        title.startsWith('AppSync')
      )
      t.equal(widgets.length, 2)
      const namespaces = new Set()
      for (const widget of widgets) {
        for (const metric of widget.properties.metrics) {
          namespaces.add(metric[0])
        }
      }
      t.same(namespaces, new Set(['AWS/AppSync']))
      const expectedTitles = new Set([
        'AppSync API awesome-appsync',
        'AppSync Real-time Subscriptions awesome-appsync'
      ])
      const actualTitles = new Set(
        widgets.map((widget) => widget.properties.title)
      )
      t.same(actualTitles, expectedTitles)
      t.end()
    })

    test('No widgets are created if all AppSync metrics are disabled', (t) => {
      const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events', 'ApplicationELB', 'ApplicationELBTarget', 'AppSync']
      const dashConfig = _.cloneDeep(defaultConfig.dashboard)
      for (const service of services) {
        (dashConfig.widgets as Widgets)[service].enabled = false
      }
      const compiledTemplate = createTestCloudFormationTemplate((appSyncCfTemplate))
      addDashboard(dashConfig, compiledTemplate)
      const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
      t.same(dashResources, {})
      t.end()
    })

    t.end()
  })

  t.end()
})

test('DynamoDB widgets are created without GSIs', (t) => {
  const tableResource: any = _.cloneDeep(defaultCfTemplate.Resources?.dataTable)
  delete tableResource?.Properties?.GlobalSecondaryIndexes
  const compTemplates = {
    Resources: {
      dataTable: tableResource
    }
  }

  const compiledTemplate = createTestCloudFormationTemplate(compTemplates)
  addDashboard(defaultConfig.dashboard, compiledTemplate)

  const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
  const [, dashResource] = Object.entries(dashResources)[0]
  const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])
  const widgets = dashboard.widgets

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
  const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events', 'ApplicationELB', 'ApplicationELBTarget', 'AppSync']
  const dashConfig = _.cloneDeep(defaultConfig.dashboard)
  for (const service of services) {
    (dashConfig.widgets as Widgets)[service].enabled = false
  }
  const compiledTemplate = createTestCloudFormationTemplate()
  addDashboard(dashConfig, compiledTemplate)
  const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
  t.same(dashResources, {})
  t.end()
})

test('No dashboard is created if all metrics are disabled', (t) => {
  const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events', 'ApplicationELB', 'ApplicationELBTarget', 'AppSync']
  const dashConfig = _.cloneDeep(defaultConfig.dashboard)
  for (const service of services) {
    (dashConfig.widgets as Widgets)[service].enabled = false
  }
  const compiledTemplate = createTestCloudFormationTemplate()
  addDashboard(dashConfig, compiledTemplate)
  const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
  t.same(dashResources, {})
  t.end()
})

test('A widget is not created for Lambda if disabled at a function level', (t) => {
  for (const metric of lambdaMetrics) {
    const compiledTemplate = createTestCloudFormationTemplate();
    (compiledTemplate.Resources as ResourceType).HelloLambdaFunction.Metadata = {
      slicWatch: {
        dashboard: { enabled: false }
      }
    }

    addDashboard(defaultConfig.dashboard, compiledTemplate)
    const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
    const [, dashResource] = Object.entries(dashResources)[0]
    const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])

    const widgets = dashboard.widgets.filter(({ properties: { title } }) =>
      title.startsWith(`Lambda ${metric}`)
    )
    const widgetMetrics = widgets[0].properties.metrics
    const functionNames = widgetMetrics.map(widgetMetric => widgetMetric[3])
    t.ok(functionNames.length > 0)
    t.equal(functionNames.indexOf('serverless-test-project-dev-hello'), -1, `${metric} is disabled`)
  }
  t.end()
})

test('A widget is not created for Lambda if disabled at a function level for each metric', (t) => {
  for (const metric of lambdaMetrics) {
    const compiledTemplate = createTestCloudFormationTemplate();
    (compiledTemplate.Resources as ResourceType).HelloLambdaFunction.Metadata = {
      slicWatch: {
        dashboard: Object.fromEntries(lambdaMetrics.map((metric) => ([
          metric, { enabled: false }
        ])))
      }
    }

    addDashboard(defaultConfig.dashboard, compiledTemplate)
    const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
    const [, dashResource] = Object.entries(dashResources)[0]
    const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])

    const widgets = dashboard.widgets.filter(({ properties: { title } }) =>
      title.startsWith(`Lambda ${metric}`)
    )
    const widgetMetrics = widgets[0].properties.metrics
    const functionNames = widgetMetrics.map(widgetMetric => widgetMetric[3])
    t.ok(functionNames.length > 0)
    t.equal(functionNames.indexOf('serverless-test-project-dev-hello'), -1, `${metric} is disabled`)
  }
  t.end()
})

test('No Lambda widgets are created if all metrics for functions are disabled', (t) => {
  const compiledTemplate = createTestCloudFormationTemplate()
  const allFunctionLogicalIds = Object.keys(getResourcesByType('AWS::Lambda::Function', compiledTemplate))
  for (const funcLogicalId of allFunctionLogicalIds) {
    (compiledTemplate.Resources as ResourceType)[funcLogicalId].Metadata = {
      slicWatch: {
        dashboard: Object.fromEntries(lambdaMetrics.map((metric) => ([
          metric, { enabled: false }
        ])))
      }
    }
  }

  addDashboard(defaultConfig.dashboard, compiledTemplate)
  const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
  const [, dashResource] = Object.entries(dashResources)[0]
  const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])

  const widgets = dashboard.widgets.filter(({ properties: { title } }) =>
    title.startsWith('Lambda')
  )
  t.equal(widgets.length, 0)
  t.end()
})
