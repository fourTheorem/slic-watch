import io
import os
from typing import Dict
import zipfile

from botocore.exceptions import ClientError
import boto3
from moto import mock_iam, mock_lambda
import pytest


AWS_DEFAULT_REGION = 'eu-west-1'


@pytest.fixture(scope="session", autouse=True)
def set_up():
    """
    Override AWS credential environment variables to mitigate
    any real AWS interaction when moto should be used
    """
    dummy_value = 'test_override_value'
    os.environ.update({
        'AWS_ACCESS_KEY_ID': dummy_value,
        'AWS_SECRET_ACCESS_KEY': dummy_value,
        'AWS_SECURITY_TOKEN': dummy_value,
        'AWS_SESSION_TOKEN': dummy_value,
        'AWS_DEFAULT_REGION': AWS_DEFAULT_REGION
    })
    if 'AWS_PROFILE' in os.environ:
        del os.environ['AWS_PROFILE']


@pytest.fixture(scope="session")
def lambda_zip_file() -> bytes:
    """ Taken from
        https://github.com/spulec/moto/blob/14980371d796ef849b1ea401ce2c028911b537d1/tests/test_awslambda/test_lambda.py#L43 """
    func_str = '''
def handle_event context):
    print("custom log event")
    return event
'''
    zip_output = io.BytesIO()
    zip_file = zipfile.ZipFile(zip_output, 'w', zipfile.ZIP_DEFLATED)
    zip_file.writestr('handler.py', func_str)
    zip_file.close()
    zip_output.seek(0)
    return zip_output.read()


@pytest.fixture(scope="session")
def lambda_role_name() -> str:
    """ Taken from
    https://github.com/spulec/moto/blob/14980371d796ef849b1ea401ce2c028911b537d1/tests/test_awslambda/test_lambda.py#L1818 """
    with mock_iam():
        iam = boto3.client('iam')
        try:
            yield iam.get_role(RoleName='test-lambda-role')['Role']['Arn']
        except ClientError:
            yield iam.create_role(
                RoleName='test-lambda-role',
                AssumeRolePolicyDocument='some policy',
                Path='/my-path/',
            )['Role']['Arn']


@pytest.fixture(scope="session")
def lambda_functions(lambda_zip_file, lambda_role_name) -> Dict[str, Dict]:
    """
    Returns a dict of function name to tags
    """
    with mock_lambda():
        functions = {f'TestFunction{n}': {} for n in range(1, 51)}
        client = boto3.client('lambda')
        for fn, tags in functions.items():
            client.create_function(
                FunctionName=fn,
                Runtime='python3.8',
                Handler='handler.handle_event',
                Role=lambda_role_name,
                Code={'ZipFile': lambda_zip_file},
                Tags=tags,
                Publish=True
            )
        yield functions
