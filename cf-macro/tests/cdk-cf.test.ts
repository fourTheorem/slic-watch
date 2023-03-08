/* eslint-disable no-template-curly-in-string */
'use strict'

import { test } from 'tap'
import { getResourcesByType } from 'slic-watch-core/cf-template'
import { handler } from '../index'
import cdkStack from './resources/cdk-ecs-cf.json' assert { type: 'json'}

/**
 * Test the synthesized output from the CDK ECS Stack in `cdk-test-project`
 */
test('ECS CDK stack', (t) => {
  const event = {
    fragment: cdkStack
  }
  const handlerResponse = handler(event)
  t.equal(handlerResponse.status, 'success')
  const compiledTemplate = handlerResponse.fragment

  test('alarms are generated', (t) => {
    const alarms = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
    t.equal(Object.keys(alarms).length, 6)
    const alarmNames = Object.values(alarms).map(alarm => alarm.Properties?.AlarmName).sort((a: string, b: string) => a.localeCompare(b))
    t.same(alarmNames, [
      'ECS_CPUAlarm_${MyWebServerService2FE7341D.Name}',
      'ECS_MemoryAlarm_${MyWebServerService2FE7341D.Name}',
      'LoadBalancerHTTPCodeELB5XXCountAlarm_MyWebServerLB3B5FD3AB',
      'LoadBalancerHTTPCodeTarget5XXCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3',
      'LoadBalancerRejectedConnectionCountAlarm_MyWebServerLB3B5FD3AB',
      'LoadBalancerUnHealthyHostCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3'
    ])
    t.end()
  })

  t.end()
})
