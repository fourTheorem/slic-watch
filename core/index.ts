import addAlarms from './alarms/alarms'
import addDashboard from './dashboards/dashboard'
import { pluginConfigSchema, functionConfigSchema, slicWatchSchema } from './inputs/config-schema'
import { defaultConfig } from './inputs/default-config'
import { getResourcesByType } from './cf-template'
export type { ResourceType } from './cf-template'

export {
  addAlarms,
  addDashboard,
  pluginConfigSchema,
  functionConfigSchema,
  slicWatchSchema,
  defaultConfig,
  getResourcesByType
}
