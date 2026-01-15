import _ from 'lodash'
import { test } from 'tap'

import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate } from '../../tests/testing-utils'
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

test('No dashboard is created if all widgets are disabled', (t) => {
  const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events', 'ApplicationELB', 'ApplicationELBTarget', 'AppSync', 'S3']
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
  const services = ['Lambda', 'ApiGateway', 'States', 'DynamoDB', 'SQS', 'Kinesis', 'ECS', 'SNS', 'Events', 'ApplicationELB', 'ApplicationELBTarget', 'AppSync', 'S3']
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
