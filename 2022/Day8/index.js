console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let visibleTrees = 0;
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (row % (input.length-1) == 0) visibleTrees++;
            else if (col % (input[row].length-1) == 0) visibleTrees++;
            else if (isVisible(row, col)) visibleTrees++;
        }
    }
    return visibleTrees;
}

function isVisible(row, col) {
    let dirs = [[0,1],[1,0],[0,-1],[-1,0]];
    for (let dir of dirs) {
        if (checkDir(row, col, dir)) return true;
    }
}

function checkDir(row, col, dir) {
    let i = row, j = col;
    while (i % (input.length-1) != 0 && j % (input[row].length-1) != 0) {
        i += dir[0];
        j += dir[1];
        if (input[i][j] >= input[row][col]) return false;
    }
    return true;
}

function part2() {
    formatFile();
    let scores = [];
    for (let row = 0; row < input.length; row++) {
        scores.push([]);
        for (let col = 0; col < input[row].length; col++) {
            scores[row].push(calculateScenic(row, col));
        }
    }
    let largest = 0;
    for (let row of scores) {
        for (let col of row) {
            if (col > largest) largest = col;
        }
    }
    return largest;
}

function calculateScenic(row, col) {
    let dirs = [[0,1],[1,0],[0,-1],[-1,0]];
    let score = 1;
    for (let dir of dirs) {
        score *= numVisible(row, col, dir);
    }
    return score;
}

function numVisible(row, col, dir) {
    let i = row, j = col;
    let numVisible = 0;
    while (i % (input.length-1) != 0 && j % (input[row].length-1) != 0) {
        i += dir[0];
        j += dir[1];
        if (input[i][j] < input[row][col]) {
            numVisible++;
        } else if (input[i][j] >= input[row][col]) {
            numVisible++;
            break;
        }
    }
    return numVisible;
}

console.log(part1(), part2());