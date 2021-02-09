import boto3
import json
from moto import mock_cloudwatch


@mock_cloudwatch
def test_dashboard(lambda_functions):
    from dashboard import update_dashboard

    update_dashboard(lambda_functions)

    cw = boto3.client("cloudwatch")
    dash = json.loads(cw.get_dashboard(DashboardName="SLICWatch")["DashboardBody"])

    assert dash["start"] == "-PT3H"
    widgets = dash["widgets"]
    assert len(widgets) == 8
    widgets_by_title = {widget["properties"]["title"]: widget for widget in widgets}
    expected_titles = [
        "All Functions Duration/Concurrent Executions",
        "Duration Average per Function",
        "Duration p95 per Function",
        "Duration Maximum per Function",
        "Invocations Sum per Function",
        "ConcurrentExecutions Maximum per Function",
        "Throttles Sum per Function",
        "Errors Sum per Function",
    ]
    for title in expected_titles:
        assert title in widgets_by_title
    error_metrics = widgets_by_title["Errors Sum per Function"]["properties"]["metrics"]
    assert len(error_metrics) == len(lambda_functions)
    expected_functions = [metric[3] for metric in error_metrics]
    assert expected_functions == list(lambda_functions.keys())
