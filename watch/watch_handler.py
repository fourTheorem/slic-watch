"""
Lambda handler module invoked during stack create and update.
Adds monitoring and alarms for new/updated resouces
"""

from aws_lambda_powertools import Logger
import stringcase

from alarm_config import LambdaAlarmsConfig
from dashboard import update_dashboard
from alarms import update_alarms

LOG = Logger()


@LOG.inject_lambda_context
def watch_existing(event, _):
    LOG.info({'event': event})
    """ Handle create/update/delete of CloudFormation stacks """
    # services = event.get('WatchServices'
    # tag_filter = event['TagFilter']

    update_dashboard()

    alarm_config_fields = {}
    for field_name, field in LambdaAlarmsConfig.__dataclass_fields__.items():
        param_name = stringcase.pascalcase(field_name)
        if param_name in event:
            alarm_config_fields[field_name] = field.type(event[param_name])

    config = LambdaAlarmsConfig(**alarm_config_fields)
    update_alarms(config)

    return {}
