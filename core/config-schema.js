'use strict'

/*
 * Source https://github.com/ajv-validator/ajv-formats/blob/4dd65447575b35d0187c6b125383366969e6267e/src/formats.ts#L113
 */
const iso8601Pattern = '^\\d\\d\\d\\d-[0-1]\\d-[0-3]\\d[t\\s](?:[0-2]\\d:[0-5]\\d:[0-5]\\d|23:59:60)(?:\\.\\d+)?(?:z|[+-]\\d\\d(?::?\\d\\d)?)?$'
const percentilePattern = '^p(\\d{1,2}(\\.\\d{0,2})?|100)$'

const statisticType = {
  type: ['string', 'null'],
  enum: ['Average', 'Maximum', 'Minimum', 'SampleCount', 'Sum']
}

const supportedAlarms = {
  Lambda: ['Errors', 'ThrottlesPc', 'DurationPc', 'Invocations', 'IteratorAge'],
  ApiGateway: ['5XXError', '4XXError', 'Latency'],
  States: ['ExecutionThrottled', 'ExecutionsFailed', 'ExecutionsTimedOut'],
  DynamoDB: ['ReadThrottleEvents', 'WriteThrottleEvents', 'UserErrors', 'SystemErrors'],
  Kinesis: ['GetRecords.IteratorAgeMilliseconds', 'ReadProvisionedThroughputExceeded', 'WriteProvisionedThroughputExceeded', 'PutRecord.Success', 'PutRecords.Success', 'GetRecords.Success'],
  SQS: ['AgeOfOldestMessage', 'InFlightMessagesPc'],
  ECS: ['MemoryUtilization', 'CPUUtilization'],
  SNS: ['NumberOfNotificationsFilteredOut-InvalidAttributes', 'NumberOfNotificationsFailed'],
  Events: ['FailedInvocations', 'ThrottledRules']
}

const supportedWidgets = {
  Lambda: ['Errors', 'Throttles', 'Duration', 'Invocations', 'ConcurrentExecutions', 'IteratorAge'],
  ApiGateway: ['5XXError', '4XXError', 'Latency', 'Count'],
  States: ['ExecutionThrottled', 'ExecutionsFailed', 'ExecutionsTimedOut'],
  DynamoDB: ['ReadThrottleEvents', 'WriteThrottleEvents'],
  Kinesis: ['GetRecords.IteratorAgeMilliseconds', 'ReadProvisionedThroughputExceeded', 'WriteProvisionedThroughputExceeded', 'PutRecord.Success', 'PutRecords.Success', 'GetRecords.Success'],
  SQS: ['NumberOfMessagesSent', 'NumberOfMessagesReceived', 'NumberOfMessagesDeleted', 'ApproximateAgeOfOldestMessage', 'ApproximateNumberOfMessagesVisible'],
  ECS: ['MemoryUtilization', 'CPUUtilization'],
  SNS: ['NumberOfNotificationsFilteredOut-InvalidAttributes', 'NumberOfNotificationsFailed'],
  Events: ['FailedInvocations', 'ThrottledRules', 'Invocations']
}

const commonAlarmProperties = {
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

const alarmSchemas = {}
for (const service of Object.keys(supportedAlarms)) {
  alarmSchemas[service] = {
    type: 'object',
    properties: {
      ...commonAlarmProperties
    },
    additionalProperties: false
  }
  for (const metricAlarm of supportedAlarms[service]) {
    alarmSchemas[service].properties[metricAlarm] = {
      type: 'object',
      properties: {
        ...commonAlarmProperties
      },
      additionalProperties: false
    }
  }
}

const alarmsSchema = {
  type: 'object',
  properties: {
    ...commonAlarmProperties,
    ...alarmSchemas
  },
  additionalProperties: false
}

const commonWidgetProperties = {
  enabled: { type: 'boolean' },
  width: { type: ['integer', 'null'], minimum: 1, maximum: 24 },
  height: { type: ['integer', 'null'], minimum: 1, maximum: 1000 },
  metricPeriod: { type: ['integer', 'null'], minimum: 60, multipleOf: 60 },
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

const widgetSchemas = {}
for (const service of Object.keys(supportedWidgets)) {
  widgetSchemas[service] = {
    type: 'object',
    properties: {
      ...commonWidgetProperties
    },
    additionalProperties: false
  }
  for (const metricWidget of supportedWidgets[service]) {
    widgetSchemas[service].properties[metricWidget] = {
      type: 'object',
      properties: {
        ...commonWidgetProperties
      },
      additionalProperties: false
    }
  }
}

const dashboardSchema = {
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

/**
 * JSON Schema for SLIC Watch
 */
const slicWatchSchema = {
  type: 'object',
  properties: {
    alarms: alarmsSchema,
    dashboard: dashboardSchema,
    topicArn: { anyOf: [{ type: 'string' }, { type: 'object' }] },
    enabled: { type: 'boolean' }
  },
  required: [],
  additionalProperties: false
}

/**
 * JSON Schema for SLIC Watch configuration
 */
const pluginConfigSchema = {
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
const functionConfigSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'SLIC Watch function configuration',
  type: 'object',
  properties: {
    slicWatch: {
      type: 'object',
      properties: {
        enabled: { type: 'boolean' },
        alarms: {
          type: 'object',
          properties: {
            enabled: { type: 'boolean' },
            Lambda: alarmSchemas.Lambda
          }
        },
        dashboard: {
          type: 'object',
          properties: {
            enabled: { type: 'boolean' },
            Lambda: widgetSchemas.Lambda
          }
        }
      }
    }
  }
}

module.exports = {
  slicWatchSchema,
  pluginConfigSchema,
  functionConfigSchema
}
