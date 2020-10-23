import boto3
import os

from moto import mock_cloudwatch


@mock_cloudwatch
def test_alarms(lambda_functions):
    os.environ['SNS_ALARMS_TOPIC'] = 'TestAlarmsTopic'
    from alarms import update_alarms
    update_alarms(
        errors_threshold=1,
        errors_period=60,
        throttles_threshold=1,
    )

    cw = boto3.client('cloudwatch')
    alarms_response = cw.describe_alarms()
    metric_alarms = alarms_response['MetricAlarms']
    assert len(metric_alarms) == 2 * len(lambda_functions)
