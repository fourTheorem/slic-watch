"""
Lambda handler module invoked during stack create and update.
Adds monitoring and alarms for new/updated resources
"""
import os

from aws_lambda_powertools import Logger
import stringcase

from alarm_config import LambdaAlarmsConfig
from dashboard import update_dashboard
from alarms import update_alarms, delete_alarms, create_lambda_alarms
from lambda_function import LambdaFunction
from lambdas import get_applicable_lambdas

LOG = Logger()


def _get_alarm_config() -> LambdaAlarmsConfig:
    """ Get alarm configuration from CloudFormation stack parameters passed as environment """
    alarm_config_fields = {}
    for field_name, field in LambdaAlarmsConfig.__dataclass_fields__.items():
        env_name = stringcase.uppercase(field_name)
        if env_name in os.environ:
            alarm_config_fields[field_name] = field.type(os.environ[env_name])

    return LambdaAlarmsConfig(**alarm_config_fields)


@LOG.inject_lambda_context
def handle_stack(_event, _context):
    """ Handle create/update of CloudFormation stacks """
    config = _get_alarm_config()
    lambda_functions = get_applicable_lambdas()
    update_dashboard(lambda_functions)
    alarm_names = update_alarms(config, lambda_functions)

    return alarm_names


@LOG.inject_lambda_context
def handle_function_create_update(event, _):
    """ Handle FunctionCreate or UpdateFunctionConfiguration via AWS CloudTrail via EventBridge """
    req = event['detail']['requestParameters']
    func = LambdaFunction(
        func_name=req['functionName'],
        runtime=req['runtime'],
        timeout=req['timeout'],
        memory_size=req['memorySize'],
        tags=req['tags']
    )
    config = _get_alarm_config()
    create_lambda_alarms(func, config)


@LOG.inject_lambda_context
def handle_function_delete(event, _):
    """ Handle FunctionDelete via AWS CloudTrail via EventBridge """
    func_name = event['detail']['requestParameters']['functionName']
    delete_alarms(func_name)
