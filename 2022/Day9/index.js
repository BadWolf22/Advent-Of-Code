console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

let dirs = {
    "R":[1,0],
    "U":[0,1],
    "L":[-1,0],
    "D":[0,-1],
}

function part1() {
    formatFile();
    let hPos = [0,0];
    let tPos = [0,0];
    let visited = {
        "0, 0":1
    }
    for (let line of input) {
        let parsed = line.split(" ");
        let dir = dirs[parsed[0]];
        for (let i = 0; i < parseInt(parsed[1]); i++) {
            hPos[0] += dir[0];
            hPos[1] += dir[1];
            let xDist = hPos[0]-tPos[0];
            let yDist = hPos[1]-tPos[1];
            if (hPos[0] == tPos[0] || hPos[1] == tPos[1]) {
                if (Math.abs(xDist)>1) tPos[0] += xDist>0?1:-1 * 1;
                if (Math.abs(yDist)>1) tPos[1] += yDist>0?1:-1 * 1;
            } else if (Math.abs(xDist) > 1 || Math.abs(yDist) > 1) {
                tPos[0] += xDist>0?1:-1 * 1;
                tPos[1] += yDist>0?1:-1 * 1;
            }
            if (visited[`${tPos[0]}, ${tPos[1]}`] == undefined) {
                visited[`${tPos[0]}, ${tPos[1]}`] = 1;
            } else {
                visited[`${tPos[0]}, ${tPos[1]}`]++;
            }
        }
    }
    return Object.keys(visited).length;
}

function part2(len) {
    formatFile();
    let knots = [];
    for (let i = 0; i < len; i++) {
        knots.push([0,0]);
    }
    let visited = {
        "0, 0":1
    }

    for (let line of input) {
        let parsed = line.split(" ");
        let dir = dirs[parsed[0]];
        for (let i = 0; i < parseInt(parsed[1]); i++) {
            for (let j = 0; j < knots.length-1; j++) {
                let hPos = knots[j];
                if (j == 0) {
                    hPos[0] += dir[0];
                    hPos[1] += dir[1];
                }
                let tPos = knots[j+1];
                let xDist = hPos[0]-tPos[0];
                let yDist = hPos[1]-tPos[1];
                if (hPos[0] == tPos[0] || hPos[1] == tPos[1]) {
                    if (Math.abs(xDist)>1) tPos[0] += xDist>0?1:-1 * 1;
                    if (Math.abs(yDist)>1) tPos[1] += yDist>0?1:-1 * 1;
                } else if (Math.abs(xDist) > 1 || Math.abs(yDist) > 1) {
                    tPos[0] += xDist>0?1:-1 * 1;
                    tPos[1] += yDist>0?1:-1 * 1;
                }
            }
            let tail = knots[knots.length-1];
            if (visited[`${tail[0]}, ${tail[1]}`] == undefined) {
                visited[`${tail[0]}, ${tail[1]}`] = 1;
            } else {
                visited[`${tail[0]}, ${tail[1]}`]++;
            }
        }
    }
    return Object.keys(visited).length;
}

console.log(part1(), part2(10));