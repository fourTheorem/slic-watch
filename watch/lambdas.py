from typing import Mapping

import boto3

from aws_lambda_powertools import Logger
from lambda_function import LambdaFunction

lambda_client = boto3.client('lambda')

LOG = Logger()
MAX_FUNCTIONS = 50  # Avoid creating too many resources


def get_applicable_lambdas() -> Mapping[str, LambdaFunction]:
    """ Find all Lambdas and group them by tag so we can do tag filtering """
    functions: Mapping[str: LambdaFunction] = {}
    # Moto still returns duplicates so we use the dict response to deduplicate
    for response in lambda_client.get_paginator('list_functions').paginate():
        for function in response['Functions']:
            if len(functions) == MAX_FUNCTIONS:
                LOG.warning(f'Maximum number of Lambda functions ({MAX_FUNCTIONS})'
                            f' reached. Additional functions will be ignored.')
            name = function['FunctionName']
            func_response = lambda_client.get_function(FunctionName=name)
            config = func_response['Configuration']
            functions[config['FunctionName']] = LambdaFunction(
                name=config['FunctionName'],
                runtime=config['Runtime'],
                timeout=config['Timeout'],
                memory_size=config['MemorySize'],
                tags=func_response.get('Tags', {})
            )
    return functions
