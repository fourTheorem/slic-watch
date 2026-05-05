import { type JSONSchema4 } from 'json-schema'

import { ConfigType } from './config-types'
import { getSupportedMetricNames } from './metric-registry'

/*
 * Source https://github.com/ajv-validator/ajv-formats/blob/4dd65447575b35d0187c6b125383366969e6267e/src/formats.ts#L113
 */
const iso8601Pattern = '^\\d\\d\\d\\d-[0-1]\\d-[0-3]\\d[t\\s](?:[0-2]\\d:[0-5]\\d:[0-5]\\d|23:59:60)(?:\\.\\d+)?(?:z|[+-]\\d\\d(?::?\\d\\d)?)?$'
const percentilePattern = '^p(\\d{1,2}(\\.\\d{0,2})?|100)$'

const statisticType: JSONSchema4 = {
  type: ['string', 'null'],
  enum: ['Average', 'Maximum', 'Minimum', 'SampleCount', 'Sum']
}

const supportedAlarms = getSupportedMetricNames('alarm')
const supportedWidgets = getSupportedMetricNames('widget')

type JSONSchema4Properties = Record<string, JSONSchema4>

const commonAlarmProperties: JSONSchema4Properties = {
  enabled: { type: 'boolean' },
  Period: {
    type: ['integer', 'null'],
    anyOf: [
      {
        type: ['integer', 'null'],
        enum: [10, 30]
      },
      {
        type: ['integer', 'null'],
        multipleOf: 60
      }
    ]
  },
  Threshold: {
    type: ['number', 'null']
  },
  EvaluationPeriod: { type: ['integer', 'null'] },
  TreatMissingData: {
    type: ['string', 'null'],
    enum: ['notBreaching', 'breaching', 'ignore', 'missing']
  },
  ComparisonOperator: {
    type: ['string', 'null'],
    enum: [
      'GreaterThanOrEqualToThreshold', 'GreaterThanThreshold', 'GreaterThanUpperThreshold', 'LessThanLowerOrGreaterThanUpperThreshold', 'LessThanLowerThreshold', 'LessThanOrEqualToThreshold', 'LessThanThreshold'
    ]
  },
  EvaluationPeriods: {
    type: ['integer', 'null'],
    minimum: 1
  },
  Statistic: statisticType,
  ExtendedStatistic: {
    type: ['string', 'null'],
    pattern: percentilePattern
  }
}

function createMetricConfigSchema (metricNames: string[], commonProperties: JSONSchema4Properties): JSONSchema4 {
  const properties: JSONSchema4Properties = {
    ...commonProperties
  }
  for (const metricName of metricNames) {
    properties[metricName] = {
      type: 'object',
      properties: {
        ...commonProperties
      },
      additionalProperties: false
    }
  }
  return {
    type: 'object',
    properties,
    additionalProperties: false
  }
}

const alarmSchemas = Object.fromEntries(
  Object.entries(supportedAlarms).map(([service, metricNames]) => [service, createMetricConfigSchema(metricNames, commonAlarmProperties)])
) as Record<ConfigType, JSONSchema4>

const alarmsSchema: JSONSchema4 = {
  type: 'object',
  properties: {
    ...commonAlarmProperties,
    ...alarmSchemas
  },
  additionalProperties: false
}

const commonWidgetProperties: JSONSchema4Properties = {
  enabled: { type: 'boolean' },
  width: { type: ['integer', 'null'], minimum: 1, maximum: 24 },
  height: { type: ['integer', 'null'], minimum: 1, maximum: 1000 },
  metricPeriod: { type: ['integer', 'null'], minimum: 60, multipleOf: 60 },
  yAxis: { type: ['string', 'null'], enum: ['left', 'right'] },
  Statistic: {
    type: 'array',
    items: {
      oneOf: [
        statisticType,
        {
          type: 'string',
          pattern: percentilePattern
        }
      ]
    }
  }
}

const widgetSchemas = Object.fromEntries(
  Object.entries(supportedWidgets).map(([service, metricNames]) => [service, createMetricConfigSchema(metricNames, commonWidgetProperties)])
) as Record<ConfigType, JSONSchema4>

const dashboardSchema: JSONSchema4 = {
  type: 'object',
  properties: {
    enabled: { type: 'boolean' },
    timeRange: {
      type: 'object',
      oneOf: [{
        properties: {
          start: {
            type: ['string', 'null'],
            pattern: '^-P(T\\d+[MH]|\\d+[DWM]$)'
          }
        }
      },
      {
        properties: {
          start: { type: ['string', 'null'], pattern: iso8601Pattern },
          end: { type: ['string', 'null'], pattern: iso8601Pattern }
        }
      }]
    },
    widgets: {
      type: 'object',
      properties: {
        ...commonWidgetProperties,
        ...widgetSchemas
      }
    }
  },
  additionalProperties: false
}

const resourceRef: JSONSchema4 = { anyOf: [{ type: 'string' }, { type: 'object' }] }

/**
 * JSON Schema for SLIC Watch
 */
const slicWatchSchema: JSONSchema4 = {
  type: 'object',
  properties: {
    alarms: alarmsSchema,
    dashboard: dashboardSchema,
    topicArn: resourceRef,
    alarmActionsConfig: {
      type: 'object',
      properties: {
        alarmActions: { type: 'array', items: resourceRef },
        okActions: { type: 'array', items: resourceRef },
        actionsEnabled: { type: 'boolean', default: true }
      }
    },
    enabled: { type: 'boolean' }
  },
  required: [],
  additionalProperties: false
}

/**
 * JSON Schema for SLIC Watch configuration
 */
const pluginConfigSchema: JSONSchema4 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'SLIC Watch configuration',
  type: 'object',
  properties: {
    slicWatch: slicWatchSchema
  },
  required: ['slicWatch'],
  additionalProperties: false
}

/**
 * JSON Schema for the SLIC Watch configuration at an individual function level
 */
const functionConfigSchema: JSONSchema4 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'SLIC Watch function configuration',
  type: 'object',
  properties: {
    slicWatch: {
      type: 'object',
      properties: {
        enabled: { type: 'boolean' },
        alarms: {
          ...createMetricConfigSchema(supportedAlarms[ConfigType.Lambda], commonAlarmProperties),
          properties: {
            ...createMetricConfigSchema(supportedAlarms[ConfigType.Lambda], commonAlarmProperties).properties,
            Lambda: alarmSchemas[ConfigType.Lambda]
          }
        },
        dashboard: {
          ...createMetricConfigSchema(supportedWidgets[ConfigType.Lambda], commonWidgetProperties),
          properties: {
            ...createMetricConfigSchema(supportedWidgets[ConfigType.Lambda], commonWidgetProperties).properties,
            Lambda: widgetSchemas[ConfigType.Lambda]
          }
        }
      }
    }
  }
}

export {
  slicWatchSchema,
  pluginConfigSchema,
  functionConfigSchema
}
