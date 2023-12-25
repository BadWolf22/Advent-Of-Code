console.clear();
const fs = require('fs');

let input;
const dirs = [
    { x: 0, y: -1, s: "^" },
    { x: 1, y: 0, s: ">" },
    { x: 0, y: 1, s: "v" },
    { x: -1, y: 0, s: "<" }
];

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r", "").split("\n");
}

/** My thoughts for part 1
 * Measure each segment individually
 * Mark the possible segment connections (e.g. seg 0 connects to seg 1 and 2, seg 1 connects to seg 3 and seg 4, seg 2 connects to seg 5 and seg 6, etc.)
 * Then instead of pathfinding the whole maze, pathfind the smaller graph to find the longest path to the end.
 */
function part1() {
    formatFile();
    input = input.map(e => e.split("").map(e2 => ({ s: e2 })));

    let graph = markJunctions();
    graph["start"] = { x: 1, y: 0 };
    graph["end"] = { x: input.length - 2, y: input[0].length - 1 };

    measureSegment(1, 0, "start", graph);
    for (let [id, junction] of Object.entries(graph)) {
        let pathStarts = getNext(junction.x, junction.y);
        for (let [x, y] of pathStarts) {
            measureSegment(x, y, id, graph);
        }
    }

    let paths = generatePaths(graph);
    let pathLengths = paths.map(path => findPathLength(path, graph));

    return pathLengths.sort().at(-1);
}

function markJunctions() {
    let junctionId = 0;
    let junctions = {};
    for (let [y, line] of input.entries()) {
        for (let [x, char] of line.entries()) {
            let neighbors = slopeNeighbors(x, y);
            if (neighbors.length > 1) {
                // mark neighboring slopes and self as a junction
                junctions[junctionId] = { x, y };
                input[y][x].group = junctionId;
                input[y][x].visited = true;
                for (let [nX, nY] of neighbors) {
                    input[nY][nX].group = junctionId;
                }
                junctionId++;
            }
        }
    }
    return junctions;
}

function measureSegment(x, y, id, paths) {
    let next;
    let len = 0;

    // console.log("start", x, y)
    while (true) {
        len++;
        input[y][x].visited = true;
        next = getNext(x, y);
        if (next.length == 0) break;
        [x, y] = next[0];
        if (input[y][x].s.match(/[<>v^]/g)) break;
    }
    // console.log("end", x, y, input[y][x], "\n");
    if (!paths[id].paths) paths[id].paths = [];
    let toJunction = input[y][x].group ?? "end";
    paths[id].paths.push({ len, toJunction });
    return paths;
}

function getNext(x, y) {
    let options = [];
    for (let dir of dirs) {
        let possibleNext;
        try { possibleNext = input[y + dir.y][x + dir.x]; } catch { continue; }
        if ((possibleNext.s == "." && !possibleNext.visited) || (possibleNext.s == dir.s)) options.push([x + dir.x, y + dir.y]);
    }
    return options;
}

function slopeNeighbors(x, y) {
    let neighbors = [];
    for (let dir of dirs) {
        let possibleNext;
        try { possibleNext = input[y + dir.y][x + dir.x]; } catch { continue; }
        if (possibleNext && input[y][x].s == "." && possibleNext.s.match(/[<>v^]/g)) neighbors.push([x + dir.x, y + dir.y]);
    }
    return neighbors;
}

function generatePaths(graph) {
    let finalPaths = [];
    let paths = [];
    let stack = [["start"]];
    while (stack.length) {
        let curr = stack.pop();
        try {
            for (let neighbor of graph[curr.at(curr.length - 1)].paths) {
                stack.push(curr.concat(neighbor.toJunction));
                // console.log(neighbor);
            }
        } catch {
            finalPaths.push(curr);
        }
    }
    return finalPaths;
}

function findPathLength(path, graph) {
    let len = 0;
    for (let i = 0; i < path.length - 1; i++) {
        let curr = graph[path.at(i)];
        let nextPath = curr.paths.find(e => e.toJunction == path.at(i + 1));
        len += nextPath.len;
    }
    return len + 2 * (path.length - 2) - 1;
}

function part2() {
    formatFile();
}

console.log(part1(), part2());