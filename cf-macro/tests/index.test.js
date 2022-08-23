'use strict'

const t = require('tap')
const lambda = require('../index.js')
const template = require('./event.json')

const event = { fragment: template, templateParameterValues: { stack: 'sam-test-stack-project' } }

t.test('macro returns success', t =>
  lambda.handler(event, null).then(result =>
    t.test('check result', t => {
      t.equal(result.status, 'success')
      t.end()
    })))
