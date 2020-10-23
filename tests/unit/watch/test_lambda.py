from typing import Dict


def test_get_applicable_lambdas(lambda_functions: Dict[str, Dict[str, str]], lambda_role_name: str):
    from lambdas import get_applicable_lambdas

    applicable_lambdas = get_applicable_lambdas()
    assert applicable_lambdas == lambda_functions
