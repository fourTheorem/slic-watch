'use strict'

import { test } from 'tap'
import _ from 'lodash'
import template from './event.json'
import esmock from 'esmock'
const event = { fragment: template, templateParameterValues: { stack: 'sam-test-stack-project' } }

let testState = {}

test('should mock slic-watch-core/dashboard ', async () => {
  const lambda = await esmock('../index', {
    'slic-watch-core/dashboard': () => {
      // @ts-ignore
      testState.dashboardCalled = true
      return {
        addDashboard: (cfTemplate) => {
          // @ts-ignore
          testState.addDashboardCfTemplate = cfTemplate
        }
      }
    },
    'slic-watch-core/alarms': () => {
      // @ts-ignores
      testState.alarmsCalled = true
      return {
        addAlarms: (cfTemplate) => {
          // @ts-ignore
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
      // @ts-ignore
      t.notOk(testState.alarmsCalled)
    })

    t.test('Macro adds dashboard and alarms', async t => {
      await lambda.handler(event, null)
      // @ts-ignore
      t.equal(testState.addDashboardCfTemplate.getSourceObject(), template)
      // @ts-ignore
      t.equal(testState.addAlarmsCfTemplate.getSourceObject(), template)
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
      // @ts-ignore
      testevent.fragment.Metadata.slicWatch.topicArrrrn = 'pirateTopic'
      const result = await lambda.handler(testevent, null)
      t.equal(result.status, 'fail')
    })

    t.test('Macro execution succeeds with no slicWatch config', async t => {
      const testevent = _.cloneDeep(event)
      // @ts-ignore
      delete testevent.fragment.Metadata.slicWatch
      await lambda.handler(testevent, null)
      // @ts-ignore
      t.ok(testState.alarmsCalled)
    })

    t.test('Macro execution succeeds if no SNS Topic is provided', async t => {
      const testevent = _.cloneDeep(event)
      // @ts-ignore
      delete testevent.fragment.Metadata.slicWatch.topicArn
      await lambda.handler(testevent, null)
      // @ts-ignore
      t.ok(testState.alarmsCalled)
    })

    t.test('Macro succeeds with no custom section', async t => {
      const testevent = _.cloneDeep(event)
      // @ts-ignore
      delete testevent.fragment.Metadata
      const result = await lambda.handler(testevent, null)
      t.equal(result.status, 'success')
    })

    t.end()
  })
})
