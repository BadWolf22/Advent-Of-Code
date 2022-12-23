console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r", "").split("\n");
}

function part1() {
    formatFile();
    let grid = {};
    let pos;
    let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    let chars = ">V<^";
    let widths = [];
    let facing = 0;
    for (let y = 0; y < input.length - 2; y++) {
        grid[y] = {};
        widths.push(input[y].length);
        for (let x = 0; x < input[y].length; x++) {
            if (pos == undefined && input[y][x] == ".") {
                pos = [x, y];
            }
            grid[y][x] = input[y][x];
        }
    }
    let dists = input[input.length - 1].split(/R|L/);
    let turns = input[input.length - 1].split(/[0-9]*/);

    // console.table(dists);
    // console.table(turns);

    for (let turn in turns) {
        // console.log(pos)
        if (turns[turn] == 'R') facing++;
        else if (turns[turn] == 'L') facing--;
        facing = (facing + 4) % 4;

        if (dists[turn] == undefined) break;

        for (let i = 0; i < parseInt(dists[turn]); i++) {
            let cp = [...pos];
            cp[0] += dirs[facing][0];
            cp[1] += dirs[facing][1];

            if (grid[cp[1]] == undefined || grid[cp[1]][cp[0]] == undefined || grid[cp[1]][cp[0]] == " ") {
                if (facing == 1) {
                    cp[1] = 0;
                    while (grid[cp[1]] == undefined || grid[cp[1]][cp[0]] == undefined || grid[cp[1]][cp[0]] == " ") cp[1]++;
                }
                else if (facing == 3) {
                    cp[1] = widths.length;
                    while (grid[cp[1]] == undefined || grid[cp[1]][cp[0]] == undefined || grid[cp[1]][cp[0]] == " ") cp[1]--;
                }
                else if (facing == 0) {
                    cp[0] = 0;
                    while (grid[cp[1]][cp[0]] == undefined || grid[cp[1]][cp[0]] == " ") cp[0]++;
                }
                else if (facing == 2) {
                    cp[0] = Math.max(...widths);
                    while (grid[cp[1]][cp[0]] == undefined || grid[cp[1]][cp[0]] == " ") cp[0]--;
                }
            }
            if (grid[cp[1]][cp[0]] == "#") {
                break;
            }
            pos = cp;
        }
    }
    // console.log(pos[0]+1, pos[1]+1, facing);
    return 1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + facing;
}

function part2(width) {
    formatFile();
    let grid = {};
    let pos;
    let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    let chars = ">V<^";
    let widths = [];
    let facing = 0;
    for (let y = 0; y < input.length - 2; y++) {
        grid[y] = {};
        widths.push(input[y].length);
        for (let x = 0; x < input[y].length; x++) {
            if (pos == undefined && input[y][x] == ".") {
                pos = [x, y];
            }
            grid[y][x] = input[y][x];
        }
    }
    let dists = input[input.length - 1].split(/R|L/);
    let turns = input[input.length - 1].split(/[0-9]*/);

    let shape = [];
    let num = 1;

    let cube = {
        "1": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
        },
        "2": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
        },
        "3": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
        },
        "4": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
        },
        "5": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
        },
        "6": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
        },
    }

    for (let y = 0; y < 4; y++) {
        if (grid[y * width] == undefined) break;
        shape.push([0]);
        for (let x = 0; x < 4; x++) {
            if (grid[y * width][x * width] != undefined && grid[y * width][x * width] != " ") {
                shape[y].push(num);
                num++;
            }
            else shape[y].push(0);
        }
        shape[y].push(0);
    }
    shape.unshift([0,0,0,0,0,0]);
    shape.push([0,0,0,0,0,0]);

    let rom = "i";

    for (let n = 0; n < 2; n++) {
        for (let row in shape) {
            for (let col in shape[row]) {
                let adj = 0;
                let first, second;
                for (let i = 0; i < 4; i++) {
                    let coord = [col, row].map(e=>parseInt(e));
                    coord[0] += dirs[i][0];
                    coord[1] += dirs[i][1];
                    if (shape[coord[1]] != undefined && shape[coord[1]][coord[0]] != undefined) {
                        if (shape[coord[1]][coord[0]] != 0) {
                            if (shape[row][col] == 0) {
                                adj++;
                                if (first == undefined) {
                                    first = [shape[coord[1]][coord[0]], i];
                                } else if (second == undefined) {
                                    second = [shape[coord[1]][coord[0]], i];
                                }
                            } else {
                                cube[shape[row][col]][i] = [shape[coord[1]][coord[0]], i];
                            }
                        }
                    }
                }
                if (adj == 2) {
                    // This means we are on a blank spot with 2 adjacent sides (case I)
                    shape[row][col] = rom;
                    // console.log(first, second)
                    // cube[first[0]][(first[1]+2)%4] = [second[0], second[1]];
                    // cube[second[0]][(second[1]+2)%4] = [first[0], first[1]];
                    
                    // let adj = 0;
                    // for (let i = 0; i < 4; i++) {
                    //     let coord = [col, row].map(e=>parseInt(e));
                    //     coord[0] += dirs[i][0];
                    //     coord[1] += dirs[i][1];

                    // }
                }
            }
        }
        rom += "i";
    }

    return shape;
    // return 1000 * (pos[1]+1) + 4 * (pos[0]+1) + facing;
}

console.log(part1(), part2(4));