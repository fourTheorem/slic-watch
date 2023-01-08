'use strict'

import { test } from 'tap'
import _ from 'lodash'
import esmock from 'esmock'
import { CloudFormationTemplate } from "../../core/cf-template.d"
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const template = require('./event.json')

const event = { fragment: template, templateParameterValues: { stack: 'sam-test-stack-project' } }


type TestState = {
  dashboardCalled?:boolean,
  alarmsCalled?: boolean,
  addDashboardCfTemplate?: CloudFormationTemplate,
  addAlarmsCfTemplate?: CloudFormationTemplate
}

let testState: TestState

const lambda = await esmock('../index', {
  'slic-watch-core/dashboard': () => {
    testState.dashboardCalled = true
    return {
      addDashboard: (cfTemplate: CloudFormationTemplate) => {
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

  t.test('macro uses SNS Topic environment variable if specified', async t => {
    process.env.ALARM_SNS_TOPIC = 'arn:aws:sns:eu-west-1:123456789123:TestTopic'
    try {
      const result = await lambda.handler(event, null)
      t.equal(result.status, 'success')
    } finally {
      delete process.env.ALARM_SNS_TOPIC
    }
  })

  t.test('macro uses topicArn if specified', async t => {
    const eventWithTopic = {
      ...event,
      fragment: {
        ...event.fragment,
        Metadata: {
          ...event.fragment.Metadata,
          slicWatch: {
            ...event.fragment.Metadata.slicWatch,
            topicArn: 'arn:aws:sns:eu-west-1:123456789123:TestTopic'
          }
        }
      }
    }
    const result = await lambda.handler(eventWithTopic, null)
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
    t.equal(testState.addDashboardCfTemplate?.getSourceObject(), template)
    t.equal(testState.addAlarmsCfTemplate?.getSourceObject(), template)
  })

  t.test('Macro adds dashboard and alarms if no function configuration is provided', async t => {
    const testEvent = {
      ...event,
      fragment: {
        ...event.fragment,
        Resources: {
          ...event.fragment.Resources,
          HelloLambdaFunction: {
            ...event.fragment.Resources.HelloLambdaFunction,
            Metadata: {}
          }
        }
      }
    }
    await lambda.handler(testEvent, null)
    // @ts-ignore
    t.equal(testState.addDashboardCfTemplate.getSourceObject().Resources.Properties, template.Resources.Properties)
    // @ts-ignore
    t.equal(testState.addAlarmsCfTemplate.getSourceObject().Resources.Properties, template.Resources.Properties)
  })

  t.test('Macro execution fails if an invalid SLIC Watch config is provided', async t => {
    const testevent = _.cloneDeep(event)
    testevent.fragment.Metadata.slicWatch.topicArrrrn = 'pirateTopic'
    const result = await lambda.handler(testevent, null)
    t.equal(result.status, 'fail')
  })

  t.test('Macro execution succeeds with no slicWatch config', async t => {
    const testevent = _.cloneDeep(event)
    delete testevent.fragment.Metadata.slicWatch
    await lambda.handler(testevent, null)
    t.ok(testState.alarmsCalled)
  })

  t.test('Macro execution succeeds if no SNS Topic is provided', async t => {
    const testevent = _.cloneDeep(event)
    delete testevent.fragment.Metadata.slicWatch.topicArn
    await lambda.handler(testevent, null)
    t.ok(testState.alarmsCalled)
  })

  t.test('Macro succeeds with no custom section', async t => {
    const testevent = _.cloneDeep(event)
    delete testevent.fragment.Metadata
    const result = await lambda.handler(testevent, null)
    t.equal(result.status, 'success')
  })

  t.end()
})


  

  

