import { test } from 'tap'
import _ from 'lodash'
import ServerlessError from 'serverless/lib/serverless-error'
import type Template from 'cloudform-types/types/template'

import ServerlessPlugin from '../serverless-plugin'
import { getLogger } from 'slic-watch-core/logging'
import { type SlsYaml, createMockServerless, dummyLogger, pluginUtils, slsYaml } from '../../test-utils/sls-test-utils'
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
  t.test('plugin uses v3 logger', t => {
    // Since v3, Serverless Framework provides a logger that we must use to log output
    const plugin = new ServerlessPlugin(mockServerless, null, pluginUtils)
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
    }, null, pluginUtils))
    t.end()
  })

  t.test('createSlicWatchResources adds dashboard and alarms', t => {
    const plugin = new ServerlessPlugin(mockServerless, null, pluginUtils)
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
      const plugin = new ServerlessPlugin(sls, null, pluginUtils)
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
      const plugin = new ServerlessPlugin(sls, null, pluginUtils)
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
      const plugin = new ServerlessPlugin(sls, null, pluginUtils)
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
    delete serviceYmlWithoutTopic.custom.slicWatch.alarmActionsConfig
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
  t.end()
})
