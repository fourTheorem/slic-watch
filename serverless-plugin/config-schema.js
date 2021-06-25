'use strict'

/*
 * Source https://www.myintervals.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
 */
const iso8601Pattern = '^([\\+-]?\\d{4}(?!\\d{2}\\b))((-?)((0[1-9]|1[0-2])(\\3([12]\\d|0[1-9]|3[01]))?|W([0-4]\\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\\d|[12]\\d{2}|3([0-5]\\d|6[1-6])))([T\\s]((([01]\\d|2[0-3])((:?)[0-5]\\d)?|24\\:?00)([\\.,]\\d+(?!:))?)?(\\17[0-5]\\d([\\.,]\\d+)?)?([zZ]|([\\+-])([01]\\d|2[0-3]):?([0-5]\\d)?)?)?)?$'
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
  SQS: ['AgeOfOldestMessage', 'InFlightMessagesPc']
}

const supportedWidgets = {
  Lambda: ['Errors', 'Throttles', 'Duration', 'Invocations', 'ConcurrentExecutions', 'IteratorAge'],
  ApiGateway: ['5XXError', '4XXError', 'Latency', 'Count'],
  States: ['ExecutionThrottled', 'ExecutionsFailed', 'ExecutionsTimedOut'],
  DynamoDB: ['ReadThrottleEvents', 'WriteThrottleEvents'],
  Kinesis: ['GetRecords.IteratorAgeMilliseconds', 'ReadProvisionedThroughputExceeded', 'WriteProvisionedThroughputExceeded', 'PutRecord.Success', 'PutRecords.Success', 'GetRecords.Success']
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
    properties: {
      ...commonAlarmProperties
    },
    additionalProperties: false
  }
  for (const metricAlarm of supportedAlarms[service]) {
    alarmSchemas[service].properties[metricAlarm] = {
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
    properties: {
      ...commonWidgetProperties
    },
    additionalProperties: false
  }
  for (const metricWidget of supportedWidgets[service]) {
    widgetSchemas[service].properties[metricWidget] = {
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
    topicArn: { type: 'string' }
  },
  required: []
}

/**
 * JSON Schema for the SLIC Watch Serverless Framework plugin
 */
const pluginConfigSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'SLIC Watch Serverless Plugin configuration',
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
  title: 'SLIC Watch Serverless Plugin configuration',
  type: 'object',
  properties: {
    slicWatch: {
      enabled: { type: 'boolean' },
      alarms: {
        enabled: { type: 'boolean' },
        Lambda: alarmSchemas.Lambda
      },
      dashboard: {
        enabled: { type: 'boolean' },
        Lambda: widgetSchemas.Lambda
      }
    }
  },
}

module.exports = {
  slicWatchSchema,
  pluginConfigSchema
}
