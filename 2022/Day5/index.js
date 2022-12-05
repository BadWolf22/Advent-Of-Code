const fs = require('fs');

let input;

let start, instructions, piles;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    start = [];
    instructions = [];
    piles = {};
    input = input.replaceAll("\r","").split("\n");
    let current = start;
    for (let line of input) {
        if (line == "") {
            current = instructions;
            continue;
        }
        current.push(line);
    }
    let pileNames = start[start.length-1];
    for (let i = start.length-2; i >= 0; i--) {
        for (let char in pileNames) {
            if (pileNames[char] != " ") {
                if (piles[pileNames[char]] == undefined) piles[pileNames[char]] = [];
                if (start[i][char] != " ") piles[pileNames[char]].push(start[i][char])
            }
        }
    }
}

function part1() {
    formatFile();
    for (let instruction of instructions) {
        instruction = instruction.split(" ");
        let amount = instruction[1];
        let from = instruction[3];
        let to = instruction[5];
        for (let i = 0; i < amount; i++) {
            piles[to].push(piles[from].pop());
        }
    }
    let answer = "";
    for (let pile of Object.keys(piles)) {
        answer += piles[pile][piles[pile].length-1];
    }
    return answer;
}

function part2() {
    formatFile();
    for (let instruction of instructions) {
        instruction = instruction.split(" ");
        let amount = instruction[1];
        let from = instruction[3];
        let to = instruction[5];
        temp = [];
        for (let i = 0; i < amount; i++) {
            temp.push(piles[from].pop());
        }
        while (temp.length > 0) piles[to].push(temp.pop());
    }
    let answer = "";
    for (let pile of Object.keys(piles)) {
        answer += piles[pile][piles[pile].length-1];
    }
    return answer;
}

console.log(part1(), part2());