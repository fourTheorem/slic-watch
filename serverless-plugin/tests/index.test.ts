import { test } from 'tap'
import _ from 'lodash'
import ServerlessError from 'serverless/lib/serverless-error'

import pino from 'pino'

import ServerlessPlugin from '../serverless-plugin'
import { getLogger } from 'slic-watch-core/logging'

interface TestData {
  schema?
  functionSchema?
}

interface SlsYaml {
  custom?
  functions?
}

// Serverless Framework provides plugins with a logger to use, so we simulate that with this:
const logger = Object.assign({}, pino())
const extras = ['levels', 'silent', 'onChild', 'trace', 'debug', 'info', 'warn', 'error', 'fatal']
for (const extra of extras) {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete logger[extra]
}
const pluginUtils = { log: logger }

const slsYaml: SlsYaml = {
  custom: {
    slicWatch: {
      topicArn: 'test-topic',
      enabled: true
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
      getLambdaLogicalId: (funcName: string) => {
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

function compileServerlessFunctionsToCloudformation (functions: Record<string, any>, provider: () => {
  naming: { getLambdaLogicalId: (funcName: string) => string }
}) {
  const compiledCloudFormationTemplate = Object.keys(functions).map(lambda => {
    const compiledLambdaLogicalId = provider().naming.getLambdaLogicalId(lambda)
    const result = {}
    result[`${compiledLambdaLogicalId}`] = {
      Type: 'AWS::Lambda::Function',
      MemorySize: 256,
      Runtime: 'nodejs12',
      Timeout: 60
    }
    return result
  }).reduce((accum, currentValue) => ({ ...accum, ...currentValue }))
  return { Resources: compiledCloudFormationTemplate }
}

test('index', t => {
  t.test('plugin uses v3 logger', t => {
    // Since v3, Serverless Framework provides a logger that we must use to log output
    const plugin = new ServerlessPlugin(mockServerless, null, pluginUtils)
    t.same(getLogger(), logger)
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
    }, null, pluginUtils))
    t.end()
  })

  t.test('createSlicWatchResources adds dashboard and alarms', t => {
    const plugin = new ServerlessPlugin(mockServerless, null, pluginUtils)
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
    }, null, pluginUtils)
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin registers the configuration schema', t => {
    const testData: TestData = {}
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
    }, null, pluginUtils)
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
    }, null, pluginUtils)
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin execution succeeds if no SNS Topic is provided', t => {
    const serviceYmlWithoutTopic = _.cloneDeep(slsYaml)
    delete serviceYmlWithoutTopic.custom.slicWatch.topicArn
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        ...serviceYmlWithoutTopic
      }
    }, null, pluginUtils)
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin execution succeeds if resources are provided', t => {
    const plugin = new ServerlessPlugin({
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
    }, null, pluginUtils)
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin execution fails if an invalid SLIC Watch config is provided', t => {
    const serviceYmlWithBadProperty = _.cloneDeep(slsYaml)
    serviceYmlWithBadProperty.custom.slicWatch.topicArrrrn = 'pirateTopic'
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        ...serviceYmlWithBadProperty
      }
    }, null, pluginUtils)
    t.throws(() => { plugin.createSlicWatchResources() }, ServerlessError)
    t.end()
  })

  t.test('Plugin skips SLIC Watch if top-level enabled==false', t => {
    const serviceYmlWithDisabled = _.cloneDeep(slsYaml)
    serviceYmlWithDisabled.custom.slicWatch.enabled = false
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        ...serviceYmlWithDisabled
      }
    }, null, pluginUtils)
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('should create only the dashboard when a lambda is not referenced in the serverless functions config', t => {
    const mockServerless = {
      getProvider: () => {
      },
      service: {
        getAllFunctions: () => [],
        provider: {
          name: 'aws',
          compiledCloudFormationTemplate: {
            Resources: {
              HelloTestLambda: {
                Type: 'AWS::Lambda::Function',
                MemorySize: 256,
                Runtime: 'nodejs12',
                Timeout: 60
              }
            }
          }
        },
        custom: {
          slicWatch: {
            enabled: true
          }
        }
      }
    }
    const plugin = new ServerlessPlugin(mockServerless, null, pluginUtils)
    plugin.createSlicWatchResources()
    t.same(Object.keys(mockServerless.service.provider.compiledCloudFormationTemplate.Resources), ['HelloTestLambda', 'slicWatchDashboard'])
    t.end()
  })

  t.test('should create only the dashboard and lambda alarm when the lambda is referenced in the serverless functions config', t => {
    const functions = { MyServerlessFunction: {} }
    const provider = () => ({
      naming: {
        getLambdaLogicalId: (funcName: string) => {
          return funcName[0].toUpperCase() + funcName.slice(1) + 'LambdaFunction'
        }
      }
    })
    const compiledCloudFormationTemplate = compileServerlessFunctionsToCloudformation(functions, provider)

    const mockServerless = {
      getProvider: provider,
      service: {
        getAllFunctions: () => Object.keys(functions),
        provider: {
          name: 'aws',
          compiledCloudFormationTemplate
        },
        custom: {
          slicWatch: {
            enabled: true
          }
        },
        getFunction: (funcRef) => functions[funcRef]
      }
    }
    const plugin = new ServerlessPlugin(mockServerless, null, pluginUtils)
    plugin.createSlicWatchResources()
    t.same(Object.keys(mockServerless.service.provider.compiledCloudFormationTemplate.Resources),
      [
        'MyServerlessFunctionLambdaFunction',
        'slicWatchDashboard',
        'slicWatchLambdaErrorsAlarmMyServerlessFunctionLambdaFunction',
        'slicWatchLambdaThrottlesAlarmMyServerlessFunctionLambdaFunction',
        'slicWatchLambdaDurationAlarmMyServerlessFunctionLambdaFunction'
      ])
    t.end()
  })
  t.end()
})
