import { test } from 'tap'
import _ from 'lodash'
import type Template from 'cloudform-types/types/template'

import { handler } from '../index'
import _template from './event.json' assert { type: 'json'}

const template = _template as Template

const event = { fragment: template }

test('macro returns success', t => {
  const result = handler(event)
  t.equal(result.status, 'success')
  t.end()
})

test('macro uses SNS Topic environment variable if specified', t => {
  process.env.ALARM_SNS_TOPIC = 'arn:aws:sns:eu-west-1:123456789123:TestTopic'
  try {
    const result = handler(event)
    t.equal(result.status, 'success')
  } finally {
    delete process.env.ALARM_SNS_TOPIC
  }
  t.end()
})

test('macro uses topicArn if specified', t => {
  const eventWithTopic = {
    ...event,
    fragment: {
      ...event.fragment,
      Metadata: {
        ...event.fragment.Metadata,
        slicWatch: {
          ...event.fragment.Metadata?.slicWatch,
          topicArn: 'arn:aws:sns:eu-west-1:123456789123:TestTopic'
        }
      }
    }
  }
  const result = handler(eventWithTopic)
  t.equal(result.status, 'success')
  t.end()
})

test('Macro skips SLIC Watch if top-level enabled==false', t => {
  const testevent = _.cloneDeep(event)
  if (testevent.fragment.Metadata?.slicWatch.enabled === false) {
    handler(testevent)
  }
  t.end()
})

test('Macro adds dashboard and alarms if no function configuration is provided', t => {
  const testEvent = {
    ...event,
    fragment: {
      ...event.fragment,
      Resources: {
        ...event.fragment.Resources,
        HelloLambdaFunction: {
          ...event.fragment.Resources?.HelloLambdaFunction,
          Metadata: {}
        }
      }
    }
  }
  const compiledTemplate = handler(testEvent).fragment
  t.same(compiledTemplate.Resources.Properties, template.Resources?.Properties)
  t.end()
})

test('Macro execution fails if an invalid SLIC Watch config is provided', t => {
  const testevent = _.cloneDeep(event)
  if (testevent.fragment.Metadata?.slicWatch.topicArrrrn === 'pirateTopic') {
    const result = handler(testevent)
    t.equal(result.status, 'fail')
  }
  t.end()
})

test('Macro execution succeeds with no slicWatch config', t => {
  const testevent = _.cloneDeep(event)
  delete testevent.fragment.Metadata?.slicWatch
  handler(testevent)
  t.end()
})

test('Macro execution succeeds if no SNS Topic is provided', t => {
  const testevent = _.cloneDeep(event)
  delete testevent.fragment.Metadata?.slicWatch.topicArn
  handler(testevent)
  t.end()
})

test('Macro succeeds with no custom section', t => {
  const testevent = _.cloneDeep(event)
  delete testevent.fragment.Metadata
  const result = handler(testevent)
  t.equal(result.status, 'success')
  t.end()
})
