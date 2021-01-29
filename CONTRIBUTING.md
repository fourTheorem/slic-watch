# Contributing


## Troubleshooting Tests

1. "I get errors while running the unit tests, like `botocore.exceptions.NoCredentialsError: Unable to locate credentials`. It seems like boto3 is attempting to access real resources instead of the moto mocks!"

This typically happens when a test imports a module that imports `boto3` before the mocks have been set up. The solution is to import such modules within the test function itself. For example:

```py
@mock_cloudwatch
def test_update_alarms(lambda_functions):
    os.environ["SNS_ALARMS_TOPIC"] = "TestAlarmsTopic"
    from alarms import update_alarms  # <- This import occurs within a function decorated by a moto mock
```

This issue is detailed further in the [moto README](https://github.com/spulec/moto#what-about-those-pesky-imports)

