import boto3
from moto import mock_lambda


@mock_lambda
def test_get_applicable_lambdas_single(lambda_zip_file, lambda_role_name):
    from lambdas import get_applicable_lambdas

    client = boto3.client('lambda')
    client.create_function(
        FunctionName='testFunction',
        Runtime='python3.8',
        Handler='handler.handle_event',
        Role=lambda_role_name,
        Code={'ZipFile': lambda_zip_file},
        Publish=True
    )
    applicable_lambdas = get_applicable_lambdas()
    assert applicable_lambdas == {
        'testFunction': {}
    }
