console.clear();
const fs = require('fs');

class CityBlock {
    constructor(val) {
        this.val = parseInt(val);
        this.horizMin = Infinity;
        this.vertiMin = Infinity;
    }
}

function formatFile() {
    let raw = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    let rows = raw.replaceAll("\r","").split("\n");
    let cityBlocks = rows.map(row => row.split("").map(val => new CityBlock(val)));
    
    let width = cityBlocks[0].length;
    let height = cityBlocks.length;
    let target = cityBlocks[height-1][width-1];
    target.horizMin = target.val;
    target.vertiMin = target.val;

    return cityBlocks;
}

function getOffsets(min, max) {
    let offsets = [];
    [-1,1].forEach(daSign => {
        for (let i = max; i >= min; i--) {
            let offsetSet = [];
            for (let j = i; j >= 0; j--) {
                offsetSet.push(daSign*j);
            }
            offsets.push(offsetSet);
        }
    })
    return offsets;
}

function solve(offsets) {
    var cityBlocks = formatFile();
    let width = cityBlocks[0].length;
    let height = cityBlocks.length;

    while (true) {
        let someValueUpdated = false;
        for (let x = width-1; x >= 0; x--) {
            for (let y = height-1; y >= 0; y--) {
                let curr = cityBlocks[y][x];
                let copy = {...curr};
                curr.horizMin = getHorizMin(x, y, offsets, cityBlocks);
                curr.vertiMin = getVertiMin(x, y, offsets, cityBlocks);
                if (curr.horizMin != copy.horizMin || curr.vertiMin != copy.vertiMin)
                    someValueUpdated = true;
            }
        }
        if (!someValueUpdated)
            break;
    }

    let start = cityBlocks[0][0];
    return Math.min(start.horizMin, start.vertiMin) - start.val;
}

function getHorizMin(x, y, offsets, cityBlocks) {
    let width = cityBlocks[0].length;
    let height = cityBlocks.length;
    let target = cityBlocks[y][x];
    if (x == width-1 && y == height-1)
        return target.horizMin;

    let mins = offsets.map(offsetSet => {
        if (x+offsetSet[0] >= width || x+offsetSet[0] < 0)
            return Infinity;

        let currMinMeasure = cityBlocks[y][x+offsetSet[0]].vertiMin;
        for (let i = 1; i < offsetSet.length; i++) {
            currMinMeasure += cityBlocks[y][x+offsetSet[i]].val
        }
        return currMinMeasure;
    });
    let min = Math.min(...mins);
    return min;
}

function getVertiMin(x, y, offsets, cityBlocks) {
    let width = cityBlocks[0].length;
    let height = cityBlocks.length;
    let target = cityBlocks[y][x];
    if (x == width-1 && y == height-1)
        return target.vertiMin;

    let mins = offsets.map(offsetSet => {
        if (y+offsetSet[0] >= height || y+offsetSet[0] < 0)
            return Infinity;

        let currMinMeasure = cityBlocks[y+offsetSet[0]][x].horizMin;
        for (let i = 1; i < offsetSet.length; i++) {
            currMinMeasure += cityBlocks[y+offsetSet[i]][x].val
        }
        return currMinMeasure;
    });
    let min = Math.min(...mins);
    return min;
}

console.log(solve(getOffsets(1, 3)), solve(getOffsets(4, 10)));