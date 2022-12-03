const fs = require('fs');

let file = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });

file = file.replaceAll("\r", "").split("\n")

let elves = [0];

for (let line of file) {
    if (line == "") elves.push(0);
    else elves[elves.length-1] += parseInt(line);
}

function getHighest(n) {
    let elvesCopy = [...elves];
    let highest = [];
    for (let i = 0; i < n; i++) {
        let curr = Math.max(...elvesCopy);
        highest.push(curr);
        let index = elvesCopy.indexOf(curr);
        elvesCopy.splice(index, 1);
    }
    let sum = 0;
    for (let i of highest) sum += i;
    return sum;
}

console.log(getHighest(3));