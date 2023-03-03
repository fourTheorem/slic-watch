'use strict'

import _ from 'lodash'
import Serverless from 'serverless'
import ServerlessPlugin from '../index'
import { test } from 'tap'
import pino from 'pino'

const slsYaml = {
  custom: {
    slicWatch: {
      topicArn: 'test-topic',
      ActionsEnabled: true
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

const mockServerless = {
  cli: {
    log: () => { '' }
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
  t.test('plugin uses v3 logger if provided', t => {
    const dummyV3Logger = {}
    const plugin = new ServerlessPlugin(mockServerless)
    const logger = Object.assign({}, pino())
    const extras = ['levels', 'silent', 'onChild', 'trace', 'debug', 'info', 'warn', 'error', 'fatal']
    for (const extra of extras) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete logger[extra]
    }
    t.same(logger, dummyV3Logger)
    t.ok(plugin)
    t.end()
  })

  t.test('plugin fails if provider is not aws', t => {
    t.throws(() => new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        provider: { name: 'azure' }
      }
    }))
    t.end()
  })

  t.test('createSlicWatchResources adds dashboard and alarms', t => {
    const plugin = new ServerlessPlugin(mockServerless)
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin succeeds with no custom section', t => {
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        custom: undefined
      }
    })
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin registers the configuration schema', t => {
    const testData = {}
    // eslint-disable-next-line no-new
    new ServerlessPlugin({
      ...mockServerless,
      configSchemaHandler: {
        defineCustomProperties: (schema) => {
          // @ts-expect-error
          testData.schema = schema
        },
        defineFunctionProperties: (provider, schema) => {
          // @ts-expect-error
          testData.functionSchema = schema
        }
      }
    })
    // @ts-expect-error
    t.equal(typeof testData.schema, 'object')
    t.end()
  })

  t.test('Plugin execution succeeds with no slicWatch config', t => {
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        custom: {}
      }
    })
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin execution succeeds if no SNS Topic is provided', t => {
    const serviceYmlWithoutTopic = _.cloneDeep(slsYaml)
    delete serviceYmlWithoutTopic.custom.slicWatch.topicArn
    const plugin = new ServerlessPlugin(
      {
        ...mockServerless,
        service: {
          ...mockServerless.service,
          ...serviceYmlWithoutTopic
        }
      }
    )
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin execution succeeds if resources are provided', t => {
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
      }
    )
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin execution fails if an invalid SLIC Watch config is provided', t => {
    const serviceYmlWithBadProperty = _.cloneDeep(slsYaml)
    // @ts-expect-error
    serviceYmlWithBadProperty.custom.slicWatch.topicArrrrn = 'pirateTopic'
    const plugin = new ServerlessPlugin(
      {
        ...mockServerless,
        service: {
          ...mockServerless.service,
          ...serviceYmlWithBadProperty
        }
      }
    )
    t.throws(() => plugin.createSlicWatchResources(), Serverless)
    t.end()
  })

  t.test('Plugin skips SLIC Watch if top-level enabled==false', t => {
    const serviceYmlWithDisabled = _.cloneDeep(slsYaml)
    serviceYmlWithDisabled.custom.slicWatch.ActionsEnabled = false
    const plugin = new ServerlessPlugin(
      {
        ...mockServerless,
        service: {
          ...mockServerless.service,
          ...serviceYmlWithDisabled
        }
      }
    )
    plugin.createSlicWatchResources()
    t.end()
  })

  t.end()
})
