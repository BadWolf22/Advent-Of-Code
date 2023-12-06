console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].replaceAll(/ +/g, " ");
        input[i] = input[i].split(" ");
        input[i].shift();
    }
    let product = 1;
    for (let race = 0; race < input[0].length; race++) {
        let waysToWin = 0;
        let timeLimit = parseInt(input[0][race]);
        let goal = parseInt(input[1][race]);
        for (let i = 0; i < timeLimit; i++) {
            let distance = i * (timeLimit - i);
            if (distance > goal) {
                waysToWin++;
            }
        }
        product *= waysToWin;
    }
    return product;
}

function part2() {
    formatFile();
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].replaceAll(/ +/g, "");
        input[i] = input[i].split(":");
        input[i].shift();
    }
    let product = 1;
    for (let race = 0; race < input[0].length; race++) {
        let waysToWin = 0;
        let timeLimit = parseInt(input[0][race]);
        let goal = parseInt(input[1][race]);
        for (let i = 0; i < timeLimit; i++) {
            let distance = i * (timeLimit - i);
            if (distance > goal) {
                waysToWin++;
            }
        }
        product *= waysToWin;
    }
    return product;
}

console.log(part1(), part2());