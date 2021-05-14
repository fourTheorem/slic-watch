'use strict'

const Ajv = require('ajv')
const { test } = require('tap')

const defaultConfig = require('../default-config')
const configSchema = require('../config-schema')

test('Default config conforms to the config schema', (t) => {
  const ajv = new Ajv()
  const validate = ajv.compile(configSchema)
  const testConfig = {
    ...defaultConfig,
    topicArn: 'dummy-topic-arn'
  }
  const valid = validate(testConfig)
  t.ok(valid, validate.errors)
  t.end()
})
