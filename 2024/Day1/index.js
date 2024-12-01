console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
    input = input.map(row => row.split("   ").map(num => parseInt(num)));
}

function part1() {
    formatFile();
    var firstList = input.map(arr => arr[0]).sort();
    var secondList = input.map(arr => arr[1]).sort();
    var differences = firstList.map((val, i) => Math.abs(val - secondList[i]));
    console.log(differences.reduce((val, acc) => acc + val, 0))
}

function part2() {
    formatFile();
    var firstList = input.map(arr => arr[0]).sort();
    var secondList = input.map(arr => arr[1]).sort();
    var similarities = firstList.map(val => val * secondList.filter(val2 => val2 == val).length)
    console.log(similarities.reduce((val, acc) => acc + val, 0))
}

console.log(part1(), part2());