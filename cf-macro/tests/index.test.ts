import { test } from 'tap'
import _ from 'lodash'
import type Template from 'cloudform-types/types/template'

import { handler } from '../index'
import _template from './event.json'

const template = _template as Template

const event = { fragment: template }

test('macro returns success', async t => {
  const result = await handler(event)
  t.equal(result.status, 'success')
  t.end()
})

test('macro uses topicArn if specified', async t => {
  const topicArn = 'arn:aws:sns:eu-west-1:123456789123:TestTopic'

  const eventWithTopic = {
    ...event,
    fragment: {
      ...event.fragment,
      Metadata: {
        ...event.fragment.Metadata,
        slicWatch: {
          ...event.fragment.Metadata?.slicWatch,
          alarmActionsConfig: {
            alarmActions: [topicArn],
            okActions: [topicArn]
          }
        }
      }
    }
  }
  const result = await handler(eventWithTopic)
  t.equal(result.status, 'success')
  t.notOk(result.errorMessage)
  t.same(result.fragment.Resources.slicWatchLambdaDurationAlarmHelloLambdaFunction.Properties.AlarmActions, [topicArn])
  t.end()
})

test('Macro skips SLIC Watch if top-level enabled==false', async t => {
  const testevent = _.cloneDeep(event)
  testevent.fragment.Metadata = { slicWatch: { enabled: false } }
  const output = await handler(testevent)
  t.equal(output.status, 'success')
  t.equal(output.fragment, testevent.fragment)
  t.end()
})

test('Macro adds dashboard and alarms if no function configuration is provided', async t => {
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
  const compiledTemplate = (await handler(testEvent)).fragment
  t.same(compiledTemplate.Resources.Properties, template.Resources?.Properties)
  t.end()
})

test('Macro execution fails if an invalid SLIC Watch config is provided', async t => {
  const testevent = _.cloneDeep(event)
  testevent.fragment.Metadata = { slicWatch: { topicArrrrn: 'pirateTopic' } }
  const result = await handler(testevent)
  t.equal(result.status, 'fail')
  t.ok(result.errorMessage)
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
  delete testevent.fragment.Metadata?.slicWatch.alarmActionsConfig
  handler(testevent)
  t.end()
})

test('Macro succeeds with no custom section', async t => {
  const testevent = _.cloneDeep(event)
  delete testevent.fragment.Metadata
  const result = await handler(testevent)
  t.equal(result.status, 'success')
  t.end()
})
