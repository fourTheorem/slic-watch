import _ from 'lodash'
import type Template from 'cloudform-types/types/template'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import { cascade } from '../inputs/cascading-config'
import _defaultCfTemplate from '../cf-resources/cloudformation-template-stack.json'
import _albCfTemplate from '../cf-resources/alb-cloudformation-template-stack.json'
import _appSyncCfTemplate from '../cf-resources/appsync-cloudformation-template-stack.json'
import { type AlarmActionsConfig } from '../alarms/alarm-types'
const defaultCfTemplate = _defaultCfTemplate as Template
const albCfTemplate = _albCfTemplate as Template
const appSyncCfTemplate = _appSyncCfTemplate as unknown as Template

const testAlarmActionsConfig: AlarmActionsConfig = { alarmActions: ['dummy-arn'], okActions: ['dummy-arn-2'], actionsEnabled: true }

function assertCommonAlarmProperties (t, al: AlarmProperties) {
  t.ok(al.AlarmDescription)
  t.ok(al.ActionsEnabled)
  t.ok(al.AlarmActions)
  t.equal((al.AlarmActions as string[]).length, 1)
  t.ok(al.OKActions)
  t.equal((al.OKActions as string[]).length, 1)
  t.ok(al.ComparisonOperator)
}

/**
 * Derive an alarm 'type' by stripping the last component from the underscore-delimited name
 * @param {*} alarmName The alarm name as a string or {'Fn::Sub': ...} object
 * @returns The inferred type
 */
function alarmNameToType (alarmName) {
  const resolvedName = typeof alarmName === 'string' ? alarmName : alarmName.payload[0]
  const components = resolvedName.split('_')
  components.pop()
  return components.join('_')
}

function createTestConfig (from, cascadingChanges = {}): any {
  return cascade(
    _.merge(
      {},
      from,
      cascadingChanges
    )
  )
}

function createTestCloudFormationTemplate (stackDefinition = defaultCfTemplate): Template {
  return _.cloneDeep(stackDefinition)
}

export {
  albCfTemplate,
  appSyncCfTemplate,
  defaultCfTemplate,
  testAlarmActionsConfig,
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate
}
