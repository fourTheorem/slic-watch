import boto3
import os

from aws_lambda_powertools import Logger
from concurrent import futures

from alarm_config import LambdaAlarmsConfig
from lambdas import get_applicable_lambdas

SNS_ALARMS_TOPIC = os.getenv('SNS_ALARMS_TOPIC')
MAX_PUT_ALARM_CONCURRENCY = 3
LOG = Logger()

cloudwatch_client = boto3.client('cloudwatch')


def _create_lambda_errors_alarm(func_name: str, config: LambdaAlarmsConfig):
    """ Create an alarm for Lambda errors """
    alarm_name = f'LambdaError_{func_name}'
    LOG.info(f'Creating alarm {alarm_name}')
    return cloudwatch_client.put_metric_alarm(
        AlarmName=alarm_name,
        Period=config.period,
        EvaluationPeriods=1,
        MetricName='Errors',
        Namespace='AWS/Lambda',
        Statistic='Sum',
        ComparisonOperator='GreaterThanToThreshold',
        Threshold=config.errors_threshold,
        ActionsEnabled=True,
        AlarmDescription=f'Alarm for lambda {func_name} errors',
        Dimensions=[{'Name': 'FunctionName', 'Value': func_name}],
        AlarmActions=[SNS_ALARMS_TOPIC]
    )


def _create_lambda_throttles_alarm(func_name: str, config: LambdaAlarmsConfig):
    """ Create an alarm on the number of throttles as a percentage
        of invocations for a given period

        :func_name The Lambda function name
        :threshold The minimum percentage of throttles to invocations to raise the alarm
        :period The period for evaluation in seconds """
    alarm_name = f'LambdaThrottles_{func_name}'
    LOG.info(f'Creating alarm {alarm_name}')
    return cloudwatch_client.put_metric_alarm(
        AlarmName=alarm_name,
        EvaluationPeriods=1,
        DatapointsToAlarm=1,
        Metrics=[
            {
                'Id': 'throttles_pc',
                'Expression': '(throttles / invocations) * 100',
                'Label': '% Throttles',
                'ReturnData': True
            },
            {
                'Id': 'throttles',
                'MetricStat': {
                    'Metric': {
                        'Namespace': 'AWS/Lambda',
                        'MetricName': 'Throttles',
                        'Dimensions': [{'Name': 'FunctionName', 'Value': func_name}]
                    },
                    'Period': config.period,
                    'Stat': 'Sum'
                },
                'ReturnData': False
            },
            {
                'Id': 'invocations',
                'MetricStat': {
                    'Metric': {
                        'Namespace': 'AWS/Lambda',
                        'MetricName': 'Invocations',
                        'Dimensions': [{'Name': 'FunctionName', 'Value': func_name}]
                    },
                    'Period': config.period,
                    'Stat': 'Sum'
                },
                'ReturnData': False
            }
        ],
        ComparisonOperator='GreaterThanToThreshold',
        Threshold=config.duration_percent_timeout_threshold,
        ActionsEnabled=True,
        AlarmDescription=f'Alarm for Lambda {func_name} throttles/invocations',
        AlarmActions=[SNS_ALARMS_TOPIC]
    )


def _create_lambda_duration_alarms(func_name: str, config: LambdaAlarmsConfig):
    """ Create an alarm for Lambda duration when it reaches a percentage threshold of the function timeout """
    alarm_name = f'LambdaError_{func_name}'
    LOG.info(f'Creating alarm {alarm_name}')
    return cloudwatch_client.put_metric_alarm(
        AlarmName=alarm_name,
        Period=config.period,
        EvaluationPeriods=1,
        MetricName='Errors',
        Namespace='AWS/Lambda',
        Statistic='Sum',
        ComparisonOperator='GreaterThanToThreshold',
        Threshold=config.duration_percent_timeout_threshold,
        ActionsEnabled=True,
        AlarmDescription=f'Alarm for lambda {func_name} errors',
        Dimensions=[{'Name': 'FunctionName', 'Value': func_name}],
        AlarmActions=[SNS_ALARMS_TOPIC]
    )


def _get_existing_alarm(func_name):
    alarm_name = f'LambdaError_{func_name}'
    alarms = cloudwatch_client.describe_alarms(AlarmNames=[alarm_name])

    existing_alarm = next(
        (_ for _ in alarms['MetricAlarms'] if _['AlarmName'] == alarm_name),
        None
    )

    return existing_alarm


def _create_lambda_alarms(func_name: str, config: LambdaAlarmsConfig):
    _create_lambda_errors_alarm(func_name, config)
    _create_lambda_throttles_alarm(func_name, config)
    _create_lambda_duration_alarms(func_name, config)


def update_alarms(config):
    lambda_functions = get_applicable_lambdas()
    LOG.info(f'Creating alarms for {lambda_functions}')

    with futures.ThreadPoolExecutor(max_workers=MAX_PUT_ALARM_CONCURRENCY) as executor:
        wait_for = [
            executor.submit(_create_lambda_alarms,
                            func_name,
                            config)
            for func_name in lambda_functions.keys()
        ]

        for future in futures.as_completed(wait_for):
            LOG.info(future.result())


def delete_alarms(func_name):
    existing_alarm = _get_existing_alarm(func_name)

    if existing_alarm:
        response = cloudwatch_client.delete_alarms(
            AlarmNames=[existing_alarm['AlarmName']]
        )

        LOG.info(response)
    else:
        LOG.info(f'No alarms found for function {func_name}')
