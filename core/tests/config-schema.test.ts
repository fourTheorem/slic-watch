'use strict'
// @ts-ignore
import Ajv from 'ajv'
import { test } from 'tap'

import defaultConfig from '../default-config'
import { pluginConfigSchema, slicWatchSchema } from '../config-schema'

test('Default config conforms to the config schema', (t) => {
  const slicWatchConfig = {
    ...defaultConfig,
    topicArn: 'dummy-topic-arn'
  }

  const ajv = new Ajv({
    unicodeRegExp: false
  })
  const slicWatchValidate = ajv.compile(slicWatchSchema)
  const slicWatchValid = slicWatchValidate(slicWatchConfig)
  t.ok(slicWatchValid, slicWatchValidate.errors)

  const pluginValidate = ajv.compile(pluginConfigSchema)
  const testConfig = { slicWatch: slicWatchConfig }
  const pluginValid = pluginValidate(testConfig)
  t.ok(pluginValid, pluginValidate.errors)

  t.end()
})

test('Default config conforms to the config schema without topicArn', (t) => {
  const slicWatchConfig = {
    ...defaultConfig
  }

  const ajv = new Ajv({
    unicodeRegExp: false
  })
  const slicWatchValidate = ajv.compile(slicWatchSchema)
  const slicWatchValid = slicWatchValidate(slicWatchConfig)
  t.ok(slicWatchValid, slicWatchValidate.errors)

  const pluginValidate = ajv.compile(pluginConfigSchema)
  const testConfig = { slicWatch: slicWatchConfig }
  const pluginValid = pluginValidate(testConfig)
  t.ok(pluginValid, pluginValidate.errors)

  t.end()
})
