console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r", "").split("\n");
}

function parse() {
    let g = {};
    let nonZeros = 0;
    for (let line of input) {
        line = line.split("Valve ")[1];
        line = line.split(" has flow ");
        let valve = line[0];
        line = line[1].split(";");
        let rate;
        eval(line[0]);
        if (rate != 0) nonZeros++;
        let adjacent = line[1].replaceAll("valves", "valve").split(" valve ")[1].split(", ");
        g[valve] = { rate, adjacent };
    }
    return {g, nonZeros};
}

function makeAdjacencies(g) {
    let adjacencies = {};
    for (let key of Object.keys(g)) {
        adjacencies[key] = {};
        for (let key2 of Object.keys(g)) {
            if (g[key].adjacent.includes(key2)) adjacencies[key][key2] = 1;
            else {
                let q = [[key, 0]];
                let found = [];
                while (q.length) {
                    let curr = q.shift();
                    if (curr[0] == key2) {
                        adjacencies[key][key2] = curr[1];
                        break;
                    }
                    found.push(curr[0]);
                    for (let neighbor of g[curr[0]].adjacent) {
                        if (!found.includes(neighbor)) q.push([neighbor, curr[1] + 1]);
                    }
                }
            }
        }
    }
    return adjacencies;
}

function part1() {
    formatFile();

    let {g, nonZeros} = parse();
    let adjacencies = makeAdjacencies(g);

    let seqs = [{ loc: "AA", time: 30, flow: 0, open: [] }];
    let finished = [];
    while (seqs.length) {
        let curr = seqs.shift();
        if (curr.open.length == nonZeros) {
            finished.push(curr.flow);
            continue;
        }
        let added = false;
        for (let key of Object.keys(g)) {
            if (!curr.open.includes(key) && g[key].rate != 0) {
                let cp = JSON.parse(JSON.stringify(curr));
                cp.open.push(key);
                cp.time -= adjacencies[cp.loc][key] + 1;
                cp.flow += g[key].rate * cp.time;
                cp.loc = key;
                if (cp.time >= 0) {
                    seqs.push(cp);
                    added = true;
                }
            }
        }
        if (!added) finished.push(curr.flow);
    }

    finished.sort((a, b) => b-a);
    return finished[0];
}

function part2() {
    // formatFile();
    // let {g, nonZeros} = parse();
    // let adjacencies = makeAdjacencies(g);

    // let seqs = [{ loc: ["AA", "AA"], time: [26, 26], flow: 0, open: [] }];
    // let finished = [];
    // while (seqs.length) {
    //     let curr = seqs.shift();
    //     if (curr.open.length == nonZeros) {
    //         finished.push(curr.flow);
    //         continue;
    //     }
    //     let added = false;
    //     for (let key of Object.keys(g)) {
    //         if (!curr.open.includes(key) && g[key].rate != 0) {
    //             let cp = JSON.parse(JSON.stringify(curr));
    //             let moreTime = cp.time[0] < cp.time[1] ? 1:0;
    //             cp.open.push(key);
    //             cp.time[moreTime] -= adjacencies[cp.loc[moreTime]][key] + 1;
    //             cp.flow += g[key].rate * cp.time[moreTime];
    //             cp.loc[moreTime] = key;
    //             if (cp.time[moreTime] >= 0) {
    //                 seqs.push(cp);
    //                 added = true;
    //             }
    //         }
    //     }
    //     if (!added) finished.push(curr.flow);
    // }

    // finished.sort((a, b) => b-a);
    // return finished[0];
}


console.time("Part1");
console.time("Total");
console.table(part1());
console.timeEnd("Part1");
console.time("Part2");
console.log(part2());
console.timeEnd("Part2");
console.timeEnd("Total");