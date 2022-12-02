const fs = require('fs');

let file = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });

file = file.replaceAll("A", "0")
    .replaceAll("B", "1")
    .replaceAll("C", "2")
    .replaceAll("X", "0")
    .replaceAll("Y", "1")
    .replaceAll("Z", "2")
    .replaceAll("\r", "")
    .split("\n");

let games = [];

for (let line of file) {
    games.push(line.split(" "));
}

function part1(game) {
    let score = 0;
    score += parseInt(game[1]) + 1;
    if (game[0] == game[1]) score += 3;
    else if ((parseInt(game[0]) + 1) % 3 == parseInt(game[1])) score += 6;
    else score += 0;
    return score;
}

function part2(game) {
    let choice;
    switch (game[1]) {
        case "0": // X
            choice = (parseInt(game[0]) + 2) % 3;
            break;
        case "1": // Y
            choice = parseInt(game[0]);
            break;
        case "2": // Z
            choice = (parseInt(game[0]) + 1) % 3;
            break;
    }
    return part1([game[0], choice]);
}

let sum1 = 0;
let sum2 = 0;
for (let game of games) {
    sum1 += part1(game);
    sum2 += part2(game);
}

console.log(sum1, sum2);