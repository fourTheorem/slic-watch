from typing import Mapping

import boto3

from lambda_function import LambdaFunction

lambda_client = boto3.client('lambda')


def get_applicable_lambdas():
    """ Find all Lambdas and group them by tag so we can do tag filtering """
    functions: Mapping[str: LambdaFunction] = {}
    # Moto still returns duplicates so we use the dict response to deduplicate
    for response in lambda_client.get_paginator('list_functions').paginate():
        for function in response['Functions']:
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
