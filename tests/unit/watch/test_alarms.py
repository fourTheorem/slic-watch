import boto3
import os

from moto import mock_cloudwatch

from alarm_config import LambdaAlarmsConfig


@mock_cloudwatch
def test_alarms(lambda_functions):
    os.environ['SNS_ALARMS_TOPIC'] = 'TestAlarmsTopic'
    from alarms import update_alarms
    config = LambdaAlarmsConfig(
        period=60,
        errors_threshold=0.0,
        throttles_percent_threshold=0.0,
        duration_percent_timeout_threshold=90.0
    )
    update_alarms(config)

    cw = boto3.client('cloudwatch')
    alarms_response = cw.describe_alarms()
    metric_alarms = alarms_response['MetricAlarms']
    assert len(metric_alarms) == 2 * len(lambda_functions)
