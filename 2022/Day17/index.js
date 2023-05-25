console.clear();
const fs = require('fs');

const rockShapes = `
####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`;
const bottom = `+-------+`;
const row = `|.......|`;

function formatFile() {
    let input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    let temp = rockShapes.split("\n");
    let rocks = [];
    for (let line of temp) {
        if (line == '') rocks.push([]);
        else rocks[rocks.length-1].push(line.replaceAll("#","@"));
    }
    return {input, rocks,};
}

function part1() {
    const {input, rocks} = formatFile();
    let map = createMap();
    let currRock = 0;
    let inputIndex = 0;

    // console.log(rocks);
    // console.table(map);

    for (let i = 0; i < 1000000000000; i++) {
        // Find the spawnPoint
        // X = 2 blanks from left wall, Y=3 blanks from highest rock point
        let spawnPoint = [1+2, findHighestRockPoint(map)+3+1];

        map = spawnRock(rocks[currRock], spawnPoint, map);
        // Loops back to 0
        currRock = (currRock+1)%(rocks.length);

        while (true) {
            if (input[inputIndex] == "<") [map, result] = moveLeft(map);
            else [map, result] = moveRight(map);
            inputIndex = (inputIndex+1)%input.length;

            [map, result] = moveDown(map);
            if (result == false) {
                map = solidifyRock(map);
                break;
            }
        }
    }
    console.log(findHighestRockPoint(map));
}

// Helper
function findHighestRockPoint(map) {
    for (let i = map.length-1; i >= 0; i--) {
        if (map[i].includes("#")) return i;
    }
    // No rocks on map
    return 0;
}

function createMap() {
    let map = [];
    map.unshift(bottom.split(""));
    expandMap(4, map);
    return map;
}

function expandMap(rows, map) {
    for (let i = 0; i < rows; i++) {
        map.push(row.split(""));
    }
}

function spawnRock(rock, spawnPoint, map) {
    for (let i = 0; i < rock.length; i++) {
        if (spawnPoint[1]+i > map.length-1) expandMap(1, map);
        for (let j = 0; j < rock[i].length; j++) {
            // I was accidentally spawning all the pieces upside down because I originally wanted to display correctly
            map[spawnPoint[1]+i][spawnPoint[0]+j] = rock[rock.length-1-i][j]
        }
    }
    // console.table(map);
    return map;
}

function moveRight(map) {
    let copy = JSON.parse(JSON.stringify(map));
    for (let y = 1; y<copy.length; y++) {
        for (let x = copy[y].length-1; x>=0; x--) {
            if (copy[y][x] == "@") {
                copy[y][x+1] = "@";
                copy[y][x] = ".";
            }
        }
        if (checkCollision(map[y], copy[y])) return [map, false];
    }
    // console.table(copy);
    return [copy, true];
}

function moveLeft(map) {
    let copy = JSON.parse(JSON.stringify(map));
    for (let y = 1; y<copy.length; y++) {
        for (let x = 0; x<copy[y].length; x++) {
            if (copy[y][x] == "@") {
                copy[y][x-1] = "@";
                copy[y][x] = ".";
            }
        }
        if (checkCollision(map[y], copy[y])) return [map, false];
    }
    // console.table(copy);
    return [copy, true];
}

function moveDown(map) {
    let copy = JSON.parse(JSON.stringify(map));
    for (let y = 1; y<copy.length; y++) {
        for (let x = 0; x<copy[y].length; x++) {
            if (copy[y][x] == "@") {
                copy[y-1][x] = "@";
                copy[y][x] = ".";
            }
        }
        if (checkCollision(map[y-1], copy[y-1])) return [map, false];
        if (checkCollision(map[y], copy[y])) return [map, false];
    }
    // console.table(copy);
    return [copy, true];
}

function solidifyRock(map) {
    let copy = JSON.parse(JSON.stringify(map));
    for (let y = 1; y<copy.length; y++) {
        for (let x = 0; x<copy[y].length; x++) {
            if (copy[y][x] == "@") {
                copy[y][x] = "#";
            }
        }
    }
    // console.table(copy);
    return copy;
}

function checkCollision(orig, updated) {
    orig = orig.filter(a => ["|","#","-","+"].includes(a));
    updated = updated.filter(a => ["|","#","-","+"].includes(a));
    if (orig.join("") != updated.join("")) return true;
}

function part2() {
    formatFile();
}

console.log(part1(), part2());