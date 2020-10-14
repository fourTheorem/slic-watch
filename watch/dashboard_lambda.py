import boto3

from widget import create_metric_widget

lambda_client = boto3.client('lambda')

LAMBDA_FUNCTION_METRICS = [('Duration', 'Average'), ('Duration', 'p95'),
                           ('Duration', 'Maximum'), ('Invocations', 'Sum'),
                           ('ConcurrentExecutions', 'Maximum')]


def create_all_functions_widget():
    """ Create a widget for multiple metrics relating to all functions """
    all_lambda_metrics = [
        ['AWS/Lambda', 'Duration', {'stat': 'Maximum'}],
        ['.', '.', {'stat': 'Average'}],
        ['.', '.', {'stat': 'p95'}],
        ['.', '.', {'stat': 'Minimum'}],
        ['.', 'ConcurrentExecutions', {'stat': 'Maximum', 'yAxis': 'right'}]
    ]
    return create_metric_widget(
        title='All Functions Duration/Concurrent Executions',
        metrics=all_lambda_metrics)


def create_function_widgets(lambda_functions: list):
    """ Create metric widgets for relevant function metrics.
        Each widget has a line for each function """
    widgets = [
        create_metric_widget(title=f'{metric} {stat} per Function',
                             metrics=[['AWS/Lambda', metric, 'FunctionName', func, {'stat': stat}] for func in lambda_functions])
        for metric, stat in LAMBDA_FUNCTION_METRICS
    ]

    return widgets


def get_applicable_lambdas():
    """ Find all Lambdas and group them by tag so we can do tag filtering """
    tags_per_func = {}
    for response in lambda_client.get_paginator('list_functions').paginate():
        for function in response['Functions']:
            name = function['FunctionName']
            tags = lambda_client.get_function(FunctionName=name).get('Tags', {})
            tags_per_func[name] = tags
    return tags_per_func


def get_widgets():
    lambda_functions = get_applicable_lambdas()
    return [create_all_functions_widget()] + create_function_widgets(lambda_functions)
