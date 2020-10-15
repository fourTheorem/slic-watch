import boto3
import os

from aws_lambda_powertools import Logger
from concurrent import futures
from lambdas import get_applicable_lambdas

LAMBDA_ERRORS_ALARM_NAME = 'LambdaErrosAlarm'

LOG = Logger()

cloudwatch_client = boto3.client('cloudwatch')

def create_lambda_alarm(func_name):
    """ Create an alarm for lambda errors """
    return cloudwatch_client.put_metric_alarm(
        AlarmName=f'LambdaError_{func_name}',
        Period=60,
        EvaluationPeriods=1,
        MetricName='Errors',
        Namespace='AWS/Lambda',
        Statistic='Sum',
        ComparisonOperator='GreaterThanThreshold',
        Threshold=1.0,
        ActionsEnabled=True,
        AlarmDescription='Alarm for lambda function errors',
        Dimensions=[{
            'Name': 'FunctionName',
            'Value': func_name
        }],
        AlarmActions=[
            os.getenv('SNS_ALARMS_TOPIC')
        ]
    )

def update_alarms():
    lambda_functions = get_applicable_lambdas()

    with futures.ThreadPoolExecutor(max_workers=10) as executor:
        wait_for = [
            executor.submit(create_lambda_alarm, func_name)
            for func_name in lambda_functions.keys()
        ]

        for future in futures.as_completed(wait_for):
            LOG.info(future.result())
