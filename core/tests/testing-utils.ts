import _ from 'lodash'
import type Template from 'cloudform-types/types/template'
import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type { DashboardProperties } from 'cloudform-types/types/cloudWatch/dashboard'
import type { MetricWidgetProperties, Dashboard } from 'cloudwatch-dashboard-types'

import { cascade } from '../inputs/cascading-config'
import _defaultCfTemplate from '../cf-resources/cloudformation-template-stack.json'
import _albCfTemplate from '../cf-resources/alb-cloudformation-template-stack.json'
import _appSyncCfTemplate from '../cf-resources/appsync-cloudformation-template-stack.json'
import { type AlarmActionsConfig } from '../alarms/alarm-types'
import { getResourcesByType } from '../cf-template'

const defaultCfTemplate = _defaultCfTemplate as Template
const albCfTemplate = _albCfTemplate as Template
const appSyncCfTemplate = _appSyncCfTemplate as unknown as Template

const testAlarmActionsConfig: AlarmActionsConfig = { alarmActions: ['dummy-arn'], okActions: ['dummy-arn-2'], actionsEnabled: true }

export function assertCommonAlarmProperties (t, al: AlarmProperties) {
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
export function alarmNameToType (alarmName) {
  const resolvedName = typeof alarmName === 'string' ? alarmName : alarmName.payload[0]
  const components = resolvedName.split('_')
  components.pop()
  return components.join('_')
}

export function createTestConfig (from, cascadingChanges = {}): any {
  return cascade(
    _.merge(
      {},
      from,
      cascadingChanges
    )
  )
}

export function createTestCloudFormationTemplate (stackDefinition = defaultCfTemplate): Template {
  return _.cloneDeep(stackDefinition)
}

export interface TemplateDashboardFinding {
  dashboard: Dashboard
  dashProperties: DashboardProperties
}

export function getDashboardFromTemplate (template: Template): TemplateDashboardFinding {
  const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', template)
  const [, dashResource] = Object.entries(dashResources)[0]
  const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])
  return {
    dashboard,
    dashProperties: dashResource.Properties as DashboardProperties
  }
}

export function getDashboardWidgetsByTitle (dashboard: Dashboard, ...patterns: RegExp[]) {
  return patterns.map((pattern) => {
    const widgets = dashboard.widgets.filter((widget) => {
      const props = widget.properties as MetricWidgetProperties
      if (typeof props?.title === 'string') {
        return pattern.test(props.title)
      }
      return false
    })
    if (widgets.length > 1) {
      throw new Error(`Multiple widgets found matching ${pattern}`)
    }
    return widgets[0]
  })
}

export {
  albCfTemplate,
  appSyncCfTemplate,
  defaultCfTemplate,
  testAlarmActionsConfig
}
