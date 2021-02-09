import itertools
import os

import boto3
from moto import mock_cloudwatch

from alarm_config import LambdaAlarmsConfig


def _assert_common_alarm_properties(al):
    assert len(al['AlarmDescription']) > 0
    assert al['ActionsEnabled']
    assert len(al['AlarmActions']) == 1
    assert al['AlarmActions'][0] == 'TestAlarmsTopic'
    assert al['ComparisonOperator'] == 'GreaterThanThreshold'


@mock_cloudwatch
def test_update_alarms(lambda_functions):
    os.environ["SNS_ALARMS_TOPIC"] = "TestAlarmsTopic"
    from alarms import update_alarms

    config = LambdaAlarmsConfig(
        period=60,
        errors_threshold=0.0,
        throttles_percent_threshold=0.0,
        duration_percent_timeout_threshold=90.0,
    )
    update_alarms(config, lambda_functions)

    cw = boto3.client("cloudwatch")
    alarms_response = cw.describe_alarms()
    metric_alarms = alarms_response["MetricAlarms"]
    assert len(metric_alarms) == 3 * len(lambda_functions)

    for al in metric_alarms:
        _assert_common_alarm_properties(al)

    alarms_by_type = {k: list(v) for k, v in itertools.groupby(metric_alarms, lambda a: a['AlarmName'].split('_')[0])}
    assert set(alarms_by_type) == {'LambdaErrors', 'LambdaThrottles', 'LambdaDuration'}

    for al in alarms_by_type['LambdaErrors']:
        assert al['MetricName'] == 'Errors'
        assert al['Statistic'] == 'Sum'
        assert al['Threshold'] == 0.0
        assert al['EvaluationPeriods'] == 1
        assert al['Namespace'] == 'AWS/Lambda'
        assert al['Period'] == 60
        assert len(al['Dimensions']) == 1
        assert al['Dimensions'][0]['Name'] == 'FunctionName'
        assert al['Dimensions'][0]['Value'].startswith('TestFunction')

    for al in alarms_by_type['LambdaDuration']:
        assert al['MetricName'] == 'Duration'
        assert al['Statistic'] == 'Maximum'
        function_name = [dim for dim in al['Dimensions'] if dim['Name'] == 'FunctionName'][0]['Value']
        assert al['Threshold'] == 90.0 * lambda_functions[function_name].timeout / 100
        assert al['EvaluationPeriods'] == 1
        assert al['Namespace'] == 'AWS/Lambda'
        assert al['Period'] == 60

    for al in alarms_by_type['LambdaThrottles']:
        metrics = al['Metrics']
        assert len(metrics) == 3
        metrics_by_id = {metric['Id']: metric for metric in metrics}
        assert 'Expression' in metrics_by_id['throttles_pc']
        assert metrics_by_id['throttles']['MetricStat']['Metric']['Namespace'] == 'AWS/Lambda'
        assert metrics_by_id['throttles']['MetricStat']['Metric']['MetricName'] == 'Throttles'
        assert metrics_by_id['throttles']['MetricStat']['Period'] == 60
        assert metrics_by_id['throttles']['MetricStat']['Stat'] == 'Sum'
        assert metrics_by_id['invocations']['MetricStat']['Metric']['Namespace'] == 'AWS/Lambda'
        assert metrics_by_id['invocations']['MetricStat']['Metric']['MetricName'] == 'Invocations'
        assert metrics_by_id['invocations']['MetricStat']['Period'] == 60
        assert metrics_by_id['invocations']['MetricStat']['Stat'] == 'Sum'


@mock_cloudwatch
def test_delete_alarm(lambda_functions):
    os.environ["SNS_ALARMS_TOPIC"] = "TestAlarmsTopic"
    from alarms import delete_alarms, update_alarms

    config = LambdaAlarmsConfig(
        period=60,
        errors_threshold=0.0,
        throttles_percent_threshold=0.0,
        duration_percent_timeout_threshold=90.0,
    )
    update_alarms(config, lambda_functions)

    fn_name = list(lambda_functions.keys())[-1]  # Pick a function for which alarms are to be deleted
    delete_alarms(fn_name)

    cw = boto3.client("cloudwatch")
    alarms_response = cw.describe_alarms()
    metric_alarms = alarms_response["MetricAlarms"]
    assert len(metric_alarms) == 3 * (len(lambda_functions) - 1)

    assert not any([fn_name in al['AlarmName'] for al in metric_alarms])
