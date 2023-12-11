console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let sum = 0;
    for (let [i, line] of input.entries()) {
        let differenceLines = findDifferences(line);
        for (let l = differenceLines.length-2; l >= 0; l--) {
            differenceLines[l].push(differenceLines[l][differenceLines[l].length-1] + differenceLines[l+1][differenceLines[l+1].length-1])
        }
        sum += differenceLines[0][differenceLines[0].length-1];
    }
    return sum;
}

function findDifferences(line) {
    let differenceLines = [line.split(" ").map(e => parseInt(e))];
    while (true) {
        let curr = differenceLines[differenceLines.length-1];
        let next = [];
        for (let num = 0; num < curr.length-1; num++) {
            next.push(curr[num+1]-curr[num]);
        }
        differenceLines.push(next);
        if (next.every(e => e==0)) {
            break;
        }
    }
    return differenceLines;
}

function part2() {
    formatFile();
    let sum = 0;
    for (let [i, line] of input.entries()) {
        let differenceLines = findDifferences(line);
        for (let l = differenceLines.length-2; l >= 0; l--) {
            differenceLines[l].unshift(differenceLines[l][0]-differenceLines[l+1][0])
        }
        sum += differenceLines[0][0];
    }
    return sum;
}

console.log(part1(), part2());