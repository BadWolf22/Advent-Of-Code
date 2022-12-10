console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let x = 1;
    let cycle = 0;
    let signals = [];
    let cycleNums = [20,60,100,140,180,220];
    for (let line of input) {
        cycle++;
        if (cycleNums.includes(cycle)) signals.push(cycle*x);
        if (line != "noop") {
            cycle++;
            if (cycleNums.includes(cycle)) signals.push(cycle*x);
            x+=parseInt(line.split(" ")[1]);
        }
    }
    sum = 0;
    signals.forEach(e=>sum+=e);
    return sum;
}

function part2() {
    formatFile();
    let row = "";
    let grid = [];
    let cycle = 0;
    let x = 1;
    for (let line of input) {
        cycle++;
        if (Math.abs(row.length-x) <= 1) row+="#";
        else row+=".";
        if (row.length == 40) {grid.push(row); row=""}
        if (line != "noop") {
            cycle++;
            if (Math.abs(row.length-x) <= 1) row+="#";
            else row+=".";
            if (row.length == 40) {grid.push(row); row=""}
            x+=parseInt(line.split(" ")[1]);
        }
    }
    return grid;
}

console.log(part1(), part2());