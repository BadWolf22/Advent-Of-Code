console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let expanded = flip(expandRows(flip(expandRows(input))));
    let paths = {};
    for (let [y, row] of expanded.entries()) {
        for (let [x, char] of row.split("").entries()) {
            if (char == "#") {
                let distances = pathfind(expanded, [x,y]);
                for (let distance of Object.entries(distances)) {
                    if (paths[[[x,y], distance[0]]] || paths[[distance[0], [x,y]]]) continue; 
                    paths[[[x,y], distance[0]]] = distance[1];
                }
            }
        }
    }
    return Object.values(paths).reduce((a,b) => a+b);
}

function pathfind(grid, [origX,origY]) {
    let distances = {};
    for (let [y, row] of grid.entries()) {
        for (let [x, char] of row.split("").entries()) {
            if (char == "#") distances[[x,y]] = (Math.abs(origX-x) + Math.abs(origY-y));
        }
    }
    return distances;
}
function flip(grid) {
    let rotated = [];
    for (let char in grid[0]) {
        rotated.push(grid.map(e => e[char]).join(""));
    }
    return rotated;
}
function expandRows(grid) {
    let expanded = [];
    for (let line of grid) {
        expanded.push(line);
        if (line.match(/#/g) == null) expanded.push(line);
    }
    return expanded;
}

function part2() {
    formatFile();
    let expanded = flip(expandRows2(flip(expandRows2(input))));
    let paths = {};
    for (let [y, row] of expanded.entries()) {
        for (let [x, char] of row.split("").entries()) {
            if (char == "#") {
                let distances = pathfind2(expanded, [x,y]);
                for (let distance of Object.entries(distances)) {
                    if (paths[[[x,y], distance[0]]] || paths[[distance[0], [x,y]]]) continue; 
                    paths[[[x,y], distance[0]]] = distance[1];
                }
            }
        }
    }
    return Object.values(paths).reduce((a,b) => a+b);
}

function expandRows2(grid) {
    let expanded = [];
    for (let line of grid) {
        if (line.match(/#/g) == null) {
            expanded.push(line.replaceAll(".", "x"));
        } else {
            expanded.push(line);
        }
    }
    return expanded;
}
function pathfind2(grid, [origX,origY]) {
    let factor = 1000000;
    let distances = {};
    for (let [y, row] of grid.entries()) {
        for (let [x, char] of row.split("").entries()) {
            if (char != "#") continue;
            let distance = 0;
            for (let i = Math.min(origX, x); i < Math.max(origX, x); i++) {
                if (grid[y][i] == "x") distance += factor;
                else distance++;
            }
            for (let i = Math.min(origY, y); i < Math.max(origY, y); i++) {
                if (grid[i][x] == "x") distance += factor;
                else distance++;
            }
            distances[[x,y]] = distance;
        }
    }
    return distances;
}

console.log(part1(), part2());