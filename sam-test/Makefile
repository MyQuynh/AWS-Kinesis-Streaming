ifndef VERBOSE
MAKEFLAGS += --no-print-directory
endif
SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: build-RuntimeDependenciesLayer



help:
	@ echo "Use one of the following targets:"
	@ tail -n +8 Makefile |\
	egrep "^[a-z]+[\ :]" |\
	tr -d : |\
	tr " " "/" |\
	sed "s/^/ - /g"
	@ echo "Read the Makefile for further details"

venv virtualenv:
	@ echo "Creating a new virtualenv..."
	@ rm -rf venv || true
	@ python3 -m venv venv
	@ echo "Done, now you need to activate it. Run:"
	@ echo "source venv/bin/activate"

activate:
	@ echo "Activating this Python3 Virtual Env:"
	@ echo "source venv/bin/activate"

install:
	@ if [ -z "${VIRTUAL_ENV}" ]; then \
		echo "Not inside a virtualenv."; \
		exit 1; \
	fi
	@ echo "Updating pip packages:"
	@ pip install -r "requirements.txt"
	@ echo "Self installing this package in edit mode:"
	@ pip install -e .
	@ echo "You are ready to go ;-)"


cleanfull:
	@ echo "Cleaning old files..."
	@ rm -rf **/.pytest_cache
	@ rm -rf .tox
	@ rm -rf dist
	@ rm -rf build
	@ rm -rf **/__pycache__
	@ rm -rf *.egg-info
	@ rm -rf .coverage*
	@ rm -rf **/*.pyc
	@ rm -rf env
	@ rm -rf local
	@ rm -rf .aws-sam
	@ echo "All done!"

clean:
	@ echo "Cleaning old files..."
	@ rm -rf **/.pytest_cache
	@ rm -rf .tox
	@ rm -rf dist
	@ rm -rf build
	@ rm -rf **/__pycache__
	@ rm -rf *.egg-info
	@ rm -rf .coverage*
	@ rm -rf **/*.pyc
	@ echo "All done!"

package:
	@ python setup.py sdist
	@ echo "Your package is in the dist directory."

upload pypi:
	@ python setup.py sdist upload


build-RuntimeDependenciesLayer:
		mkdir -p "$(ARTIFACTS_DIR)/python"
		cp *.py "$(ARTIFACTS_DIR)/python"
		python -m pip install -r requirements.txt -t "$(ARTIFACTS_DIR)/python"