console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
    input = input.map(e => e.split(""));
}

function part1() {
    formatFile();
    for (let i = 0; i < input.length; i++) {
        for (let row = 1; row < input.length; row++) {
            for (let col in input[row]) {
                if (input[row][col] == "O" && input[row-1][col] == ".") {
                    input[row][col] = ".";
                    input[row-1][col] = "O";
                }
            }
        }
    }
    input = input.map(e => e.join(""));
    let rocksPerRow = input.map(e => [...e.matchAll("O")].length);
    let loadPerRow = rocksPerRow.map((e, i) => e*(rocksPerRow.length-i));
    return loadPerRow.reduce((a, b) => a+b);
}

function part2() {
    formatFile();
}

console.log(part1(), part2());