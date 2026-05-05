import { test } from 'tap'
import _ from 'lodash'
import type Template from 'cloudform-types/types/template'

import ServerlessPlugin from '../serverless-plugin'
import { getLogger } from 'slic-watch-core/logging'
import { type SlsYaml, createMockServerless, dummyLogger, getMockLambdaLogicalId, pluginUtils, slsYaml } from '../../test-utils/sls-test-utils'
import { type ResourceType } from 'slic-watch-core'
import { getDashboardFromTemplate, getDashboardWidgetsByTitle } from 'slic-watch-core/tests/testing-utils'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

interface TestData {
  schema?
  functionSchema?
}

const mockServerless = createMockServerless({
  Resources: {
    HelloLambdaFunction: {
      Type: 'AWS::Lambda::Function',
      Properties: {
        FunctionName: 'serverless-test-project-dev-hello'
      }
    }
  }
})

test('index', t => {
  t.test('plugin uses framework logger', t => {
    // Serverless Framework provides the logger we must use to log output
    const plugin = new ServerlessPlugin(mockServerless, {}, pluginUtils)
    t.same(getLogger(), dummyLogger)
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
    }, {}, pluginUtils))
    t.end()
  })

  t.test('createSlicWatchResources adds dashboard and alarms', t => {
    const plugin = new ServerlessPlugin(mockServerless, {}, pluginUtils)
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('function-level overrides in serverless `functions` block take precedence', t => {
    const compiledTemplate: Template = {
      Resources: {
        HelloLambdaFunction: {
          Type: 'AWS::Lambda::Function',
          Properties: {
            FunctionName: 'serverless-test-project-dev-hello'
          }
        }
      }
    }
    const slsConfig: SlsYaml = {
      custom: {
        slicWatch: {
          alarms: {
            Lambda: {
              Invocations: {
                enabled: true,
                Threshold: 10
              }
            }
          },
          dashboard: {
            widgets: {
              Lambda: {
                Invocations: {
                  yAxis: 'left'
                }
              }
            }
          }
        }
      },
      functions: {
        hello: {
          slicWatch: {
            enabled: true
          }
        }
      }
    }

    t.test('Plugin succeeds without function-level overrides', t => {
      const sls = createMockServerless(compiledTemplate, slsConfig)
      const plugin = new ServerlessPlugin(sls, {}, pluginUtils)
      plugin.createSlicWatchResources()
      const invocationAlarmProperties = (compiledTemplate.Resources as ResourceType).slicWatchLambdaInvocationsAlarmHelloLambdaFunction.Properties
      t.equal(invocationAlarmProperties?.Threshold, 10)

      const { dashboard } = getDashboardFromTemplate(compiledTemplate)
      const widgets = getDashboardWidgetsByTitle(dashboard, /Lambda Invocations/)
      t.equal(widgets.length, 1)
      t.match((widgets[0].properties as MetricWidgetProperties).metrics, [
        ['AWS/Lambda', 'Invocations', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Sum', yAxis: 'left' }]
      ])

      t.end()
    })

    t.test('Plugin succeeds with function-level overrides', t => {
      const modifiedSlsConfig = _.cloneDeep(slsConfig)
      Object.assign(modifiedSlsConfig.functions.hello.slicWatch, {
        alarms: {
          Invocations: {
            Threshold: 3,
            enabled: true
          }
        },
        dashboard: {
          Invocations: {
            yAxis: 'right'
          }
        }
      })

      const sls = createMockServerless(compiledTemplate, modifiedSlsConfig)
      const plugin = new ServerlessPlugin(sls, {}, pluginUtils)
      plugin.createSlicWatchResources()
      const invocationAlarmProperties = (compiledTemplate.Resources as ResourceType).slicWatchLambdaInvocationsAlarmHelloLambdaFunction.Properties
      t.equal(invocationAlarmProperties?.Threshold, 3)

      const { dashboard } = getDashboardFromTemplate(compiledTemplate)
      const widgets = getDashboardWidgetsByTitle(dashboard, /Lambda Invocations/)
      t.equal(widgets.length, 1)
      t.match((widgets[0].properties as MetricWidgetProperties).metrics, [
        ['AWS/Lambda', 'Invocations', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Sum', yAxis: 'right' }]
      ])
      t.end()
    })

    t.test('Plugin succeeds with legacy function-level overrides', t => {
      const modifiedSlsConfig = _.cloneDeep(slsConfig)
      Object.assign(modifiedSlsConfig.functions.hello.slicWatch, {
        alarms: {
          Lambda: { // This extra property is the 'legacy' configuration bit
            Invocations: {
              Threshold: 4,
              enabled: true
            }
          }
        },
        dashboard: {
          Lambda: { // This extra property is the 'legacy' configuration bit
            Invocations: {
              yAxis: 'right'
            }
          }
        }
      })

      const sls = createMockServerless(compiledTemplate, modifiedSlsConfig)
      const plugin = new ServerlessPlugin(sls, {}, pluginUtils)
      plugin.createSlicWatchResources()
      const invocationAlarmProperties = (compiledTemplate.Resources as ResourceType).slicWatchLambdaInvocationsAlarmHelloLambdaFunction.Properties
      t.equal(invocationAlarmProperties?.Threshold, 4)

      const { dashboard } = getDashboardFromTemplate(compiledTemplate)
      const widgets = getDashboardWidgetsByTitle(dashboard, /Lambda Invocations/)
      t.equal(widgets.length, 1)
      t.match((widgets[0].properties as MetricWidgetProperties).metrics, [
        ['AWS/Lambda', 'Invocations', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Sum', yAxis: 'right' }]
      ])
      t.end()
    })

    t.end()
  })

  t.test('Plugin succeeds with no custom section', t => {
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        custom: undefined
      }
    }, {}, pluginUtils)
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
    }, {}, pluginUtils)
    t.equal(typeof testData.schema, 'object')
    t.end()
  })

  t.test('Plugin applies function-level overrides for hyphenated function names', t => {
    const functionName = 'get-user-order'
    const functionLogicalId = getMockLambdaLogicalId(functionName)
    const compiledTemplate: Template = {
      Resources: {
        [functionLogicalId]: {
          Type: 'AWS::Lambda::Function',
          Properties: {
            FunctionName: `serverless-test-project-dev-${functionName}`
          }
        }
      }
    }
    const slsConfig: SlsYaml = {
      custom: {
        slicWatch: {
          alarms: {
            Lambda: {
              Invocations: {
                enabled: true,
                Threshold: 10
              }
            }
          }
        }
      },
      functions: {
        [functionName]: {
          slicWatch: {
            alarms: {
              Invocations: {
                Threshold: 3,
                enabled: true
              }
            }
          }
        }
      }
    }

    const sls = createMockServerless(compiledTemplate, slsConfig)
    const plugin = new ServerlessPlugin(sls, {}, pluginUtils)
    plugin.createSlicWatchResources()

    const invocationAlarmProperties = (compiledTemplate.Resources as ResourceType)[`slicWatchLambdaInvocationsAlarm${functionLogicalId}`].Properties
    t.equal(invocationAlarmProperties?.Threshold, 3)

    const { dashboard } = getDashboardFromTemplate(compiledTemplate)
    const widgets = getDashboardWidgetsByTitle(dashboard, /Lambda Invocations/)
    t.equal(widgets.length, 1)
    t.match((widgets[0].properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Invocations', 'FunctionName', `\${${functionLogicalId}}`, { stat: 'Sum', yAxis: 'left' }]
    ])
    t.end()
  })

  t.test('Plugin execution succeeds with no slicWatch config', t => {
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        custom: {}
      }
    }, {}, pluginUtils)
    plugin.createSlicWatchResources()
    t.end()
  })

  t.test('Plugin execution succeeds if no SNS Topic is provided', t => {
    const serviceYmlWithoutTopic = _.cloneDeep(slsYaml)
    delete serviceYmlWithoutTopic.custom.slicWatch.topicArn
    delete serviceYmlWithoutTopic.custom.slicWatch.alarmActionsConfig
    const plugin = new ServerlessPlugin({
      ...mockServerless,
      service: {
        ...mockServerless.service,
        ...serviceYmlWithoutTopic
      }
    }, {}, pluginUtils)
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
    }, {}, pluginUtils)
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
    }, {}, pluginUtils)
    const err = t.throws(() => { plugin.createSlicWatchResources() })
    t.equal(err?.name, 'ServerlessError')
    t.match(err?.message, /SLIC Watch configuration is invalid/)
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
    }, {}, pluginUtils)
    plugin.createSlicWatchResources()
    t.end()
  })
  t.end()
})
