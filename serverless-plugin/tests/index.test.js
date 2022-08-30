'use strict'

const _ = require('lodash')
const proxyrequire = require('proxyquire')
const ServerlessError = require('serverless/lib/serverless-error')
const { test } = require('tap')
const { getLogger } = require('slic-watch-core/logging')

const slsYaml = {
  custom: {
    slicWatch: {
      topicArn: 'test-topic'
    }
  },
  functions: {
    hello: {
    }
  }
}
const testCfTemplate = {
  Resources: {
    HelloLambdaFunction: {
      Type: 'AWS::Lambda::Function',
      Properties: {
        FunctionName: 'serverless-test-project-dev-hello'
      }
    }
  }
}

let testState = {}

const ServerlessPlugin = proxyrequire('../index', {
  'slic-watch-core/dashboard': () => {
    testState.dashboardCalled = true
    return {
      addDashboard: (cfTemplate) => {
        testState.addDashboardCfTemplate = cfTemplate
      }
    }
  },
  'slic-watch-core/alarms': () => {
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
  providers: { aws: {} },
  getProvider: () => ({
    naming: {
      getLambdaLogicalId: (funcName) => {
        return funcName[0].toUpperCase() + funcName.slice(1) + 'LambdaFunction'
      }
    }
  }),
  service: {
    ...slsYaml,
    provider: {
      name: 'aws',
      compiledCloudFormationTemplate: testCfTemplate
    },
    getAllFunctions: () => Object.keys(slsYaml.functions),
    getFunction: (funcRef) => slsYaml.functions[funcRef]
  }
}

test('index', t => {
  t.beforeEach(t => {
    testState = {}
  })

  t.test('plugin uses v3 logger if provided', (t) => {
    const dummyV3Logger = {}
    const plugin = new ServerlessPlugin(mockServerless, {}, { log: dummyV3Logger })
    t.equal(getLogger(), dummyV3Logger)
    t.ok(plugin)
    t.end()
  })

  t.test('plugin fails if provider is not aws', (t) => {
    t.throws(() => new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        provider: { name: 'azure' }
      }
    }))
    t.end()
  })

  t.test('finalizeHook adds dashboard and alarms', (t) => {
    const plugin = new ServerlessPlugin(mockServerless, {})
    plugin.finalizeHook()

    t.equal(testState.addDashboardCfTemplate.getSourceObject(), testCfTemplate)
    t.equal(testState.addAlarmsCfTemplate.getSourceObject(), testCfTemplate)
    t.end()
  })

  t.test('Plugin succeeds with no custom section', (t) => {
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        custom: undefined
      }
    })
    plugin.finalizeHook()
    t.end()
  })

  t.test('Plugin registers the configuration schema', (t) => {
    const testData = {}
    // eslint-disable-next-line no-new
    new ServerlessPlugin({
      ...mockServerless,
      configSchemaHandler: {
        defineCustomProperties: (schema) => {
          testData.schema = schema
        },
        defineFunctionProperties: (provider, schema) => {
          testData.functionSchema = schema
        }
      }
    })
    t.equal(typeof testData.schema, 'object')
    t.end()
  })

  t.test('Plugin execution succeeds with no slicWatch config', (t) => {
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        custom: {}
      }
    })
    plugin.finalizeHook()
    t.ok(testState.alarmsCalled)
    t.end()
  })

  t.test('Plugin execution succeeds if no SNS Topic is provided', (t) => {
    const serviceYmlWithoutTopic = _.cloneDeep(slsYaml)
    delete serviceYmlWithoutTopic.custom.slicWatch.topicArn
    const plugin = new ServerlessPlugin(
      {
        ...mockServerless,
        service: {
          ...mockServerless.service,
          ...serviceYmlWithoutTopic
        }
      },
      {}
    )
    plugin.finalizeHook()
    t.ok(testState.alarmsCalled)
    t.end()
  })

  t.test('Plugin execution succeeds if resources are provided', (t) => {
    const plugin = new ServerlessPlugin(
      {
        ...mockServerless,
        service: {
          ...mockServerless.service,
          resources: {
            Resources: {
              queue: {
                Type: 'AWS::SQS::Queue',
                Properties: {}
              }
            }
          }
        }
      },
      {}
    )
    plugin.finalizeHook()
    t.ok(testState.alarmsCalled)
    t.end()
  })

  t.test('Plugin execution fails if an invalid SLIC Watch config is provided', (t) => {
    const serviceYmlWithBadProperty = _.cloneDeep(slsYaml)
    serviceYmlWithBadProperty.custom.slicWatch.topicArrrrn = 'pirateTopic'
    const plugin = new ServerlessPlugin(
      {
        ...mockServerless,
        service: {
          ...mockServerless.service,
          ...serviceYmlWithBadProperty
        }
      },
      {}
    )
    t.throws(() => plugin.finalizeHook(), ServerlessError)
    t.end()
  })

  t.test('Plugin skips SLIC Watch if top-level enabled==false', (t) => {
    const serviceYmlWithDisabled = _.cloneDeep(slsYaml)
    serviceYmlWithDisabled.custom.slicWatch.enabled = false
    const plugin = new ServerlessPlugin(
      {
        ...mockServerless,
        service: {
          ...mockServerless.service,
          ...serviceYmlWithDisabled
        }
      },
      {}
    )
    plugin.finalizeHook()
    t.notOk(testState.alarmsCalled)
    t.end()
  })

  t.end()
})
