console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n\n").map(e => e.split("\n"));
}

function part1() {
    formatFile();
    let summary = 0;
    for (let pattern of input) {
        let reflection = findReflectionSummary(pattern);
        summary += reflection;
    }
    return summary;
}

function findReflectionSummary(pattern) {
    for (let i = 1; i < pattern.length; i++) {
        if (checkReflectionHorizontal(pattern, i)) return 100 * i;
    }
    for (let i = 1; i < pattern[0].length; i++) {
        if (checkReflectionVertical(pattern, i)) return i;
    }
}

function checkReflectionHorizontal(pattern, index) {
    for (let i = 0; i < Math.min(pattern.length, index, pattern.length-index); i++) {
        if (pattern[index+i] != pattern[index-i-1]) return false;
    }
    return true;
}

function checkReflectionVertical(pattern, index) {
    return pattern.every(line => checkReflectionHorizontal(line, index));
}

// TODO: agony
function part2() {
    formatFile();
}

console.log(part1());
console.log(part2());