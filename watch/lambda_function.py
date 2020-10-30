from dataclasses import dataclass
from typing import Mapping


@dataclass
class LambdaFunction:
    name: str
    runtime: str
    timeout: int
    memory_size: int
    tags: Mapping[str, str]
