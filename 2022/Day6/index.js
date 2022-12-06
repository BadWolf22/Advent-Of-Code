const fs = require('fs');

let input;

function formatFile() {
    input = Array.from(fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' }));
    // input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let curr = [];
    let charCount = 0;
    while (input.length > 0) {
        if (curr.length == 4) curr.shift();
        charCount++;
        curr.push(input.shift());
        if (curr.length == 4 && allDiff(curr)) return charCount;
    }
    return -1;
}

function allDiff(curr) {
    for (let char1 in curr) {
        for (let char2 in curr) {
            if (char1 != char2 && curr[char1] == curr[char2]) {
                return false;
            }
        }
    }
    return true;
}

function part2() {
    formatFile();
    let curr = [];
    let charCount = 0;
    while (input.length > 0) {
        if (curr.length == 14) curr.shift();
        charCount++;
        curr.push(input.shift());
        if (curr.length == 14 && allDiff(curr)) return charCount;
    }
    return -1;
}

console.log(part1(), part2());