'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const proxyrequire = require('proxyquire')
const { test } = require('tap')

const slsYamlPath = path.resolve(
  __dirname,
  '../../serverless-test-project/serverless.yml'
)
const slsYaml = yaml.load(fs.readFileSync(slsYamlPath, 'utf8'))
const testCfTemplate = {
  Resources: {}
}

const testState = {}

const ServerlessPlugin = proxyrequire('../index', {
  './dashboard': () => {
    testState.dashboardCalled = true
    return {
      addDashboard: (cfTemplate) => {
        testState.addDashboardCfTemplate = cfTemplate
      }
    }
  },
  './alarms': () => {
    testState.alarmsCalled = true
    return {
      addAlarms: (cfTemplate) => {
        testState.addAlarmsCfTemplate = cfTemplate
      }
    }
  }
})

const mockServerless = {
  cli: {
    log: () => {}
  },
  providers: {
    aws: {
      naming: {
        getStackName: () => 'MockStack'
      }
    }
  },
  service: {
    ...slsYaml,
    provider: {
      compiledCloudFormationTemplate: testCfTemplate
    }
  }
}

test('The plugin generates dashboards and alarms', (t) => {
  const plugin = new ServerlessPlugin(mockServerless, {})
  t.ok(plugin)
  t.ok(testState.dashboardCalled)
  t.ok(testState.alarmsCalled)
  t.end()
})

test('compileEvents adds dashboard and alarms', (t) => {
  const plugin = new ServerlessPlugin(mockServerless, {})
  plugin.compileEvents()

  t.equal(testState.addDashboardCfTemplate.getSourceObject(), testCfTemplate)
  t.equal(testState.addAlarmsCfTemplate.getSourceObject(), testCfTemplate)
  t.end()
})

test('Plugin loads with no custom section', (t) => {
  t.throws(
    () =>
      new ServerlessPlugin({
        ...mockServerless,
        service: {
          ...mockServerless.service,
          custom: undefined
        }
      })
  )
  t.end()
})

test('Plugin load fails with no slicWatch config', (t) => {
  t.throws(
    () =>
      new ServerlessPlugin({
        ...mockServerless,
        service: {
          ...mockServerless.service,
          custom: {}
        }
      })
  )
  t.end()
})

test('Plugin load fails if no SNS Topic is provided', (t) => {
  const serviceYmlWithoutTopic = {
    ...slsYaml,
    custom: {
      ...slsYaml.custom,
      slicWatch: {}
    }
  }
  t.throws(
    () =>
      new ServerlessPlugin(
        {
          ...mockServerless,
          service: serviceYmlWithoutTopic
        },
        {}
      )
  )
  t.end()
})
