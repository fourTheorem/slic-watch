'use strict'

import _ from 'lodash'
import esmock from 'esmock'
import Serverless from 'serverless'
import { test } from 'tap'
import pino from 'pino'

const slsYaml = {
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



function getServerlessPlugin(t) {
  return esmock('../index', {
    'slic-watch-core/dashboards/dashboard': () => {
      return {
        addDashboard: (cfTemplate) => {
          t.equal(cfTemplate.getSourceObject(), testCfTemplate)
         
        }
      }
    },
    'slic-watch-core/alarms/alarms': () => {
      return {
        addAlarms: (cfTemplate) => {
          t.equal(cfTemplate.getSourceObject(), testCfTemplate)
        }
      }
    }
  })
  
}



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

  t.test('plugin uses v3 logger if provided', async(t) => {
    const dummyV3Logger = {}
    
    const ServerlessPlugin = await getServerlessPlugin(t)
    const plugin = new ServerlessPlugin(mockServerless, {}, { log: dummyV3Logger })
    const logger =  Object.assign({}, pino()) 
    const extras = ['levels', 'silent', 'onChild', 'trace', 'debug', 'info', 'warn', 'error', 'fatal' ] 
    for (const extra of extras) {
      delete logger[extra]
    }
    t.same(logger, dummyV3Logger)
    t.ok(plugin)
    t.end()
  })

  t.test('plugin fails if provider is not aws', async(t) => {
    const ServerlessPlugin = await getServerlessPlugin(t)
    t.throws(() => new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        provider: { name: 'azure' }
      }
    }))
    t.end()
  })

  t.test('createSlicWatchResources adds dashboard and alarms', async(t) => {
    const ServerlessPlugin = await getServerlessPlugin(t)
    const plugin = new ServerlessPlugin(mockServerless, {})
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin succeeds with no custom section', async(t) => {
    const ServerlessPlugin = await getServerlessPlugin(t)
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

  t.test('Plugin registers the configuration schema', async(t) => {
    const testData = {}
    const ServerlessPlugin = await getServerlessPlugin(t)
    // eslint-disable-next-line no-new
    new ServerlessPlugin({
      ...mockServerless,
      configSchemaHandler: {
        defineCustomProperties: (schema) => {
          // @ts-ignore
          testData.schema = schema
        },
        defineFunctionProperties: (provider, schema) => {
          // @ts-ignore
          testData.functionSchema = schema
        }
      }
    })
    // @ts-ignore
    t.equal(typeof testData.schema, 'object')
    t.end()
  })

  t.test('Plugin execution succeeds with no slicWatch config', async(t) => {
    const ServerlessPlugin = await getServerlessPlugin(t)
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

  t.test('Plugin execution succeeds if no SNS Topic is provided', async(t) => {
    const serviceYmlWithoutTopic = _.cloneDeep(slsYaml)
    // @ts-ignore
    delete serviceYmlWithoutTopic.custom.slicWatch.topicArn
    const ServerlessPlugin = await getServerlessPlugin(t)
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
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin execution succeeds if resources are provided', async(t) => {
    const ServerlessPlugin = await getServerlessPlugin(t)
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
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin execution fails if an invalid SLIC Watch config is provided', async(t) => {
    const serviceYmlWithBadProperty = _.cloneDeep(slsYaml)
    // @ts-ignore
    serviceYmlWithBadProperty.custom.slicWatch.topicArrrrn = 'pirateTopic'
    const ServerlessPlugin = await getServerlessPlugin(t)
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
    t.throws(() => plugin.createSlicWatchResources(), Serverless)
    t.end()
  })

  t.test('Plugin skips SLIC Watch if top-level enabled==false', async(t) => {
    const serviceYmlWithDisabled = _.cloneDeep(slsYaml)
    serviceYmlWithDisabled.custom.slicWatch.enabled = false
    const ServerlessPlugin = await getServerlessPlugin(t)
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
    plugin.createSlicWatchResources()
    t.end()
  })

  t.end()
})
