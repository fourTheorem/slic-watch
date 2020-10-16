from alarms import update_alarms


def test_alarms():
    update_alarms(
        errors_threshold=1,
        errors_period=60,
        throttles_threshold=1,
    )
