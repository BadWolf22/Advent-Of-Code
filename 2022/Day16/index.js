console.clear();
const fs = require('fs');

let input;
let solve = 1;

function formatFile() {
    input = fs.readFileSync(solve?"input.txt":"sample.txt", { encoding: 'utf8', flag: 'r' });

    // normalize the lines
    input = input.replaceAll("valves","valve");
    input = input.replaceAll("tunnels","tunnel");
    input = input.replaceAll("leads","lead");
    
    input = input.replaceAll("\r", "").split("\n");
}

function makeAdjacencies() {
    let adjacencies = {};
    let nonZeros = 0;

    for (let line of input) {
        // Parse the individual line
        let firstPass = line.split(" has flow rate=");
        firstPass[0] = firstPass[0].split("Valve ")[1];
        let temp = firstPass.pop();
        firstPass = firstPass.concat(temp.split("; tunnel lead to valve "));
        firstPass[2] = firstPass[2].split(", ");

        // Make an object containing useful information
        // open: -1 means the valve should never be opened (flow == 0)
        let valve = {
            key: firstPass[0],
            flow: parseInt(firstPass[1]),
            adjacent: firstPass[2],
            open: parseInt(firstPass[1]) ? false : -1,
        };
        adjacencies[valve.key] = valve;
        if (valve.flow != 0) nonZeros++;
    }

    return {adjacencies, nonZeros};
}

function findDistances(adjacencies) {
    let distances = {};

    // We perform BFS on every starting point to find the distance to every other point
    for (let key of Object.keys(adjacencies)) {
        distances[key] = {};
        let iteration = distances[key];

        // This is just to console.table displays it in the proper order
        for (let key2 of Object.keys(adjacencies)) {
            iteration[key2] = undefined;
        }

        // Do BFS
        let q = [[key, 0]];
        while (q.length != 0) {
            let [curr, depth] = q.shift();
            if (iteration[curr] == undefined) {
                iteration[curr] = depth;
                for (let adj of adjacencies[curr].adjacent) {
                    q.push([adj, depth+1]);
                }
            }
        }
    }

    return distances;
}

function part1() {
    formatFile();

    let {adjacencies, nonZeros} = makeAdjacencies();
    let distances = findDistances(adjacencies);
    
    let start = {
        human: {
            curr: "AA",
            path: [],
            time: 30,
            released: 0,
        },
        elephant: { // For Part 2
            curr: "AA",
            path: [],
            time: 30,
            released: 0,
        }
    }

    let q = [start];
    // let finished = [];
    let greatest;

    while (q.length) {
        let curr = q.pop();
        if (curr.human.path.length == nonZeros) {
            // finished.push(curr);
            if (greatest == undefined || greatest.human.released < curr.human.released)
                greatest = curr;
        }
        
        let added = false;
        for (let dest of Object.keys(adjacencies)) {
            if (adjacencies[dest].open != false) continue;
            if (curr.human.path.includes(dest)) continue;
            
            let copy = JSON.parse(JSON.stringify(curr));
            copy.human.path.push(dest);
            copy.human.time -= distances[copy.human.curr][dest] + 1;
            copy.human.released += adjacencies[dest].flow*copy.human.time;
            copy.human.curr = dest;

            if (copy.human.time < 0) continue;
            q.push(copy);
            added = true;
        }
        if (!added) {
            // finished.push(curr);
            if (greatest == undefined || greatest.human.released < curr.human.released)
                greatest = curr;
        }
    }
    console.log(greatest);
    return greatest.human.released;
}

// FIXME:
function part2() {
    formatFile();

    let {adjacencies, nonZeros} = makeAdjacencies();
    let distances = findDistances(adjacencies);
    
    console.table(adjacencies);

    let start = {
        human: {
            curr: "AA",
            path: [],
            time: 26,
            released: 0,
        },
        elephant: { // For Part 2
            curr: "AA",
            path: [],
            time: 26,
            released: 0,
        }
    }

    let q = [start];
    // let finished = [];
    let greatest;
    let shouldSort = 0;

    while (q.length) {
        shouldSort++;
        if (shouldSort % 100000 == 0) {
            // if (q.length < 200)
            // q.sort((a,b) => (a.human.path.length+a.elephant.path.length)-(b.human.path.length+b.elephant.path.length));
            // console.log(q[q.length-1]);
            // console.log(q.length);
        }
        let curr = q.pop();
        // if (q.length > 1000) curr = q.pop();
        // else curr = q.shift();
        if (curr.noValidPaths || curr.human.path.length + curr.elephant.path.length == nonZeros) {
            // finished.push(curr);
            if (greatest == undefined || greatest.human.released+greatest.elephant.released < curr.human.released+curr.elephant.released) {
                greatest = curr;
                console.table(greatest);
            }
            continue;
        }
        
        let added = false;
        for (let dest of Object.keys(adjacencies)) {
            if (adjacencies[dest].open != false) continue;
            if (curr.human.path.includes(dest) || curr.elephant.path.includes(dest)) continue;
            
            for (let mover of ["human", "elephant"]) {
                let copy = JSON.parse(JSON.stringify(curr));
                copy[mover].path.push(dest);
                copy[mover].time -= distances[copy[mover].curr][dest] + 1;
                copy[mover].released += adjacencies[dest].flow*copy[mover].time;
                copy[mover].curr = dest;

                if (copy[mover].time < 0) continue;
                if (greatest) {
                    let potential = copy.human.released+copy.elephant.released;
                    let added = 0;
                    for (let key of Object.keys(adjacencies)) {
                        if (copy.human.path.includes(key) || copy.elephant.path.includes(key)) {
                            continue;
                        }
                        if (adjacencies[key].flow != 0) {
                            added++;
                            potential += adjacencies[key].flow * (Math.max(copy.human.time, copy.elephant.time) - added);
                        }
                    }
                    if (potential < greatest.human.released+greatest.elephant.released) continue;
                }
                q.push(copy);
                added = true;
            }
        }
        if (!added) {
            curr.noValidPaths = true;
            q.push(curr);
        }
    }
    // finished.sort((a,b) => (b.human.released+b.elephant.released)-(a.human.released+a.elephant.released));
    console.log(greatest);
    return greatest.human.released + greatest.elephant.released;
}


console.time("Total");

console.time("Part1");
console.table(part1());
console.timeEnd("Part1");

console.time("Part2");
console.table(part2());
console.timeEnd("Part2");

console.timeEnd("Total");