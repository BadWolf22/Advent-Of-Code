console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let includedCubes = { red: 12, green: 13, blue: 14 };
    let sum = 0;
    for (let line of input) {
        let valid = true;
        for (let color of Object.getOwnPropertyNames(includedCubes)) {
            [...line.matchAll(new RegExp(`[0-9]+ ${color}`, `g`))].forEach(e => {
                if (parseInt(e) > includedCubes[color]) {
                    valid = false;
                }
            });
        }
        if (valid) sum += parseInt(line.split(":")[0].split(" ")[1]);
        else continue;
    }
    return sum;
}

function part2() {
    formatFile();
    let sum = 0;
    for (let line of input) {
        let mins = { red: 0, green: 0, blue: 0 };
        for (let color of Object.getOwnPropertyNames(mins)) {
            mins[color] = Math.max(...[...line.matchAll(new RegExp(`[0-9]+ ${color}`, `g`))].map(e => parseInt(e)));
        }
        sum += mins.red * mins.green * mins.blue;
    }
    return sum;
}

console.log(part1(), part2());