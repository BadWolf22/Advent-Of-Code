console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r", "").split("\n");
}

const dirs = {
    "→": { x: 1, y: 0, "\\": "↓", "/": "↑", "|": "↑↓" },
    "↓": { x: 0, y: 1, "\\": "→", "/": "←", "-": "→←" },
    "←": { x: -1, y: 0, "\\": "↑", "/": "↓", "|": "↑↓" },
    "↑": { x: 0, y: -1, "\\": "←", "/": "→", "-": "→←" }
};

function part1() {
    formatFile();

    let start = { x: -1, y: 0, dir: "→" };
    return runTrail(start);
}

function runTrail(start) {
    let trails = [start];
    let grid = input.map(e => e.split("").map(e2 => ({ "symbol": e2, "paths": [] })));

    while (trails.length) {
        let curr = trails.pop();
        while (true) {
            curr.x += dirs[curr.dir].x;
            curr.y += dirs[curr.dir].y;
            if (!grid[curr.y] || !grid[curr.y][curr.x]) break;
            let gridPos = grid[curr.y][curr.x];
            if (gridPos.paths.includes(curr.dir)) break;
            gridPos.paths.push(curr.dir);
            if (dirs[curr.dir][gridPos.symbol] != undefined) {
                for (let newDir of dirs[curr.dir][gridPos.symbol]) {
                    trails.push({ x: curr.x, y: curr.y, dir: newDir })
                }
                break;
            }
        }
    }
    let passedTilesPerRow = grid.map(e => e.filter(sub => sub.paths.length).length);
    return passedTilesPerRow.reduce((a,b) => a+b);
}

function part2() {
    formatFile();

    let illuminedTiles = [];

    for (let i = 0; i < input.length; i++) {
        let start = { x: -1, y: i, dir: "→" };
        illuminedTiles.push(runTrail(start));

        let start2 = { x: input[0].length, y: i, dir: "←" };
        illuminedTiles.push(runTrail(start2));
    }
    for (let i = 0; i < input[0].length; i++) {
        let start = { x: i, y: -1, dir: "↓" };
        illuminedTiles.push(runTrail(start));

        let start2 = { x: i, y: input.length, dir: "↑" };
        illuminedTiles.push(runTrail(start2));
    }

    return Math.max(...illuminedTiles);
}

console.log(part1(), part2());