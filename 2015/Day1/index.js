const fs = require('fs');

let file = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });

function part1() {
    let floor = 0;
    for (let char of file) {
        if (char == "(") floor++;
        else if (char == ")") floor--;
    }
    return floor;
}

function part2() {
    let floor = 0;
    for (let i = 0; i < file.length; i++) {
        if (file[i] == "(") floor++;
        else if (file[i] == ")") floor--;

        if (floor == -1) return i+1;
    }
}

console.log(part1(), part2());