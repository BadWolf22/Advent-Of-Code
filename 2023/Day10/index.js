console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("sample2.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r", "").split("\n");
}

function part1() {
    formatFile();
    let [starting, tiles] = connectTiles();
    let q = [starting];
    while (q.length != 0) {
        const curr = q.shift();
        for (connected of tiles[curr]) {
            if (tiles[connected].distance == undefined) {
                q.push(connected);
                tiles[connected].distance = tiles[curr].distance + 1;
            }
        }
    }
    return Math.max(...Object.values(tiles).map(e => e.distance).filter(e => e!=undefined));
}

function connectTiles() {
    let tiles = {};
    let starting;
    for (let [y, line] of input.entries()) {
        for (let [x, tile] of line.split("").entries()) {
            let connected = [];
            switch (tile) {
                case ".": {
                    connected.shape = ".";
                    break;
                } case "|": {
                    connected.push(`${x},${y-1}`);
                    connected.push(`${x},${y+1}`);
                    connected.shape = "|";
                    break;
                } case "-": {
                    connected.push(`${x-1},${y}`);
                    connected.push(`${x+1},${y}`);
                    connected.shape = "-";
                    break;
                } case "L": {
                    connected.push(`${x},${y-1}`);
                    connected.push(`${x+1},${y}`);
                    connected.shape = "L";
                    break;
                } case "J": {
                    connected.push(`${x},${y-1}`);
                    connected.push(`${x-1},${y}`);
                    connected.shape = "J";
                    break;
                } case "7": {
                    connected.push(`${x-1},${y}`);
                    connected.push(`${x},${y+1}`);
                    connected.shape = "7";
                    break;
                } case "F": {
                    connected.push(`${x+1},${y}`);
                    connected.push(`${x},${y+1}`);
                    connected.shape = "F";
                    break;
                } case "S": {
                    connected.shape = "S";
                    connected.distance = 0;
                    starting = `${x},${y}`;
                    break;
                }
            }
            tiles[x + "," + y] = connected;
        }
    }
    for (let [key, tile] of Object.entries(tiles)) {
        for (const connected of tile) {
            if (tiles[connected]?.shape == "S") tiles[connected].push(key);
        }
    }
    return [starting, tiles];
}

function part2() {
    formatFile();
    let [starting, tiles] = connectTiles();
}

console.log(part1(), part2());