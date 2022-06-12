'use strict'

/**
 * @param {object} snsAlarmsConfig The fully resolved alarm configuration
 */
module.exports = function snsAlarms (snsAlarmsConfig, context) {
  return {
    createSNSAlarms
  }

  /**
   * Add all required SNS alarms to the provided CloudFormation template
   * based on the SNS resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function createSNSAlarms (cfTemplate) {
    const topicResources = cfTemplate.getResourcesByType(
      'AWS::SNS::Topic'
    )

    for (const [topicResourceName, topicResource] of Object.entries(
      topicResources
    )) {
      if (snsAlarmsConfig['NumberOfNotificationsFilteredOut-InvalidAttributes'].enabled) {
        const numberOfNotificationsFilteredOutInvalidAttributes = createNumberOfNotificationsFilteredOutInvalidAttributesAlarm(
          topicResourceName,
          topicResource,
          snsAlarmsConfig['NumberOfNotificationsFilteredOut-InvalidAttributes']
        )
        cfTemplate.addResource(numberOfNotificationsFilteredOutInvalidAttributes.resourceName, numberOfNotificationsFilteredOutInvalidAttributes.resource)
      }

      if (snsAlarmsConfig.NumberOfNotificationsFailed.enabled) {
        const numberOfNotificationsFailed = createNumberOfNotificationsFailedAlarm(
          topicResourceName,
          topicResource,
          snsAlarmsConfig.NumberOfNotificationsFailed
        )
        cfTemplate.addResource(numberOfNotificationsFailed.resourceName, numberOfNotificationsFailed.resource)
      }
    }
  }

  function createSNSAlarm (
    alarmName,
    alarmDescription,
    topicName,
    comparisonOperator,
    threshold,
    metricName,
    statistic,
    period,
    evaluationPeriods,
    treatMissingData
  ) {
    const metricProperties = {
      Dimensions: [{ Name: 'TopicName', Value: topicName }],
      MetricName: metricName,
      Namespace: 'AWS/SNS',
      Period: period,
      Statistic: statistic
    }

    return {
      Type: 'AWS::CloudWatch::Alarm',
      Properties: {
        ActionsEnabled: true,
        AlarmActions: context.alarmActions,
        AlarmName: alarmName,
        AlarmDescription: alarmDescription,
        EvaluationPeriods: evaluationPeriods,
        ComparisonOperator: comparisonOperator,
        Threshold: threshold,
        TreatMissingData: treatMissingData,
        ...metricProperties
      }
    }
  }

  function createNumberOfNotificationsFilteredOutInvalidAttributesAlarm (topicResourceName, topicResource, config) {
    const topicName = topicResource.Properties.TopicName
    const threshold = config.Threshold

    return {
      resourceName: `slicWatchNumberOfNotificationsFilteredOutInvalidAttributesAlarm${topicResourceName}`,
      resource: createSNSAlarm(
        `NumberOfNotificationsFilteredOutInvalidAttributes_${topicName}`, // alarmName
        `Number of Notifications Filtered out Invalid Attributes for ${topicName} breaches (${threshold}`, // alarmDescription
        topicName,
        config.ComparisonOperator,
        threshold,
        'NumberOfNotificationsFilteredOut-InvalidAttributes', // metricName
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }

  function createNumberOfNotificationsFailedAlarm (topicResourceName, topicResource, config) {
    const topicName = topicResource.Properties.TopicName
    const threshold = config.Threshold
    return {
      resourceName: `slicWatchSNSNumberOfNotificationsFailedAlarm${topicResourceName}`,
      resource: createSNSAlarm(
        `SNSNumberOfNotificationsFailed_${topicName}`, // alarmName
        `Number of Notifications Failed for ${topicName} breaches ${threshold}`, // alarmDescription
        topicName,
        config.ComparisonOperator,
        threshold,
        'NumberOfNotificationsFailed', // metricName
        config.Statistic,
        config.Period,
        config.EvaluationPeriods,
        config.TreatMissingData
      )
    }
  }
}
