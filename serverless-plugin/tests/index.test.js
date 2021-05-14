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
      name: 'aws',
      compiledCloudFormationTemplate: testCfTemplate
    }
  }
}

test('plugin fails if provider is not aws', (t) => {
  t.throws(() => new ServerlessPlugin({
    ...mockServerless,
    service: {
      ...mockServerless.service,
      provider: { name: 'azure' }
    }
  }))
  t.end()
})

test('finalizeHook adds dashboard and alarms', (t) => {
  const plugin = new ServerlessPlugin(mockServerless, {})
  plugin.finalizeHook()

  t.equal(testState.addDashboardCfTemplate.getSourceObject(), testCfTemplate)
  t.equal(testState.addAlarmsCfTemplate.getSourceObject(), testCfTemplate)
  t.end()
})

test('Plugin fails to run load with no custom section', (t) => {
  const plugin = new ServerlessPlugin({
    ...mockServerless,
    service: {
      ...mockServerless.service,
      custom: undefined
    }
  })
  t.throws(() => plugin.finalizeHook())
  t.end()
})

test('Plugin registers the configuration schema', (t) => {
  const testData = {}
  // eslint-disable-next-line no-new
  new ServerlessPlugin({
    ...mockServerless,
    configSchemaHandler: {
      defineCustomProperties: (schema) => {
        testData.schema = schema
      }
    }
  })
  t.equal(typeof testData.schema, 'object')
  t.end()
})

test('Plugin execution fails with no slicWatch config', (t) => {
  const plugin = new ServerlessPlugin({
    ...mockServerless,
    service: {
      ...mockServerless.service,
      custom: {}
    }
  })
  t.throws(
    () =>
      plugin.finalizeHook()
  )
  t.end()
})

test('Plugin execution fails if no SNS Topic is provided', (t) => {
  const serviceYmlWithoutTopic = { ...slsYaml, custom: { slicWatch: {} } }
  const plugin = new ServerlessPlugin(
    {
      ...mockServerless,
      service: serviceYmlWithoutTopic
    },
    {}
  )
  t.throws(() => plugin.finalizeHook())
  t.end()
})
