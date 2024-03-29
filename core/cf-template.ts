
import { merge } from 'lodash'
import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

import { filterObject } from './filter-object'
import { getLogger } from './logging'
import { cascade } from './inputs/cascading-config'
import { type SlicWatchMergedConfig } from './alarms/alarm-types'
import { type WidgetMetricProperties } from './dashboards/dashboard-types'
import { defaultConfig } from './inputs/default-config'
import { ConfigType, cfTypeByConfigType } from './inputs/config-types'

const logger = getLogger()

export type ResourceType<T = Resource> = Record<string, T>

/**
 * Take a CloudFormation reference to a Lambda Function name and attempt to resolve this function's
 * CloudFormation logical ID from within this stack
 *
 *The function logical ID or CloudFormation intrinsic resolving a function
  */
export function resolveFunctionResourceName (func): string | undefined {
  if (typeof func === 'string') {
    return func
  }
  if (func['Fn::GetAtt'] != null) {
    return func['Fn::GetAtt'][0]
  }
  if (func.Ref != null) {
    return func.Ref
  }
  logger.warn(`Unable to resolve function resource name from ${JSON.stringify(func)}`)
}

export function addResource (resourceName: string, resource: Resource, compiledTemplate: Template) {
  if (compiledTemplate.Resources != null) {
    compiledTemplate.Resources[resourceName] = resource
  }
}

export function getResourcesByType (type: string, compiledTemplate: Template): ResourceType {
  return filterObject(compiledTemplate.Resources ?? {}, (resource: { Type: string }) => resource.Type === type)
}

export interface ResourceAlarmConfigurations<T extends SlicWatchMergedConfig> {
  resources: ResourceType
  alarmConfigurations: Record<string, T>
}

export interface ResourceDashboardConfigurations<T extends WidgetMetricProperties> {
  resources: ResourceType
  dashConfigurations: Record<string, T>
}

/**
 * Find all resources of a given type and merge any resource-specific SLIC Watch configuration with
 * the global alarm configuration for resources of that type
 *
 * @param type The resource type
 * @param template The CloudFormation template
 * @param config The global alarm configuration for resources of this type
 * @returns The resources along with the merged configuration for each resource by logical ID
 */
export function getResourceAlarmConfigurationsByType<M extends SlicWatchMergedConfig> (
  type: ConfigType, template: Template, config: M
): ResourceAlarmConfigurations<M> {
  const alarmConfigurations: Record<string, M> = {}
  const resources = getResourcesByType(cfTypeByConfigType[type], template)
  for (const [funcLogicalId, resource] of Object.entries(resources)) {
    let legacyFallbackResourceConfig
    if (type === ConfigType.Lambda) {
      // Older versions only allowed function resource overrides and required the `Lambda` property within the config object
      // If this is still present in configuration, we take it from here
      legacyFallbackResourceConfig = resource?.Metadata?.slicWatch?.alarms?.Lambda
    }
    const resourceConfig = legacyFallbackResourceConfig ?? resource?.Metadata?.slicWatch?.alarms // Resource-specific overrides
    const defaultResourceConfig = defaultConfig.alarms?.[type] // Default configuration for the type's alarms
    // Cascade the default resource's configuration into the resource-specific overrides
    const cascadedResourceConfig = resourceConfig !== undefined ? cascade(merge({}, defaultResourceConfig, resourceConfig)) : {}
    // Lastly, cascade the full SLIC Watch config for any properties not yet set in the widget's config
    alarmConfigurations[funcLogicalId] = cascade(merge({}, config, cascadedResourceConfig)) as M
  }
  return {
    resources,
    alarmConfigurations
  }
}

/**
 * Find all resources of a given type and merge any resource-specific SLIC Watch configuration with
 * the global dashboard configuration for resources of that type
 *
 * @param type The resource type
 * @param template The CloudFormation template
 * @param config The global dashboard configuration for resources of this type
 * @returns The resources along with the merged configuration for each resource by logical ID
 */
export function getResourceDashboardConfigurationsByType<T extends WidgetMetricProperties> (
  type: ConfigType, template: Template, config: T
): ResourceDashboardConfigurations<T> {
  const dashConfigurations: Record<string, T> = {}
  const resources = getResourcesByType(cfTypeByConfigType[type], template)
  for (const [logicalId, resource] of Object.entries(resources)) {
    let legacyFallbackResourceConfig
    if (type === ConfigType.Lambda) {
      // Older versions only allowed function resource overrides and required the `Lambda` property within the config object
      // If this is still present in configuration, we take it from here
      legacyFallbackResourceConfig = resource?.Metadata?.slicWatch?.dashboard?.Lambda
    }
    const resourceConfig = legacyFallbackResourceConfig ?? resource?.Metadata?.slicWatch?.dashboard // Resource-specific overrides
    const defaultResourceConfig = defaultConfig.dashboard?.widgets?.[type] // Default configuration for the widget
    // Cascade the default resource's configuration into the resource-specific overrides
    const cascadedResourceConfig = resourceConfig !== undefined ? cascade(merge({}, defaultResourceConfig, resourceConfig)) : {}
    // Lastly, cascade the full SLIC Watch config for any properties not yet set in the widget's config
    dashConfigurations[logicalId] = cascade(merge({}, config, cascadedResourceConfig)) as T
  }
  return {
    resources,
    dashConfigurations
  }
}

export function getEventSourceMappingFunctions (compiledTemplate): ResourceType {
  const eventSourceMappings = getResourcesByType(
    'AWS::Lambda::EventSourceMapping', compiledTemplate)
  const lambdaResources = getResourcesByType('AWS::Lambda::Function', compiledTemplate)
  const eventSourceMappingFunctions = {}
  for (const eventSourceMapping of Object.values(eventSourceMappings)) {
    const funcResourceName = resolveFunctionResourceName(
      eventSourceMapping.Properties?.FunctionName
    )
    if (funcResourceName != null) {
      const funcResource = lambdaResources[funcResourceName]
      if (funcResource != null) {
        eventSourceMappingFunctions[funcResourceName] = funcResource
      }
    }
  }
  return eventSourceMappingFunctions
}
