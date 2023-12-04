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
    for (let line of input) {
        let value = 0;
        let data = line.split(": ")[1];
        let winning = data.split(" | ")[0].replaceAll("  ", " ").trim().split(" ").map(e => parseInt(e));
        let ourNums = data.split(" | ")[1].replaceAll("  ", " ").trim().split(" ").map(e => parseInt(e));
        for (let winningNum of winning) {
            if (ourNums.includes(winningNum)) {
                if (value == 0) value = 1;
                else value *= 2;
            }
        }
        sum += value;
    }
    return sum;
}

function part2() {
    formatFile();
    let numScratchers = 0;
    let scratchers = { };
    for (let line of input) {
        let numMatching = 0;
        let data = line.split(": ")[1];
        let winning = data.split(" | ")[0].replaceAll("  ", " ").trim().split(" ").map(e => parseInt(e));
        let ourNums = data.split(" | ")[1].replaceAll("  ", " ").trim().split(" ").map(e => parseInt(e));
        for (let winningNum of winning) {
            if (ourNums.includes(winningNum)) numMatching++;
        }
        let id = line.split(":")[0].match(/[0-9]+/g);
        scratchers[id] = {winning: numMatching, copies: 1};
    }
    for (let key of Object.getOwnPropertyNames(scratchers)) {
        for (let copy = 0; copy < scratchers[key].copies; copy++) {
            for (let i = 1; i <= scratchers[key].winning; i++) {
                scratchers[parseInt(key)+i].copies++;
            }
        }
    }
    for (let key of Object.getOwnPropertyNames(scratchers)) {
        numScratchers += scratchers[key].copies;
    }
    return numScratchers;
}

console.log(part1(), part2());