console.clear();
const { log } = require('console');
const fs = require('fs');

let clockwiseTurns = ["UR", "RD", "DL", "LU"];

function formatFile() {
    let raw = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    let rows = raw.replaceAll("\r","").split("\n");

    return rows;
}

function decideIfClockwise(rows = []) {
    let turns = [];
    let dirs = rows.map(row => row.split(" ")[0]);
    for (let i = 0; i < dirs.length; i++) {
        turns.push(dirs[i] + dirs[(i+1)%dirs.length])
    }
    turns = turns.map(turn => clockwiseTurns.includes(turn));
    let rightMinusLeft = turns.filter(turn => turn == true).length - turns.filter(turn => turn == false).length
    return rightMinusLeft > 0;
}

class Tracker {
    val = ".";
    outsideWalls = [];
    floodFilled = false;

    dig() {
        this.val = "#";
    }

    isDug() {
        return this.val == "#";
    }

    setOutsideWall(dir) {
        this.outsideWalls.push(dir);
    }
}

class Map {
    map = [[new Tracker()]];
    x = 0;
    y = 0;
    isClockwise;

    constructor(clockwise) {
        this.isClockwise = clockwise;
    }

    dig() {
        this.map[this.y][this.x].dig();
    }

    markOutsideWall(dir) {
        let opts;
        if (this.isClockwise) {
            opts = {
                "U": "R",
                "R": "D",
                "D": "L",
                "L": "U",
            }
        }
        if (!this.isClockwise) {
            opts = {
                "U": "L",
                "R": "U",
                "D": "R",
                "L": "D",
            }
        }
        this.map[this.y][this.x].setOutsideWall(opts[dir]);
    }

    execute(command) {
        let [dir, count, color] = command.split(" ");
        for (let i = 0; i < parseInt(count); i++) {
            this.dig();
            this.markOutsideWall(dir);
            if (dir == "U") this.moveU();
            if (dir == "R") this.moveR();
            if (dir == "D") this.moveD();
            if (dir == "L") this.moveL();
            this.dig();
            this.markOutsideWall(dir);
        }
    }

    moveD() {
        this.y++;
        if (this.y >= this.map.length) {
            let newRow = [];
            for (let i = 0; i < this.map[0].length; i++) {
                newRow.push(new Tracker());
            }
            this.map.push(newRow);
        }
    }

    moveR() {
        this.x++;
        if (this.x >= this.map[0].length) {
            for (let row of this.map) {
                row.push(new Tracker());
            }
        }
    }

    moveU() {
        this.y--;
        if (this.y < 0) {
            let newRow = [];
            for (let i = 0; i < this.map[0].length; i++) {
                newRow.push(new Tracker());
            }
            this.map.unshift(newRow);
            this.y++;
        }
    }

    moveL() {
        this.x--;
        if (this.x < 0) {
            for (let row of this.map) {
                row.unshift(new Tracker());
            }
            this.x++;
        }
    }

    floodFill() {
        let initial = {x:0, y:0};
        for (let i = 0; i < this.map[0].length; i++) {
            initial.x = i;
            if (this.map[initial.y][initial.x].isDug()) break;
        }
        let q = [initial];
        while (q.length) {
            let curr = q.shift();

            if (curr.y < 0 || curr.y >= this.map.length) continue;
            if (curr.x < 0 || curr.x >= this.map[0].length) continue;

            let tile = this.map[curr.y][curr.x];
            if (!tile.floodFilled) {
                let dirs = {
                    U: {x:curr.x, y:curr.y-1},
                    R: {x:curr.x+1, y:curr.y},
                    D: {x:curr.x, y:curr.y+1},
                    L: {x:curr.x-1, y:curr.y},
                }
                for (let outsideWall of tile.outsideWalls) {
                    delete dirs[outsideWall];
                }
                q.push(...Object.values(dirs));
                tile.floodFilled = true;
                tile.dig();
            }
        }
    }

    getDisplay() {
        let str = this.map.map(row => row.map(tracker => tracker.val).join("")).join("\n");
        return str;
    }
}

function part1() {
    let rows = formatFile();
    let isClockwise = decideIfClockwise();
    let map = new Map(isClockwise);
    
    for (let row of rows) {
        map.execute(row);
    }

    map.floodFill();
    // console.log(map.getDisplay());
    return map.getDisplay().match(/#/g).length;
}

function part2() {
    let rows = formatFile();
    let isClockwise = decideIfClockwise();
    let dirs = ["R","D","L","U"];
    
    rows = rows.map(row => {
        let instruction = row.split(" ")[2].split("#")[1].split(")")[0];
        let dir = dirs[parseInt(instruction[instruction.length-1])];
        let count = Number("0x"+instruction.substr(0, 5));
        return {original: row, dir, count};
    });

    console.log(Math.max(...rows.map(row => row.count)))
    console.log(Math.min(...rows.map(row => row.count)))
}

console.log(part1(), part2());