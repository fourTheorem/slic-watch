import json
from typing import Mapping

from aws_lambda_powertools import Logger
import boto3

import dashboard_lambda
from lambda_function import LambdaFunction

DASHBOARD_PERIOD = '-PT3H'
WIDGET_WIDTH = 24
WIDGET_HEIGHT = 6
MAX_WIDTH = 24

LOG = Logger()

cw_client = boto3.client('cloudwatch')


def update_dashboard(lambda_functions: Mapping[str, LambdaFunction]):
    widgets = dashboard_lambda.get_widgets(lambda_functions)
    lay_out_widgets(widgets)
    dash = {
        'start': DASHBOARD_PERIOD,
        'widgets': widgets
    }
    dash_body = json.dumps(dash)
    dash_response = cw_client.put_dashboard(DashboardName='SLICWatch', DashboardBody=dash_body)
    LOG.info(dash_response)


def lay_out_widgets(widgets):
    x = 0
    y = 0
    for widget in widgets:
        if x + WIDGET_WIDTH > MAX_WIDTH:
            y += WIDGET_HEIGHT
            x = 0
        widget['x'] = x
        widget['y'] = y
        widget['width'] = WIDGET_WIDTH
        widget['height'] = WIDGET_HEIGHT
        x += WIDGET_WIDTH
