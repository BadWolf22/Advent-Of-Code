console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    for (let line of input) {
        line = line.split(".")
        console.log(line);
        break;
    }
}

function part2() {
    formatFile();
}

console.log(part1(), part2());