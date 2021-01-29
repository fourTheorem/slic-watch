"""
Lambda handler module invoked during stack delete.
Delete alarms for deleted resouces
"""
import boto3

from alarms import delete_alarms
from aws_lambda_powertools import Logger

LOG = Logger()
cw_client = boto3.client('cloudwatch')


@LOG.inject_lambda_context
def delete_resources(event, _):
    """ Handle delete of CloudFormation stacks """
    LOG.info({'event': event})
    parameters = event.get('detail', {})['requestParameters']

    if 'functionName' in parameters:
        delete_alarms(func_name=parameters['functionName'])

    return {}
