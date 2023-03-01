'use strict'

import { test } from 'tap'
import _ from 'lodash'
import esmock from 'esmock'
import { CloudFormationTemplate } from 'slic-watch-core/cf-template'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const template = require('./event.json')

const event = { fragment: template, templateParameterValues: { stack: 'sam-test-stack-project' } }

function getLambda(onDashboard, onAlarms) {
  return esmock('../index', {
    'slic-watch-core/dashboards/dashboard': () => {
      return {
        addDashboard: (cfTemplate: CloudFormationTemplate) => {
          onDashboard(cfTemplate)
        }
      }
    },
    'slic-watch-core/alarms/alarms': () => {
      return {
        addAlarms: (cfTemplate: CloudFormationTemplate) => {
          onAlarms(cfTemplate)
        }
      }
    }
  })
}

test('index', t => {
  t.test('macro returns success', async t => {
    const lambda = await getLambda(cfTemplate => {}, cfTemplate => {})
    const result = await lambda.handler(event, null)
    t.equal(result.status, 'success')
  })

  t.test('macro uses SNS Topic environment variable if specified', async t => {
    process.env.ALARM_SNS_TOPIC = 'arn:aws:sns:eu-west-1:123456789123:TestTopic'
    const lambda = await getLambda(cfTemplate => {}, cfTemplate => {})
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
    const lambda = await getLambda(cfTemplate => {}, cfTemplate => {})
    const result = await lambda.handler(eventWithTopic, null)
    t.equal(result.status, 'success')
  })

  t.test('Macro skips SLIC Watch if top-level enabled==false', async t => {
    const lambda = await getLambda(cfTemplate => {}, cfTemplate => t.fail('Should not be called'))
    const testevent = _.cloneDeep(event)
    testevent.fragment.Metadata.slicWatch.enabled = false
    await lambda.handler(testevent, null)
    t.end()
  })

  t.test('Macro adds dashboard and alarms', async t => {
    t.plan(2, 'alarms and dashboards called')
    const lambda = await getLambda(
      cfTemplate => t.same(cfTemplate.getSourceObject(), template),
      cfTemplate => t.same(cfTemplate.getSourceObject(), template)
    )
    await lambda.handler(event, null)
    t.end()
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
    t.plan(2, 'alarms and dashboards properties are the same')
    const lambda = await getLambda(
      cfTemplate => t.same(cfTemplate.getSourceObject().Resources.Properties, template.Resources.Properties),
      cfTemplate => t.same(cfTemplate.getSourceObject().Resources.Properties, template.Resources.Properties)
    )
    await lambda.handler(testEvent, null)
    t.end()
  })

  t.test('Macro execution fails if an invalid SLIC Watch config is provided', async t => {
    const lambda = await getLambda(cfTemplate => {}, cfTemplate => {})
    const testevent = _.cloneDeep(event)
    testevent.fragment.Metadata.slicWatch.topicArrrrn = 'pirateTopic'
    const result = await lambda.handler(testevent, null)
    t.equal(result.status, 'fail')
  })

  t.test('Macro execution succeeds with no slicWatch config', async t => {
    t.plan(1, 'alarms called')
    const lambda = await getLambda(cfTemplate => {}, cfTemplate => t.ok(true))
    const testevent = _.cloneDeep(event)
    delete testevent.fragment.Metadata.slicWatch
    await lambda.handler(testevent, null)
    t.end()
  })

  t.test('Macro execution succeeds if no SNS Topic is provided', async t => {
    t.plan(1, 'alarms called')
    const lambda = await getLambda(cfTemplate => {}, cfTemplate => t.ok(true))
    const testevent = _.cloneDeep(event)
    delete testevent.fragment.Metadata.slicWatch.topicArn
    await lambda.handler(testevent, null)
    t.end()
  })

  t.test('Macro succeeds with no custom section', async t => {
    const lambda = await getLambda(cfTemplate => {}, cfTemplate => {})
    const testevent = _.cloneDeep(event)
    delete testevent.fragment.Metadata
    const result = await lambda.handler(testevent, null)
    t.equal(result.status, 'success')
  })

  t.end()
})
