"""
Lambda handler module invoked during stack create/update/delete.
Adds monitoring and alarms for new/updated resouces
"""
from aws_lambda_powertools import Logger

from dashboard import update_dashboard
from alarms import update_alarms

LOG = Logger()


@LOG.inject_lambda_context
def watch_existing(event, _):
    """ Handle create/update/delete of CloudFormation stacks """
    # services = event.get('WatchServices'
    # tag_filter = event['TagFilter']

    update_dashboard()
    update_alarms(
        errors_threshold=float(event['LambdaErrorsThreshold']),
        errors_period=int(event['LambdaErrorsPeriod']),
        throttles_threshold=float(event['LambdaThrottlesRateThreshold']),
    )
    return {}
