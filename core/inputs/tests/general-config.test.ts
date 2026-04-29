import { test } from 'tap'

import { type SlicWatchConfig, resolveSlicWatchConfig } from '../general-config'

const topic1 = 'arn:aws:sns::eu-west-1123456789012:MyTopic'
const topic2 = 'arn:aws:sns::eu-west-1123456789012:MyOtherTopic'

test('Configuration resolves topicArn to alarmActions', (t) => {
  const slicWatchConfig = { topicArn: topic1, enabled: true }

  const resolvedConfig = resolveSlicWatchConfig(slicWatchConfig)
  t.same(resolvedConfig.alarmActionsConfig, {
    alarmActions: [topic1],
    okActions: [],
    actionsEnabled: true
  })

  t.end()
})

test('Configuration ignores topicArn if alarmActions are set', (t) => {
  const slicWatchConfig: SlicWatchConfig = {
    topicArn: topic2,
    alarmActionsConfig: { alarmActions: [topic1] },
    enabled: true
  }

  const resolvedConfig = resolveSlicWatchConfig(slicWatchConfig)
  t.same(resolvedConfig.alarmActionsConfig, {
    alarmActions: [topic1],
    okActions: [],
    actionsEnabled: true
  })

  t.end()
})

test('Configuration includes okActions', (t) => {
  const slicWatchConfig: SlicWatchConfig = {
    alarmActionsConfig: { alarmActions: [topic1], okActions: [topic2], actionsEnabled: false },
    enabled: true
  }

  const resolvedConfig = resolveSlicWatchConfig(slicWatchConfig)
  t.same(resolvedConfig.alarmActionsConfig, {
    alarmActions: [topic1],
    okActions: [topic2],
    actionsEnabled: false
  })

  t.end()
})

test('Configuration resolution does not mutate shared defaults', (t) => {
  const overriddenConfig: SlicWatchConfig = {
    alarms: {
      Lambda: {
        Invocations: {
          enabled: true,
          Threshold: 7
        }
      }
    }
  }

  const overridden = resolveSlicWatchConfig(overriddenConfig)
  t.equal(overridden.alarms.Lambda.Invocations.Threshold, 7)
  t.equal(overridden.alarms.Lambda.Invocations.enabled, true)

  const resolvedDefaults = resolveSlicWatchConfig({})
  t.equal(resolvedDefaults.alarms.Lambda.Invocations.Threshold, undefined)
  t.equal(resolvedDefaults.alarms.Lambda.Invocations.enabled, false)

  t.end()
})
