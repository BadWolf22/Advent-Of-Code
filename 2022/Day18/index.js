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
    for (let line of input) {
        grid[line] = 0;
    }
    let connected = 0;
    let total = 0;
    for (let line of input) {
        let coords = line.split(",").map(e => parseInt(e));
        for (let i = 0; i < 3; i++) {
            for (let j = -1; j <= 1; j += 2) {
                let cp = [...coords];
                cp[i] += j;
                let key = cp.join(",");
                if (grid[key] != undefined) {
                    grid[line]++;
                    connected++;
                }
                total++;
            }
        }
    }
    return (total - connected);
}

function part2() {
    formatFile();
    let grid = {};
    let mins = [Infinity, Infinity, Infinity];
    let maxs = [0, 0, 0];
    for (let line of input) {
        let coords = line.split(",").map(e => parseInt(e));
        if (coords[0] < mins[0]) mins[0] = coords[0];
        if (coords[1] < mins[1]) mins[1] = coords[1];
        if (coords[2] < mins[2]) mins[2] = coords[2];
        if (coords[0] > maxs[0]) maxs[0] = coords[0];
        if (coords[1] > maxs[1]) maxs[1] = coords[1];
        if (coords[2] > maxs[2]) maxs[2] = coords[2];
        grid[line] = -1;
    }
    mins = mins.map(e => e - 1);
    maxs = maxs.map(e => e + 1);

    let q = [[...mins]];
    let connected = 0;
    while (q.length) {
        let curr = q.shift();
        let currKey = curr.join(",");
        if (grid[currKey] == undefined) grid[currKey] = 0;

        for (let i = 0; i < 3; i++) {
            for (let j = -1; j <= 1; j += 2) {
                let cp = [...curr];
                cp[i] += j;

                if (cp[i] < mins[i] || cp[i] > maxs[i]) continue;

                let key = cp.join(",");

                if (grid[key] == -1) {
                    grid[currKey]++;
                    connected++;
                } if (grid[key] == undefined) {
                    grid[key] = 0;
                    q.push(cp);
                }
            }
        }
    }

    return connected;
}

console.log(part1(), part2());