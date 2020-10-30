from typing import List

from lambda_function import LambdaFunction


def test_get_applicable_lambdas(lambda_functions: List[LambdaFunction]):
    from lambdas import get_applicable_lambdas

    applicable_lambdas = get_applicable_lambdas()
    assert applicable_lambdas == lambda_functions
