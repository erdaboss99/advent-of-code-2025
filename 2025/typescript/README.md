# Advent of Code 2025

TypeScript solutions for [Advent of Code 2025](https://adventofcode.com/2025).

## Tools Used

- **TypeScript** - Primary language for solutions
- **Node.js** (v24) - Runtime environment
- **ts-node** - TypeScript execution without compilation
- **Biome** - Fast linter and formatter
- **dotenv** - Environment variable management

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Add your Advent of Code session token
```

## Environment Variables

- `SESSION` - Your Advent of Code session token (required for automatic input fetching)

## Scripts

- `npm run solve` - Run the main solver
- `npm run create` - Create a new day template
- `npm run lint` - Lint code with Biome
- `npm run format` - Format code with Biome
- `npm run check` - Run Biome linter and formatter

## Project Structure

```
├── days/           # Daily solution files
├── inputs/         # Input files for each day
├── utils/          # Utility functions
└── main.ts         # Main solver entry point
```

## Usage

Create a file for the current day

```bash
npm run create
```

Run solutions:

```bash
npm run solve <day>
```
