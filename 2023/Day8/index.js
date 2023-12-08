console.clear();
const fs = require('fs');

let input;

function formatFile(name) {
    input = fs.readFileSync(name, { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r", "").split("\n");
}

function part1() {
    formatFile("input.txt");
    let steps = input[0];
    let nodes = createNodes();
    let currNode = "AAA";

    let step = 0;
    while (currNode != "ZZZ") {
        let dir = steps[step % steps.length];
        currNode = nodes[currNode][dir];
        step++;
    }
    return step;
}

function createNodes() {
    let nodes = {};
    for (let i = 2; i < input.length; i++) {
        let name = input[i].split(" = ")[0];
        let children = [...input[i].split(" = ")[1].matchAll(/[0-9A-Z]+/g)];
        nodes[name] = { L: children[0][0], R: children[1][0] };
    }
    return nodes;
}

function part2Naïve() {
    formatFile("input.txt");
    let steps = input[0];
    let nodes = createNodes();

    let currNodes = Object.getOwnPropertyNames(nodes).filter(node => node.endsWith("A"));
    let step = 0;
    while (!currNodes.every(node => node.endsWith("Z"))) {
        let dir = steps[step % steps.length];
        for (let node in currNodes) {
            currNodes[node] = nodes[currNodes[node]][dir];
        }
        step++;
    }
    return step;
}

function part2() {
    formatFile("input.txt");
    let steps = input[0];
    let nodes = createNodes();

    let startNodes = Object.getOwnPropertyNames(nodes).filter(node => node.endsWith("A"));
    let loops = [];
    for (let node of startNodes) {
        let start = node;
        let curr = node;
        let step = 0;
        let found = {};
        let path = [];
        do {
            if (found[curr + step % steps.length] == undefined) found[curr + step % steps.length] = 1;
            path.push(curr + step % steps.length);
            let dir = steps[step % steps.length];
            curr = nodes[curr][dir];
            step++;
        } while (found[curr + step % steps.length] == undefined);
        let loopIndex = path.indexOf(curr + step % steps.length);
        path = path.map(e => e.match(/[A-Z]+/g)[0]);
        path.loopIndex = loopIndex;
        path.curr = 0;
        loops.push(path);
    }
    
    let yInts = [];
    loops.forEach(e => e.forEach((a, i) => {if (a.endsWith("Z")) yInts.push(i);}));

    // some cursed y=mx+b crap
    // let yInt = yInts.shift();
    // for (let int of yInts) yInt -= int;

    // let slopes = [];
    // loops.forEach(e => slopes.push(e.length-e.loopIndex));
    // let slope = slopes.shift();
    // for (let slop of slopes) slope -= slop;
    
    // console.log(-yInt/slope); // -1 means that the target indices and loopsizes match up or something
    
    // Just find the lcm
    return "lcm " + yInts.join(" ");
}

console.log(part1(), part2());