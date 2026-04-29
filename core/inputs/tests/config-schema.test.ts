
import Ajv, { type ValidateFunction } from 'ajv'
import { test } from 'tap'
import defaultConfig from '../default-config'
import { functionConfigSchema, pluginConfigSchema, slicWatchSchema } from '../config-schema'

function createAjv () {
  return new Ajv({
    unicodeRegExp: false
  })
}

function getErrorsText (validate: ValidateFunction, ajv: Ajv): string {
  return ajv.errorsText(validate.errors)
}

test('Default config conforms to the config schema', (t) => {
  const slicWatchConfig = {
    ...defaultConfig,
    topicArn: 'dummy-topic-arn',
    alarmActionsConfig: {
      alarmActions: [],
      okActions: []
    }
  }
  const ajv = createAjv()
  const slicWatchValidate = ajv.compile(slicWatchSchema)
  const slicWatchValid = slicWatchValidate(slicWatchConfig)
  t.ok(slicWatchValid, getErrorsText(slicWatchValidate, ajv))
  const pluginValidate = ajv.compile(pluginConfigSchema)
  const testConfig = { slicWatch: slicWatchConfig }
  const pluginValid = pluginValidate(testConfig)
  t.ok(pluginValid, getErrorsText(pluginValidate, ajv))
  t.end()
})

test('Default config conforms to the config schema without topicArn', (t) => {
  const slicWatchConfig = {
    ...defaultConfig
  }

  const ajv = createAjv()
  const slicWatchValidate = ajv.compile(slicWatchSchema)
  const slicWatchValid = slicWatchValidate(slicWatchConfig)
  t.ok(slicWatchValid, getErrorsText(slicWatchValidate, ajv))

  const pluginValidate = ajv.compile(pluginConfigSchema)
  const testConfig = { slicWatch: slicWatchConfig }
  const pluginValid = pluginValidate(testConfig)
  t.ok(pluginValid, getErrorsText(pluginValidate, ajv))

  t.end()
})

test('Invalid ExtendedStatistic is rejected', (t) => {
  const ajv = createAjv()
  const validate = ajv.compile(slicWatchSchema)
  const isValid = validate({
    alarms: {
      AppSync: {
        Latency: {
          ExtendedStatistic: 'p100.1'
        }
      }
    }
  })
  t.equal(isValid, false)
  t.match(getErrorsText(validate, ajv), /pattern/)
  t.end()
})

test('Invalid dashboard time range is rejected', (t) => {
  const ajv = createAjv()
  const validate = ajv.compile(slicWatchSchema)
  const isValid = validate({
    dashboard: {
      timeRange: {
        start: 'yesterday'
      }
    }
  })
  t.equal(isValid, false)
  t.match(getErrorsText(validate, ajv), /start/)
  t.end()
})

test('Function config schema accepts direct Lambda overrides', (t) => {
  const ajv = createAjv()
  const validate = ajv.compile(functionConfigSchema)
  const isValid = validate({
    slicWatch: {
      alarms: {
        Invocations: {
          enabled: true,
          Threshold: 2
        }
      },
      dashboard: {
        Invocations: {
          yAxis: 'right'
        }
      }
    }
  })
  t.equal(isValid, true, getErrorsText(validate, ajv))
  t.end()
})

test('Function config schema accepts legacy Lambda wrapper', (t) => {
  const ajv = createAjv()
  const validate = ajv.compile(functionConfigSchema)
  const isValid = validate({
    slicWatch: {
      alarms: {
        Lambda: {
          Invocations: {
            enabled: true,
            Threshold: 2
          }
        }
      },
      dashboard: {
        Lambda: {
          Invocations: {
            yAxis: 'right'
          }
        }
      }
    }
  })
  t.equal(isValid, true, getErrorsText(validate, ajv))
  t.end()
})

test('Function config schema rejects unknown direct Lambda metrics', (t) => {
  const ajv = createAjv()
  const validate = ajv.compile(functionConfigSchema)
  const isValid = validate({
    slicWatch: {
      alarms: {
        UnknownMetric: {
          enabled: true
        }
      }
    }
  })
  t.equal(isValid, false)
  t.match(getErrorsText(validate, ajv), /additional properties/)
  t.end()
})
