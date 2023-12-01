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
    let diags = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
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

    let tolabel = [];
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] == 0) {
                let adj = 0;
                for (let i = 0; i < 4; i++) {
                    let dx = x + dirs[i][0];
                    let dy = y + dirs[i][1];

                    if (shape[dy] == undefined) continue;
                    if (shape[dy][dx] == undefined) continue;

                    if (shape[dy][dx] != 0) adj++;
                }
                if (adj == 2) {
                    shape[y][x] = "i";
                    tolabel.push([x,y]);
                }
            }
        }
    }
    for (let labeling of tolabel) {
        label(labeling);
    }
        
    function label(first = undefined, second=undefined, name="i") {
        let ii = [];
        let allDirs = [dirs, diags];
        if (second == undefined) {
            for (let n = 0; n < 2; n++) {
                for (let i = 0; i < 4; i++) {
                    let dx = first[0] + allDirs[n][i][0];
                    let dy = first[1] + allDirs[n][i][1];

                    if (shape[dy] == undefined) continue;
                    if (shape[dy][dx] == undefined) continue;
                    if ([1,2,3,4,5,6].includes(shape[dy][dx])) continue;
                    
                    let adj = 0;
                    for (let j = 0; j < 4; j++) {
                        let dx1 = dx + allDirs[0][j][0];
                        let dy1 = dy + allDirs[0][j][1];
                        if (shape[dy1] == undefined) continue;
                        if (shape[dy1][dx1] == undefined) continue;
                        if ([1,2,3,4,5,6].includes(shape[dy1][dx1])) {
                            adj++;
                        }
                    }
                    if (adj == 1) {
                        ii.push([dx, dy]);
                        break;
                    }
                }
            }
        } else {
            let coords = [first, second];
            let chosen;
            for (let coord in coords) {
                for (let i = 0; i < 4; i++) {
                    let dx = coords[coord][0] + dirs[i][0];
                    let dy = coords[coord][1] + dirs[i][1];

                    if (shape[dy] == undefined) continue;
                    if (shape[dy][dx] == undefined) continue;
                    if (shape[dy][dx] != 0) continue;
                    if ([1,2,3,4,5,6].includes(shape[dy][dx])) continue;
                    
                    let adj = 0;
                    for (let j = 0; j < 4; j++) {
                        let dx1 = dx + allDirs[0][j][0];
                        let dy1 = dy + allDirs[0][j][1];
                        if (shape[dy1] == undefined) continue;
                        if (shape[dy1][dx1] == undefined) continue;
                        if ([1,2,3,4,5,6].includes(shape[dy1][dx1])) {
                            adj++;
                        }
                    }
                    if (adj == 1) {
                        ii.push([dx, dy]);
                        chosen = coord == "1" ? 0 : 1;
                        break;
                    }
                }
                if (chosen != undefined) break;
            }
            if (chosen == undefined) return;
            for (let i = 0; i < 4; i++) {
                let dx = coords[chosen][0] + diags[i][0];
                let dy = coords[chosen][1] + diags[i][1];

                if (shape[dy] == undefined) continue;
                if (shape[dy][dx] == undefined) continue;
                if (shape[dy][dx] != 0) continue;


                if ([1,2,3,4,5,6].includes(shape[dy][dx])) continue;
                
                let adj = 0;
                for (let j = 0; j < 4; j++) {
                    let dx1 = dx + dirs[j][0];
                    let dy1 = dy + dirs[j][1];
                    if (shape[dy1] == undefined) continue;
                    if (shape[dy1][dx1] == undefined) continue;
                    if ([1,2,3,4,5,6].includes(shape[dy1][dx1])) {
                        adj++;
                    }
                }
                if (adj == 1) {
                    ii.push([dx, dy]);
                    break;
                }
            }
        }
        if (ii.length == 2) {
            shape[ii[0][1]][ii[0][0]] = name+"i";
            shape[ii[1][1]][ii[1][0]] = name+"i";
            label(ii[0], ii[1], name+"i");
        }
    }
    

    return shape;
    // return 1000 * (pos[1]+1) + 4 * (pos[0]+1) + facing;
}

console.log(part1(), part2(4));