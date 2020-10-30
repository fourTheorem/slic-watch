from dataclasses import dataclass


@dataclass
class LambdaAlarmsConfig:
    period: int = 60
    errors_threshold: float = 0.0
    throttles_percent_threshold: float = 0.0
    duration_percent_timeout_threshold: float = 95.0