import boto3

DASHBOARD_PERIOD = '-PT3H'
METRIC_PERIOD = 60
REGION = boto3.Session().region_name


def create_metric_widget(title, metrics):
    return dict(
        type='metric',
        properties=dict(
            metrics=metrics,
            view='timeSeries',
            region=REGION,
            stat='Maximum',
            period=METRIC_PERIOD,
            title=title
        )
    )
