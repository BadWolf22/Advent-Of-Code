const fs = require('fs');

let file = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });

file = file.replaceAll("\r","").split("\n");

function part1() {
    let squareFeet = 0;
    for (let present of file) {
        let dims = present.split("x");
        let side1 = dims[0]*dims[1];
        let side2 = dims[1]*dims[2];
        let side3 = dims[0]*dims[2];
        squareFeet += 2*(side1 + side2 + side3);
        squareFeet += Math.min(side1, side2, side3);
    }
    return squareFeet;
}

function part2() {
    let feet = 0;
    for (let present of file) {
        let dims = present.split("x");
        let side1 = 2*(parseInt(dims[0])+parseInt(dims[1]));
        let side2 = 2*(parseInt(dims[1])+parseInt(dims[2]));
        let side3 = 2*(parseInt(dims[0])+parseInt(dims[2]));
        feet += Math.min(side1, side2, side3);
        feet += dims[0]*dims[1]*dims[2];
    }
    return feet;
}

console.log(part1(), part2());