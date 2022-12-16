console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r", "").split("\n");
}

function part1(y) {
    formatFile();
    let grid = {};
    let count = 0;
    for (let line of input) {
        line = line.split("Sensor at ")[1];
        line = line.split(": closest beacon is at ");
        line[0] = line[0].replaceAll("=", "S=");
        line[1] = line[1].replaceAll("=", "B=");

        let xS, yS, xB, yB;
        eval(line[0]);
        eval(line[1]);

        grid[`${xS},${yS}`] = "S";
        grid[`${xB},${yB}`] = "B";

        let dist = Math.abs(xS - xB) + Math.abs(yS - yB);
        for (let i = xS - dist; i < xS + dist; i++) {
            let currD = Math.abs(xS - i) + Math.abs(yS - y);
            if (currD <= dist) {
                if (grid[`${i},${y}`] == undefined) {
                    grid[`${i},${y}`] = "#";
                    count++;
                }
            }
        }
    }
    return count;
}

function part2(range) {
    formatFile();

    let grid = {};
    for (let line of input) {
        line = line.split("Sensor at ")[1];
        line = line.split(": closest beacon is at ");
        line[0] = line[0].replaceAll("=", "S=");
        line[1] = line[1].replaceAll("=", "B=");

        let xS, yS, xB, yB;
        eval(line[0]);
        eval(line[1]);

        let dist = Math.abs(xS - xB) + Math.abs(yS - yB);
        grid[`${xS},${yS}`] = dist;
        grid[`${xB},${yB}`] = "B";
    }
    for (let key of Object.keys(grid)) {
        if (typeof grid[key] != "number") continue;
        let radius = grid[key]+1
        let [x,y] = key.split(",");
        x = parseInt(x);
        y = parseInt(y);
        for (let posX = radius; posX>=0; posX--) {
            let posY = radius-posX;
            
            let checks = [
                [x+posX, y+posY],
                [x+posX, y-posY],
                [x-posX, y+posY],
                [x-posX, y-posY],
            ];

            for (let check of checks) {
                if (check[0] < 0 || check[0] > range) continue;
                if (check[1] < 0 || check[1] > range) continue;
                // console.log(check)
                let tooClose = false;
                for (let key2 of Object.keys(grid)) {
                    if (key == key2) continue;
                    let [x,y] = key2.split(",");
                    x = parseInt(x);
                    y = parseInt(y);
                    let dist = Math.abs(x - check[0]) + Math.abs(y - check[1]);
                    if (dist <= grid[key2]) {
                        tooClose = true;
                        break;
                    }
                }
                if (!tooClose) return check[0]*4000000+check[1];
            }
        }
    }
}

console.time("Part1");
console.time("Total");
console.log(part1(2000000));
console.timeEnd("Part1");
console.time("Part2");
console.log(part2(4000000));
console.timeEnd("Part2");
console.timeEnd("Total");