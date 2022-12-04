const fs = require('fs');

let file = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
file = file.replaceAll("\r","").split("\n");

for (let line in file) {
    let pair = file[line].split(",");
    for (let elf in pair) {
        let assignment = pair[elf].split("-");
        for (let i in assignment) {
            assignment[i] = parseInt(assignment[i]);
        }
        pair[elf] = assignment;
    }
    file[line] = pair;
}

function part1() {
    let fullOverlaps = 0;
    for (let pair of file) {
        if (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) fullOverlaps++;
        else if (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1]) fullOverlaps++;
    }
    return fullOverlaps;
}

function between(n, l, h) {
    return n>=l && n<=h;
}

function part2() {
    let overlaps = 0;
    for (let pair of file) {
        if (between(pair[0][0], pair[1][0], pair[1][1]) || between(pair[0][1], pair[1][0], pair[1][1])) overlaps++;
        else if (between(pair[1][0], pair[0][0], pair[0][1]) || between(pair[1][1], pair[0][0], pair[0][1])) overlaps++;
    }
    return overlaps;
}

console.log(part1(), part2());