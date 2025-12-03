#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.clear();
console.log('=== Advent of Code Solutions ===\n');

// Get available years
const years = fs.readdirSync('.')
    .filter(file => fs.statSync(file).isDirectory() && /^\d{4}$/.test(file))
    .sort();

if (years.length === 0) {
    console.log('No solution years found.');
    process.exit(1);
}

console.log('Available years:');
years.forEach(year => {
    const days = fs.readdirSync(year)
        .filter(file => fs.statSync(path.join(year, file)).isDirectory() && /^Day\d+$/.test(file))
        .sort((a, b) => {
            const numA = parseInt(a.replace('Day', ''));
            const numB = parseInt(b.replace('Day', ''));
            return numA - numB;
        });
    console.log(`  ${year}: ${days.length} days completed`);
});

// If command line arguments are provided, run specific solution
const args = process.argv.slice(2);
if (args.length >= 2) {
    const year = args[0];
    const day = args[1].startsWith('Day') ? args[1] : `Day${args[1]}`;
    
    // Validate year exists
    if (!years.includes(year)) {
        console.log(`\nError: Year ${year} not found. Available years: ${years.join(', ')}`);
        process.exit(1);
    }
    
    const solutionPath = path.join(year, day, 'index.js');
    
    if (!fs.existsSync(solutionPath)) {
        console.log(`\nError: Solution not found at ${solutionPath}`);
        console.log(`Available days for ${year}:`);
        const availableDays = fs.readdirSync(year)
            .filter(file => fs.statSync(path.join(year, file)).isDirectory() && /^Day\d+$/.test(file))
            .sort((a, b) => {
                const numA = parseInt(a.replace('Day', ''));
                const numB = parseInt(b.replace('Day', ''));
                return numA - numB;
            });
        console.log(`  ${availableDays.join(', ')}`);
        process.exit(1);
    }
    
    console.log(`\nRunning ${year} ${day}...\n`);
    console.log('='.repeat(50));
    
    // Change to the solution directory and run it
    const solutionDir = path.join(year, day);
    const child = spawn('node', ['index.js'], { 
        cwd: solutionDir,
        stdio: 'inherit'
    });
    
    child.on('error', (error) => {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    });
    
    child.on('exit', (code) => {
        if (code !== 0) {
            console.error(`\nSolution exited with code ${code}`);
        }
        process.exit(code);
    });
} else if (args.length === 1) {
    console.log('\nError: Please provide both year and day.');
    console.log('Usage: node index.js <year> <day>');
    console.log('Example: node index.js 2024 1');
} else {
    console.log('\nUsage: node index.js <year> <day>');
    console.log('Example: node index.js 2024 1');
    console.log('Example: node index.js 2023 Day5');
    console.log('\nTip: Run without arguments to see available solutions.');
}
