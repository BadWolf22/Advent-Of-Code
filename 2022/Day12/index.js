console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1(x=undefined, y=undefined) {
    formatFile();
    // let x, y;
    let grid = [];
    for (let i in input) {
        grid.push([]);
        for (let j in input[i]) {
            grid[i].push(-1);
            if (input[i][j] == "S" && x == undefined) {
                if (x==undefined) {
                    x = parseInt(j);
                    y = parseInt(i);
                }
            }
        }
    }
    grid[y][x] = 0;
    let q = [];
    q.push([x, y]);
    while (q.length) {
        let curr = q.shift();
        let currX = curr[0];
        let currY = curr[1];
        let dirs = [[0,1], [1,0], [0,-1], [-1,0]];
        let currE = input[currY].charCodeAt(currX) - 96;
        if (input[currY][currX] == "S") currE = 1;
        for (let dir of dirs) {
            let nextX = currX+dir[0];
            let nextY = currY+dir[1];
            if (input[nextY] == undefined) continue;
            if (input[nextY][nextX] == undefined) continue;
            let nextE = input[nextY].charCodeAt(nextX) - 96;
            if (input[nextY][nextX] == "E") nextE = 26;

            if (grid[nextY][nextX] != -1) continue;
            if (nextE-currE > 1) continue;
            grid[nextY][nextX] = grid[currY][currX] + 1;
            if (input[nextY][nextX] == "E") return grid[nextY][nextX];
            q.push([nextX, nextY]);
        }
    }
    return Infinity;
}

function part2() {
    let dists = [part1()];

    for (let i in input) {
        for (let j in input[i]) {
            if (input[i][j] == "a") {
                dists.push(part1(parseInt(j),parseInt(i)));
            }
        }
    }

    return Math.min(...dists);
}

console.log(part1(), part2());