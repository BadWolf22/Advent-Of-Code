const fs = require('fs');

let file = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
file = file.replaceAll("\r","").split("\n");

function part1(retPos=false) {
    let grids = [];
    for (let wire of file) {
        let grid = {"0:0":["o",0]};
        let path = wire.split(",");
        let x = 0, y = 0;
        let step = 0;
        for (let instruction in path) {
            let dX=0, dY=0;
            if (path[instruction].startsWith("R")) dX = 1;
            else if (path[instruction].startsWith("L")) dX = -1;
            else if (path[instruction].startsWith("U")) dY = 1;
            else if (path[instruction].startsWith("D")) dY = -1;
            let dist = parseInt(path[instruction].substring(1));
            let symbol = "LR".includes(path[instruction][0]) ? "-":"|";
            
            for (let i = 0; i < dist; i++) {
                x+=dX;
                y+=dY;
                step++;
                if (grid[`${x}:${y}`] == undefined) grid[`${x}:${y}`] = [symbol, step];
                else grid[`${x}:${y}`] = ["+", step];
            }
        }
        grids.push(grid);
    }
    let crossings = [];
    for (let key of Object.keys(grids[0])) {
       if (grids[1][key] != undefined && key!="0:0") crossings.push(key);
    }
    let closest = Infinity;
    let positions = [];
    for (let crossing of crossings) {
        crossing = crossing.split(":");
        let dist = 0;
        for (let comp of crossing) dist += Math.abs(parseInt(comp));
        if (dist < closest) {
            closest = dist;
            positions.push(crossing);
        }
    }

    // display(grid);
    if (retPos) return [positions, grids];
    else return closest;
}

function part2() {
    let intersection = part1(true);
    let positions = intersection[0];
    let grids = intersection[1];

    let closestPathIntersect = Infinity;
    let closestPathIntersectPos;

    for (let pos of positions) {
        let pathIntersect = 0;
        for (let grid of grids) {
            pathIntersect += grid[pos.join(":")][1];
        }
        if (pathIntersect < closestPathIntersect) {
            closestPathIntersect = pathIntersect;
            closestPathIntersectPos = pos;
        }
    }
    return closestPathIntersect;
}

// DEPRICATED
function display(grid) {
    let lX = Infinity;
    let hX = -Infinity;
    let lY = Infinity;
    let hY = -Infinity;
    for (let key of Object.keys(grid)) {
        let dims = key.split(":");
        if (parseInt(dims[0]) < lX) lX = parseInt(dims[0]);
        if (parseInt(dims[0]) > hX) hX = parseInt(dims[0]);
        if (parseInt(dims[1]) < lY) lY = parseInt(dims[1]);
        if (parseInt(dims[1]) > hY) hY = parseInt(dims[1]);
    }
    let string = "";
    for (let y = lY-1; y <= hY+1; y++) {
        for (let x = lX-1; x <= hX+1; x++) {
            if (grid[`${x}:${y}`] != undefined) string += grid[`${x}:${y}`];
            else string += ".";
        }
        string += "\n";
    }
    fs.writeFileSync("output.txt", string);
    // console.log(string);
}

console.log(part1(), part2());