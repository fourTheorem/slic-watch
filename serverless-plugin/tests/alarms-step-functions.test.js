'use strict'

const stepFunctionsAlarms = require('../alarms-step-functions')
const CloudFormationTemplate = require('../cf-template')

const { test } = require('tap')
const _ = require('lodash')

const defaultConfig = require('../default-config')
const { cascade } = require('../cascading-config')
const {
  assertCommonAlarmProperties,
  alarmNameToType
} = require('./testing-utils')

const sls = {
  cli: {
    log: () => {}
  }
}

const context = {
  topicArn: 'dummy-arn',
  stackName: 'testStack',
  region: 'eu-west-1'
}

const alarmConfig = cascade(
  _.merge(defaultConfig.alarms, {
    States: {
      Period: 900,
      ExecutionsThrottled: {
        Threshold: 0
      },
      ExecutionsFailed: {
        Threshold: 0
      },
      ExecutionsTimedOut: {
        Threshold: 0
      }
    }
  })
)

const sfAlarmConfig = alarmConfig.States

test('Step Function alarms are created', (t) => {
  const { createStatesAlarms } = stepFunctionsAlarms(sfAlarmConfig, context)
  const cfTemplate = CloudFormationTemplate(
    require('./resources/cloudformation-template-stack.json'),
    sls
  )
  createStatesAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  const alarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 3)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    alarmsByType[alarmType] = alarmsByType[alarmType] || new Set()
    alarmsByType[alarmType].add(al)
  }

  const executionMetrics = [
    'ExecutionsThrottled',
    'ExecutionsFailed',
    'ExecutionsTimedOut'
  ]

  const stateMachineRef = { 'Fn::Ref': 'Workflow' }

  t.same(new Set(Object.keys(alarmsByType)), new Set(executionMetrics))

  for (const type of executionMetrics) {
    t.equal(alarmsByType[type].size, 1)
    for (const al of alarmsByType[type]) {
      t.equal(al.Statistic, 'Sum')
      t.equal(al.Threshold, sfAlarmConfig[type].Threshold)
      t.equal(al.EvaluationPeriods, 1)
      t.equal(al.Namespace, 'AWS/States')
      t.equal(al.Period, sfAlarmConfig.Period)
      t.same(al.Dimensions, [
        {
          Name: 'StateMachineArn',
          Value: stateMachineRef
        }
      ])
    }
  }

  t.end()
})
