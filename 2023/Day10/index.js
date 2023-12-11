console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
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
    return Math.max(...Object.values(tiles).map(e => e.distance).filter(e => e != undefined));
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
                    connected.push(`${x},${y - 1}`);
                    connected.push(`${x},${y + 1}`);
                    connected.shape = "|";
                    break;
                } case "-": {
                    connected.push(`${x - 1},${y}`);
                    connected.push(`${x + 1},${y}`);
                    connected.shape = "-";
                    break;
                } case "L": {
                    connected.push(`${x},${y - 1}`);
                    connected.push(`${x + 1},${y}`);
                    connected.shape = "L";
                    break;
                } case "J": {
                    connected.push(`${x},${y - 1}`);
                    connected.push(`${x - 1},${y}`);
                    connected.shape = "J";
                    break;
                } case "7": {
                    connected.push(`${x - 1},${y}`);
                    connected.push(`${x},${y + 1}`);
                    connected.shape = "7";
                    break;
                } case "F": {
                    connected.push(`${x + 1},${y}`);
                    connected.push(`${x},${y + 1}`);
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

const NORMALS = {
    "L": "NE",
    "F": "SE",
    "7": "SW",
    "J": "NW"
}

function part2() {
    formatFile();
    let [starting, tiles] = connectTiles();
    let q = [starting];

    // Decide the normal of "S" because shape is unknown
    let [x, y] = starting.split(",");
    let dir = "";
    dir += tiles[starting].includes(`${x},${y + 1}`) ? "N" : "S";
    dir += tiles[starting].includes(`${x + 1},${y}`) ? "W" : "E";
    tiles[starting].surfaceNorm = dir;

    while (q.length != 0) {
        const curr = q.pop();
        if (tiles[curr].shape && NORMALS[tiles[curr].shape]) tiles[curr].surfaceNorm = NORMALS[tiles[curr].shape];
        for (connected of tiles[curr]) {
            if (tiles[connected].distance == undefined) {
                q.push(connected);
                tiles[connected].distance = tiles[curr].distance + 1;
                if (tiles[connected]?.shape == "-") tiles[connected].surfaceNorm = tiles[curr].surfaceNorm.match(/[NS]/g)[0];
                if (tiles[connected]?.shape == "|") tiles[connected].surfaceNorm = tiles[curr].surfaceNorm.match(/[EW]/g)[0];
                if (curr == starting) break;
            }
        }
    }

    // Guess whether a normal points to the inside or not
    tiles[starting].inside = true;
    const surfNorms = Object.entries(tiles).filter(e => e[1].surfaceNorm != undefined).sort((a, b) => a[1].distance < b[1].distance ? -1 : 1);
    for (let i = 1; i < surfNorms.length; i++) {
        if (surfNorms[i][1].surfaceNorm.match(new RegExp(`[${surfNorms[i - 1][1].surfaceNorm}]`, 'g')) == null) surfNorms[i][1].inside = !surfNorms[i - 1][1].inside;
        else surfNorms[i][1].inside = surfNorms[i - 1][1].inside;
    }

    // Decide whether .inside actually points to the inside lol
    if (surfNorms.map(e => e[1].inside).filter(e => e == true).length < surfNorms.length / 2) {
        surfNorms.forEach(e => e[1].inside = !e[1].inside);
    }

    // This gives the right number for the samples, but not the input

    let numInside = 0;
    // Find the closest surfaceNorm
    for (let [y, row] of input.entries()) {
        for (let [x, char] of row.split("").entries()) {
            if (tiles[[x, y]].distance != undefined) continue;
            // This is very slow lol
            let normsByDist = surfNorms.map(norm => {
                let [normX, normY] = norm[0].split(",");
                let distance = Math.abs(normX - x) + Math.abs(normY - y);
                return { distance, inside: norm[1].inside, coord: norm[0], surfaceNorm: norm[1].surfaceNorm };
            }).sort((a, b) => a.distance < b.distance ? -1 : 1);
            let closest = normsByDist[0];
            let [origX, origY] = closest.coord.split(",").map(e => parseInt(e));
            let comingFrom = "";
            if (origY - y > 0) comingFrom += "N";
            if (origY - y < 0) comingFrom += "S";
            if (origX - x > 0) comingFrom += "W";
            if (origX - x < 0) comingFrom += "E";
            let dirMatch = comingFrom.match(new RegExp(`[${closest.surfaceNorm}]`, 'g'));
            if ((dirMatch != null && closest.inside) || dirMatch == null && !closest.inside) {
                numInside++;
            }
        }
    }
    return numInside;
}

console.log(part1(), part2());