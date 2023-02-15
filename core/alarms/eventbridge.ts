'use strict'

import { CfResource, CloudFormationTemplate, Statistic } from '../cf-template'
import { Alarm, AlarmConfig, Context, createAlarm } from './default-config-alarms'

export type EventsAlarmsConfig = {
  enabled?: boolean
  FailedInvocations: AlarmConfig,
  ThrottledRules: AlarmConfig
}

export type EventbridgeAlarm = Alarm & {
  ruleName: object 
}

/**
 * The fully resolved alarm configuration
 */
export default function eventsAlarms (eventsAlarmsConfig: EventsAlarmsConfig, context: Context) {
  return {
    createRuleAlarms
  }

  /**
   * Add all required Events alarms to the provided CloudFormation template
   * based on the EventBridge Rule found within
   *
   * cfTemplate A CloudFormation template object
   */
  function createRuleAlarms (cfTemplate:CloudFormationTemplate) {
    const ruleResources = cfTemplate.getResourcesByType(
      'AWS::Events::Rule'
    )

    for (const [ruleResourceName, ruleResource] of Object.entries(ruleResources)) {
      if (eventsAlarmsConfig.FailedInvocations.enabled) {
        const failedInvocations = createFailedInvocationsAlarm(
          ruleResourceName,
          ruleResource,
          eventsAlarmsConfig.FailedInvocations
        )
        cfTemplate.addResource(failedInvocations.resourceName, failedInvocations.resource)
      }

      if (eventsAlarmsConfig.ThrottledRules.enabled) {
        const throttledRules = createThrottledRulesAlarm(
          ruleResourceName,
          ruleResource,
          eventsAlarmsConfig.ThrottledRules
        )
        cfTemplate.addResource(throttledRules.resourceName, throttledRules.resource)
      }
    }
  }

  function createFailedInvocationsAlarm (logicalId: string, ruleResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const eventbridgeAlarmConfig:EventbridgeAlarm = {
      alarmName: { 'Fn::Sub': `Events_FailedInvocationsAlarm_\${${logicalId}}` } ,
      alarmDescription: { 'Fn::Sub': `EventBridge Failed Invocations for \${${logicalId}} breaches ${threshold}` },
      ruleName: { Ref: logicalId }, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'FailedInvocations',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/Events',
      dimensions: [{ Name: 'RuleName', Value: { Ref: logicalId } }]
    }
    return {
      resourceName: `slicWatchEventsFailedInvocationsAlarm${logicalId}`,
      resource: createAlarm(eventbridgeAlarmConfig, context)
    }
  }

  function createThrottledRulesAlarm (logicalId: string, ruleResource: CfResource, config: AlarmConfig) {
    const threshold = config.Threshold
    const eventbridgeAlarmConfig:EventbridgeAlarm = {
      alarmName: { 'Fn::Sub': `Events_ThrottledRulesAlarm_\${${logicalId}}` },
      alarmDescription: { 'Fn::Sub': `EventBridge Throttled Rules for \${${logicalId}} breaches ${threshold}` },
      ruleName: { Ref: logicalId }, 
      comparisonOperator: config.ComparisonOperator,
      threshold: config.Threshold,
      metricName: 'ThrottledRules',
      statistic: config.Statistic,
      period:  config.Period,
      extendedStatistic:  config.ExtendedStatistic,
      evaluationPeriods:  config.EvaluationPeriods,
      treatMissingData:  config.TreatMissingData,
      namespace: 'AWS/Events',
      dimensions: [{ Name: 'RuleName', Value: { Ref: logicalId } }]
    }
    return {
      resourceName: `slicWatchEventsThrottledRulesAlarm${logicalId}`,
      resource: createAlarm(eventbridgeAlarmConfig, context)
    }
  }
}
