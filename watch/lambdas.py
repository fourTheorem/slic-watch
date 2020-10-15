import boto3

lambda_client = boto3.client('lambda')

def get_applicable_lambdas():
    """ Find all Lambdas and group them by tag so we can do tag filtering """
    tags_per_func = {}
    for response in lambda_client.get_paginator('list_functions').paginate():
        for function in response['Functions']:
            name = function['FunctionName']
            tags = lambda_client.get_function(FunctionName=name).get('Tags', {})
            tags_per_func[name] = tags
    return tags_per_func
