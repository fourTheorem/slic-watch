'use strict'

import { CloudFormationTemplate } from '../cf-template'
import Resource from "cloudform-types/types/resource"
import { Context, createAlarm } from './default-config-alarms'
import { AlarmProperties} from "cloudform-types/types/cloudWatch/alarm"

export type EventsAlarmsConfig = AlarmProperties &{
  FailedInvocations: AlarmProperties,
  ThrottledRules: AlarmProperties
}

export type EventbridgeAlarm = AlarmProperties & {
  RuleName: string 
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
      if (eventsAlarmsConfig.FailedInvocations.ActionsEnabled) {
        const failedInvocations = createFailedInvocationsAlarm(
          ruleResourceName,
          ruleResource,
          eventsAlarmsConfig.FailedInvocations
        )
        cfTemplate.addResource(failedInvocations.resourceName, failedInvocations.resource)
      }

      if (eventsAlarmsConfig.ThrottledRules.ActionsEnabled) {
        const throttledRules = createThrottledRulesAlarm(
          ruleResourceName,
          ruleResource,
          eventsAlarmsConfig.ThrottledRules
        )
        cfTemplate.addResource(throttledRules.resourceName, throttledRules.resource)
      }
    }
  }

  function createFailedInvocationsAlarm (logicalId: string, ruleResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold
    const eventbridgeAlarmProperties:EventbridgeAlarm = {
      AlarmName: `Events_FailedInvocationsAlarm_${logicalId}` ,
      AlarmDescription: `EventBridge Failed Invocations for \${${logicalId}} breaches ${threshold}`,
      RuleName: `${logicalId}`, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'FailedInvocations',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/Events',
      Dimensions: [{ Name: 'RuleName', Value: {Ref: logicalId} as any}]
    }
    return {
      resourceName: `slicWatchEventsFailedInvocationsAlarm${logicalId}`,
      resource: createAlarm(eventbridgeAlarmProperties, context)
    }
  }

  function createThrottledRulesAlarm (logicalId: string, ruleResource: Resource, config: AlarmProperties) {
    const threshold = config.Threshold
    const eventbridgeAlarmProperties:EventbridgeAlarm = {
      AlarmName: `Events_ThrottledRulesAlarm_${logicalId}`,
      AlarmDescription: `EventBridge Throttled Rules for ${logicalId} breaches ${threshold}`,
      RuleName: `${logicalId}`, 
      ComparisonOperator: config.ComparisonOperator,
      Threshold: config.Threshold,
      MetricName: 'ThrottledRules',
      Statistic: config.Statistic,
      Period:  config.Period,
      ExtendedStatistic:  config.ExtendedStatistic,
      EvaluationPeriods:  config.EvaluationPeriods,
      TreatMissingData:  config.TreatMissingData,
      Namespace: 'AWS/Events',
      Dimensions: [{ Name: 'RuleName', Value: {Ref: logicalId} as any}]
    }
    return {
      resourceName: `slicWatchEventsThrottledRulesAlarm${logicalId}`,
      resource: createAlarm(eventbridgeAlarmProperties, context)
    }
  }
}
