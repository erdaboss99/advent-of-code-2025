# Advent of Code 2025

Go solutions for [Advent of Code 2025](https://adventofcode.com/2025).

## Tools Used

- **Go** - Primary language for solutions
- **godotenv** - Environment variable management
- **Make** - Build automation and task runner

## Setup

1. Install dependencies:

```bash
make install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Add your Advent of Code session token
```

## Environment Variables

- `SESSION` - Your Advent of Code session token (required for automatic input fetching)

## Make Commands

- `make help` - Show available commands
- `make solve <day>` - Run solution for specific day (e.g., `make solve 6`)
- `make create` - Create a new day template for today
- `make build` - Build the project
- `make fmt` - Format Go code
- `make install` - Install dependencies
- `make clean` - Clean build artifacts

## Project Structure

```
├── days/           # Daily solution files
├── inputs/         # Input files for each day
├── utils/          # Utility functions
├── bin/            # Built binaries
├── main.go         # Main solver entry point
└── Makefile        # Build automation
```

## Usage

Create a file for the current day:

```bash
make create
```

This automatically:

- Creates `days/dayXX.go` with template code
- Updates `main.go` switch statement
- Sets up proper function names and input handling

Run solutions:

```bash
make solve 6        # Run day 6
go run . 6          # Alternative way
go run . create     # Create new day
```

