'use strict'

const { test } = require('tap')
const _ = require('lodash')
const template = require('./event.json')
const proxyrequire = require('proxyquire')
const event = { fragment: template, templateParameterValues: { stack: 'sam-test-stack-project' } }

let testState = {}

const lambda = proxyrequire('../index', {
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

test('index', t => {
  t.beforeEach(t => {
    testState = {}
  })

  t.test('macro returns success', async t => {
    const result = await lambda.handler(event, null)
    t.equal(result.status, 'success')
  })

  t.test('Macro skips SLIC Watch if top-level enabled==false', async t => {
    const testevent = _.cloneDeep(event)
    testevent.fragment.Metadata.slicWatch.enabled = false
    await lambda.handler(testevent, null)
    t.notOk(testState.alarmsCalled)
  })

  t.test('Macro adds dashboard and alarms', async t => {
    await lambda.handler(event, null)
    t.equal(testState.addDashboardCfTemplate.getSourceObject(), template)
    t.equal(testState.addAlarmsCfTemplate.getSourceObject(), template)
  })

  t.test('Plugin execution fails if an invalid SLIC Watch config is provided', async t => {
    const testevent = _.cloneDeep(event)
    testevent.fragment.Metadata.slicWatch.topicArrrrn = 'pirateTopic'
    const result = await lambda.handler(testevent, null)
    t.equal(result.status, 'fail')
  })

  t.test('Plugin execution succeeds with no slicWatch config', async t => {
    const testevent = _.cloneDeep(event)
    delete testevent.fragment.Metadata.slicWatch
    await lambda.handler(testevent, null)
    t.ok(testState.alarmsCalled)
  })

  t.test('Plugin execution succeeds if no SNS Topic is provided', async t => {
    const testevent = _.cloneDeep(event)
    delete testevent.fragment.Metadata.slicWatch.topicArn
    await lambda.handler(testevent, null)
    t.ok(testState.alarmsCalled)
  })

  t.test('Plugin succeeds with no custom section', async t => {
    const testevent = _.cloneDeep(event)
    delete testevent.fragment.Metadata
    const result = await lambda.handler(testevent, null)
    t.equal(result.status, 'success')
  })

  t.end()
})
