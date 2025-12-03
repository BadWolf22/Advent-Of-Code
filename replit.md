# Advent of Code Solutions

## Overview
This repository contains Advent of Code solutions written in Node.js. The project includes solutions from multiple years (2015, 2019, 2022, 2023, 2024, 2025), organized by year and day.

## Project Structure
```
.
├── index.js              # CLI runner for solutions
├── 2015/                 # Solutions for 2015
│   └── Day1/, Day2/, ... # Individual day folders
├── 2019/                 # Solutions for 2019
├── 2022/                 # Solutions for 2022
├── 2023/                 # Solutions for 2023
├── 2024/                 # Solutions for 2024
└── struct/               # Template structure for new solutions
```

Each day folder contains:
- `index.js` - The solution code
- `input.txt` - The puzzle input
- `sample.txt` - Sample input (when available)

## Recent Changes
- **2024-12-03**: Initial Replit setup
  - Created CLI interface (`index.js`) to run solutions
  - Configured workflow to run solutions via CLI
  - Added `.gitignore` for Node.js
  - Set up project documentation

## How to Use

### Running Solutions
The project includes a CLI interface to easily run any solution:

```bash
node index.js <year> <day>
```

Examples:
```bash
node index.js 2024 1      # Run 2024 Day 1
node index.js 2023 5      # Run 2023 Day 5
node index.js 2022 Day10  # Day prefix is optional
```

Running without arguments shows available solutions:
```bash
node index.js
```

### The Workflow
The configured workflow currently runs `node index.js 2024 1` (2024 Day 1) by default. 

To change which solution runs automatically:
1. Go to the workflow settings
2. Update the command to: `node index.js <year> <day>`
3. Example: `node index.js 2023 5` to run 2023 Day 5

### Adding New Solutions
Use the `struct/` folder as a template for new solutions. Each solution should:
1. Read input from `input.txt`
2. Implement `part1()` and `part2()` functions
3. Use `formatFile()` to parse input data

## Technology Stack
- **Language**: Node.js 20
- **Environment**: Replit
- **Type**: CLI Application

## Project Architecture
This is a collection of standalone JavaScript files, each solving a specific Advent of Code puzzle. Solutions use Node.js built-in modules (`fs` for file I/O) and don't require external dependencies.

The CLI runner (`index.js`) provides a convenient interface to:
- List all available solutions by year
- Execute specific solutions
- Handle errors gracefully

## User Preferences
No specific user preferences recorded yet.
