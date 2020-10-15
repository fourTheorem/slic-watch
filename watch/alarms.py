import boto3
import os

from aws_lambda_powertools import Logger
from concurrent import futures
from lambdas import get_applicable_lambdas

LOG = Logger()

cloudwatch_client = boto3.client('cloudwatch')

def create_lambda_alarm(func_name, threshold, period):
    """ Create an alarm for lambda errors """
    return cloudwatch_client.put_metric_alarm(
        AlarmName=f'LambdaError_{func_name}',
        Period=period,
        EvaluationPeriods=1,
        MetricName='Errors',
        Namespace='AWS/Lambda',
        Statistic='Sum',
        ComparisonOperator='GreaterThanThreshold',
        Threshold=threshold,
        ActionsEnabled=True,
        AlarmDescription=f'Alarm for lambda {func_name} errors',
        Dimensions=[{
            'Name': 'FunctionName',
            'Value': func_name
        }],
        AlarmActions=[
            os.getenv('SNS_ALARMS_TOPIC')
        ]
    )

def update_alarms(errors_threshold=1.0, errors_period=60):
    lambda_functions = get_applicable_lambdas()

    with futures.ThreadPoolExecutor(max_workers=10) as executor:
        wait_for = [
            executor.submit(create_lambda_alarm,
                func_name=func_name,
                threshold=errors_threshold,
                period=errors_period
            )
            for func_name in lambda_functions.keys()
        ]

        for future in futures.as_completed(wait_for):
            LOG.info(future.result())
