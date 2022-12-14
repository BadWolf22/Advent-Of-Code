console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    // formatFile();
    let grid = {};
    for (let line of input) {
        let rocklines = line.split(" -> ");
        for (let i = 0; i < rocklines.length-1; i++) {
            let start = rocklines[i].split(",");
            let end = rocklines[i+1].split(",");
            for (let x = 0; x <= Math.abs(parseInt(start[0])-parseInt(end[0])); x++) {
                for (let y = 0; y <= Math.abs(parseInt(start[1])-parseInt(end[1])); y++) {
                    let xOff = x + Math.min(parseInt(start[0]),parseInt(end[0]));
                    let yOff = y + Math.min(parseInt(start[1]),parseInt(end[1]));
                    grid[[xOff,yOff].join(",")] = "#";
                }
            }
        }
    }

    let go = true;
    while (go) {
        let start = [500, 0];
        while (1) {
            if (start[1] > 1000 || grid[start.join(",")] != undefined) {
                go = false;
                break;
            }
            // down
            start[1]++;
            if (grid[start.join(",")] == undefined) continue;
            // left
            start[0]--;
            if (grid[start.join(",")] == undefined) continue;
            // right
            start[0]+=2;
            if (grid[start.join(",")] == undefined) continue;
            // stationary
            start[0]--;
            start[1]--;
            grid[start.join(",")] = "o";
            break;
        }
    }

    let count = 0;
    for (let key of Object.keys(grid)) {
        if (grid[key] == "o") count++;
    }

    return count;
}

function part2() {
    let ys = [];
    for (let line of input) {
        let rocklines = line.split(" -> ");
        for (let i = 0; i < rocklines.length-1; i++) {
            let start = rocklines[i].split(",");
            let end = rocklines[i+1].split(",");
            for (let y = 0; y <= Math.abs(parseInt(start[1])-parseInt(end[1])); y++) {
                let yOff = y + Math.min(parseInt(start[1]),parseInt(end[1]));
                ys.push(yOff);
            }
        }
    }
    input.push(`0,${Math.max(...ys)+2} -> 1000,${Math.max(...ys)+2}`);
    return part1();
}

formatFile();
console.log(part1(), part2());