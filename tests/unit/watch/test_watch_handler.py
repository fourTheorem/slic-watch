import os

import boto3
from moto import mock_cloudwatch


class DummyContext:

    def __init__(self):
        self.function_name = 'Dummy'
        self.memory_limit_in_mb = 128
        self.invoked_function_arn = 'arn:dummy'
        self.aws_request_id = 'abcd'


@mock_cloudwatch
def test_handle_event(lambda_functions):
    os.environ["SNS_ALARMS_TOPIC"] = "TestAlarmsTopic"
    event = {
        'Period': 99,
        'DurationPercentTimeoutThreshold': 47.3
    }

    from watch_handler import watch_existing
    watch_existing(event, DummyContext())

    cw_client = boto3.client('cloudwatch')
    f1_lambda_errors_alarm = cw_client.describe_alarms(AlarmNames=['LambdaErrors_TestFunction1'])['MetricAlarms'][0]
    assert f1_lambda_errors_alarm['Period'] == 99
    assert f1_lambda_errors_alarm['Threshold'] == 0.0

    f1_lambda_throttles_alarm = cw_client.describe_alarms(
        AlarmNames=['LambdaThrottles_TestFunction1']
    )['MetricAlarms'][0]
    for metric in f1_lambda_throttles_alarm['Metrics']:
        if 'Period' in metric:
            assert metric['Period'] == 99
    assert f1_lambda_throttles_alarm['Threshold'] == 47.3

    f1_lambda_duration_alarm = cw_client.describe_alarms(
        AlarmNames=['LambdaDuration_TestFunction1']
    )['MetricAlarms'][0]
    assert f1_lambda_duration_alarm['Period'] == 99
