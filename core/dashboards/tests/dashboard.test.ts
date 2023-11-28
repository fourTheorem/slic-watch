import _ from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, defaultCfTemplate, albCfTemplate, appSyncCfTemplate, getDashboardFromTemplate } from '../../tests/testing-utils'
import { getResourcesByType } from '../../cf-template'
import { type Widgets } from '../dashboard-types'

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
