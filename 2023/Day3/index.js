console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let found = {};
    let sum = 0;
    for (let row in input) {
        row = parseInt(row);
        let symbols = [...input[row].matchAll(/[^0-9.]/g)];
        for (let symbol of symbols) {
            let col = symbol.index;
            for (let i = -1; i <= 1; i++) {
                if (row+i < 0 || row+i >= input.length) continue;
                for (let j = -1; j <= 1; j++) {
                    if (col+j < 0 || col+j >= input[row].length) continue;
                    if (input[row+i][col+j].match(/[0-9]/g)) {
                        // Find whole number
                        let possibilities = [...input[row+i].matchAll(/[0-9]+/g)];
                        for (let possible of possibilities) {
                            if (col+j >= possible.index && col+j < possible.index+possible[0].length) {
                                if (found[`${possible.input}|${possible.index}`] == undefined) {
                                    sum += parseInt(possible[0]);
                                    found[`${possible.input}|${possible.index}`] = possible;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return sum
}

function part2() {
    formatFile();
    let sum = 0;
    for (let row in input) {
        row = parseInt(row);
        let gears = [...input[row].matchAll(/\*/g)];
        for (let gear of gears) {
            let col = gear.index;
            let found = {};
            for (let i = -1; i <= 1; i++) {
                if (row+i < 0 || row+i >= input.length) continue;
                for (let j = -1; j <= 1; j++) {
                    if (col+j < 0 || col+j >= input[row].length) continue;
                    if (input[row+i][col+j].match(/[0-9]/g)) {
                        // Find whole number
                        let possibilities = [...input[row+i].matchAll(/[0-9]+/g)];
                        for (let possible of possibilities) {
                            if (col+j >= possible.index && col+j < possible.index+possible[0].length) {
                                if (found[`${possible.input}|${possible.index}`] == undefined) {
                                    found[`${possible.input}|${possible.index}`] = possible;
                                }
                            }
                        }
                    }
                }
            }
            let keys = Object.getOwnPropertyNames(found);
            let ratio = 1;
            if (keys.length == 2) {
                for (let key of keys) {
                    ratio *= parseInt(found[key][0]);
                }
                sum += ratio;
            }
        }
    }
    return sum
}

console.log(part1(), part2());