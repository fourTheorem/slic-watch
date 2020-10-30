all: deps test coverage

deps:
	pip install -r watch/requirements.txt
	pip install -r watch/requirements-dev.txt

test:
	PYTHONPATH=watch coverage run -m pytest tests

coverage:
	coverage html
	coverage report
	@echo
	@echo Open htmlcov/index.html to see the full coverage report

lint:
	flake8 watch tests

lint-fix:
	autopep8 --in-place --recursive tests/ watch/
