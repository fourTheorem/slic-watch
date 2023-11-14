import { test } from 'tap'
import type { Template } from 'cloudform-types'
import { getResourcesByType } from 'slic-watch-core/cf-template'
import { handler } from '../index'
import cdkStack from './resources/cdk-ecs-cf.json'

/**
 * Test the synthesized output from the CDK ECS Stack in `cdk-test-project`
 */
test('ECS CDK stack', async (t) => {
  const event = {
    fragment: cdkStack as Template,
    requestId: 'test'
  }

  const handlerResponse = await handler(event)
  t.equal(handlerResponse.status, 'success')
  const compiledTemplate = handlerResponse.fragment as Template

  test('alarms are generated', (t) => {
    const alarms = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
    t.equal(Object.keys(alarms).length, 6)
    const alarmNames = Object.values(alarms).map(alarm => (typeof alarm.Properties?.AlarmName === 'string' ? alarm.Properties?.AlarmName : alarm.Properties?.AlarmName.payload[0])).sort((a: string, b: string) => a.localeCompare(b))
    t.same(alarmNames, [
      'ECS_CPUAlarm_${MyWebServerService2FE7341D.Name}',
      'ECS_MemoryAlarm_${MyWebServerService2FE7341D.Name}',
      'LoadBalancer_HTTPCodeELB5XXCountAlarm_MyWebServerLB3B5FD3AB',
      'LoadBalancer_HTTPCodeTarget5XXCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3',
      'LoadBalancer_RejectedConnectionCountAlarm_MyWebServerLB3B5FD3AB',
      'LoadBalancer_UnHealthyHostCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3'
    ])
    t.end()
  })

  t.end()
})
