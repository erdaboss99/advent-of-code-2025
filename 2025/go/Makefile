SHELL := /bin/bash

.PHONY: help install solve create clean build fmt

help:
	@echo "Available commands:"
	@echo "  install  - Install Go dependencies"
	@echo "  solve    - Solve a specific day (usage: make solve 6)"
	@echo "  create   - Create a new day file for today"
	@echo "  build    - Build the project"
	@echo "  fmt      - Format Go code"
	@echo "  clean    - Clean build artifacts"

install:
	go mod download
	go mod tidy

solve:
	@if [ -z "$(filter-out $@,$(MAKECMDGOALS))" ]; then \
		echo "Usage: make solve <day_number>"; \
		exit 1; \
	fi
	go run . $(filter-out $@,$(MAKECMDGOALS))

%:
	@:

create:
	go run . create

build:
	go build -o bin/aoc *.go

fmt:
	go fmt ./...

clean:
	rm -rf bin/
	go clean
