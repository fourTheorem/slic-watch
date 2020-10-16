import boto3
import os

from aws_lambda_powertools import Logger

LOG = Logger()
cloudwatch_client = boto3.client('cloudwatch')

def get_existing_alarm(func_name):
  alarm_name = f'LambdaError_{func_name}'

  alarms = cloudwatch_client.describe_alarms(
    AlarmNames=[
      alarm_name
    ]
  )

  existing_alarm = next(
    (_ for _ in alarms['MetricAlarms'] if _['AlarmName'] == alarm_name),
    None
  )

  return existing_alarm

def delete_alarms(func_name):
  existing_alarm = get_existing_alarm(func_name)

  if existing_alarm:
    response = cloudwatch_client.delete_alarms(
      AlarmNames=[
        existing_alarm['AlarmName']
      ]
    )

    LOG.info(response)
  else:
    LOG.info(f'No alarms found for function {func_name}')
