const fs = require('fs');

let file = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });

// file = file.replaceAll("\r","").split("\n");

function part1() {
    let x = 0;
    let y = 0;
    let tracker = {"0:0":1};
    for (let char of file) {
        if (char == "<") x--;
        if (char == "^") y++;
        if (char == ">") x++;
        if (char == "v") y--;
        if (tracker[`${x}:${y}`] != undefined) {
            tracker[`${x}:${y}`]++;
        } else {
            tracker[`${x}:${y}`] = 1;
        }
    }
    return Object.keys(tracker).length;
}

function part2() {
    let robo = false;
    let pos1 = [0, 0];
    let pos2 = [0, 0];
    let tracker = {"0:0":2};
    for (let char of file) {
        let mover = pos1;
        if (robo) {
            mover = pos2;
        }
        robo = !robo;

        if (char == "<") mover[0]--;
        if (char == "^") mover[1]++;
        if (char == ">") mover[0]++;
        if (char == "v") mover[1]--;
        if (tracker[`${mover[0]}:${mover[1]}`] != undefined) {
            tracker[`${mover[0]}:${mover[1]}`]++;
        } else {
            tracker[`${mover[0]}:${mover[1]}`] = 1;
        }
    }
    return Object.keys(tracker).length;
}

console.log(part1(), part2());