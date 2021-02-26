'use strict'

const dashboard = require('../dashboard')
const { filterObject } = require('../util')

const { test } = require('tap')

const sls = {}
const config = {
  stackName: 'testStack',
  region: 'eu-west-1',
}

test('A dashboard includes Lambda metrics', (t) => {
  const dash = dashboard(sls, config)
  debugger
  const cfTemplate = require('./resources/cloudformation-template-stack.json')
  dash.addDashboard(cfTemplate)

  const dashResources = filterObject(
    cfTemplate.Resources,
    (res) => res.Type == 'AWS::CloudWatch::Dashboard'
  )
  t.equal(Object.keys(dashResources).length, 1)
  const [, dashResource] = Object.entries(dashResources)[0]
  t.equal(dashResource.Properties.DashboardName, 'testStackDashboard')
  const dashBody = JSON.parse(dashResource.Properties.DashboardBody)
  t.ok(dashBody.start)
  const widgets = dashBody.widgets
  t.equal(widgets.length, 7)
  const expectedTitles = [
    'Duration Average per Function',
    'Duration p95 per Function',
    'Duration Maximum per Function',
    'Invocations Sum per Function',
    'ConcurrentExecutions Maximum per Function',
    'Throttles Sum per Function',
    'Errors Sum per Function',
  ].sort()
  const actualTitles = widgets.map(widget => widget.properties.title).sort()
  t.same(expectedTitles, actualTitles)
  t.end()
})
