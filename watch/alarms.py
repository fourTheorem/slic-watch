from typing import Iterable, Mapping

import boto3
import os
from functools import partial

from aws_lambda_powertools import Logger
from concurrent import futures

from alarm_config import LambdaAlarmsConfig
from lambda_function import LambdaFunction

SNS_ALARMS_TOPIC = os.getenv('SNS_ALARMS_TOPIC')
MAX_PUT_ALARM_CONCURRENCY = 3
LOG = Logger()

cloudwatch_client = boto3.client('cloudwatch')


def _create_lambda_errors_alarm(func: LambdaFunction, config: LambdaAlarmsConfig) -> str:
    """ Create an alarm for Lambda errors
        :param func The Lambda function for which error alarms are to be created
        :param config The alarm configuration
        :return The alarm name
    """
    alarm_name = f'LambdaErrors_{func.name}'
    LOG.info('Creating errors alarm', extra={'AlarmName': alarm_name})
    cloudwatch_client.put_metric_alarm(
        AlarmName=alarm_name,
        Period=config.period,
        EvaluationPeriods=1,
        MetricName='Errors',
        Namespace='AWS/Lambda',
        Statistic='Sum',
        ComparisonOperator='GreaterThanThreshold',
        Threshold=config.errors_threshold,
        ActionsEnabled=True,
        AlarmDescription=f'Alarm for lambda {func.name} errors',
        Dimensions=[{'Name': 'FunctionName', 'Value': func.name}],
        AlarmActions=[SNS_ALARMS_TOPIC]
    )
    return alarm_name


def _create_lambda_throttles_alarm(func: LambdaFunction, config: LambdaAlarmsConfig) -> str:
    """ Create an alarm on the number of throttles as a percentage
        of invocations for a given period

        :param func The Lambda function for which error alarms are to be created
        :param config The alarm configuration
        :return The alarm name """
    alarm_name = f'LambdaThrottles_{func.name}'
    LOG.info('Creating throttles alarm', extra={'AlarmName': alarm_name})
    cloudwatch_client.put_metric_alarm(
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
                        'Dimensions': [{'Name': 'FunctionName', 'Value': func.name}]
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
                        'Dimensions': [{'Name': 'FunctionName', 'Value': func.name}]
                    },
                    'Period': config.period,
                    'Stat': 'Sum'
                },
                'ReturnData': False
            }
        ],
        ComparisonOperator='GreaterThanThreshold',
        Threshold=config.duration_percent_timeout_threshold,
        ActionsEnabled=True,
        AlarmDescription=f'Alarm for Lambda {func.name} throttles/invocations',
        AlarmActions=[SNS_ALARMS_TOPIC]
    )
    return alarm_name


def _create_lambda_duration_alarms(func: LambdaFunction, config: LambdaAlarmsConfig):
    """ Create an alarm for Lambda duration when it reaches a percentage threshold of the function timeout

        :param func The Lambda function for which error alarms are to be created
        :param config The alarm configuration
        :return The alarm name """
    alarm_name = f'LambdaDuration_{func.name}'
    LOG.info('Creating duration alarm', extra={'AlarmName': alarm_name})
    cloudwatch_client.put_metric_alarm(
        AlarmName=alarm_name,
        Period=config.period,
        EvaluationPeriods=1,
        MetricName='Duration',
        Namespace='AWS/Lambda',
        Statistic='Maximum',
        ComparisonOperator='GreaterThanThreshold',
        Threshold=(config.duration_percent_timeout_threshold * func.timeout / 100),
        ActionsEnabled=True,
        AlarmDescription=f'Alarm for lambda {func.name} errors',
        Dimensions=[{'Name': 'FunctionName', 'Value': func.name}],
        AlarmActions=[SNS_ALARMS_TOPIC]
    )
    return alarm_name


def create_lambda_alarms(func: LambdaFunction, config: LambdaAlarmsConfig):
    return [
        _create_lambda_errors_alarm(func, config),
        _create_lambda_throttles_alarm(func, config),
        _create_lambda_duration_alarms(func, config),
    ]


def update_alarms(config: LambdaAlarmsConfig, lambda_functions: Mapping[str, LambdaFunction]) -> Iterable[str]:
    """ Create or update alarms for Lambda functions

    :param config: The alarm configuration parameters for Lambda functions
    :param lambda_functions: The set of Lambda functions for which alarms are to be created

    :return Alarm names
    """
    LOG.info('Creating alarms', extra={'Functions': lambda_functions, 'Count': len(lambda_functions)})

    with futures.ThreadPoolExecutor(max_workers=MAX_PUT_ALARM_CONCURRENCY) as executor:
        alarm_names = executor.map(
            partial(create_lambda_alarms, config=config),
            lambda_functions.values()
        )
        return list(alarm_names)


def delete_alarms(func_name: str) -> Iterable[str]:
    """ Delete alarms created by this stack for a specified Lambda function

    :param func_name: Lambda function name
    :return The deleted alarm names
    """
    # TODO - include SLIC Watch indicator in Alarm names to avoid collision
    alarm_names = [
        f'LambdaErrors_{func_name}',
        f'LambdaThrottles_{func_name}',
        f'LambdaDuration_{func_name}'
    ]
    # DeleteAlarms fails silently if the alarms with any
    cloudwatch_client.delete_alarms(AlarmNames=alarm_names)
    return alarm_names
