console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function parse() {
    formatFile();
    let dirStruct = {
        "/":{}
    };
    let path = "";
    for (let line of input) {
        let parsed = line.split(" ");
        if (parsed[1]=="cd") {
            if (parsed[2] == "..") {
                let parsedPath = path.split(" ");
                parsedPath.pop();
                path = parsedPath.join(" ")
            } else {
                path += " "+parsed[2];
            }
        } else {
            let curr = dirStruct;
            for (let dir of path.split(" ")) {
                if (dir == "") continue;
                curr = curr[dir]
            }
            if (parsed[0] == "dir") {
                curr[parsed[1]] = {};
            } else if (parsed[1] != "ls") {
                curr[parsed[1]] = parseInt(parsed[0]);
            }
        }
    }
    return dirStruct;
}

function part1() {
    let parsed = parse();
    let sum = 0;
    function lessThan100000(obj) {
        let size = 0;
        for (let key of Object.keys(obj)) {
            if (typeof obj[key] != "number") size += lessThan100000(obj[key]);
            else size += obj[key];
        }
        if (size <= 100000) sum += size;
        return size;
    }
    lessThan100000(parsed);

    return sum;
}

function part2() {
    let parsed = parse();
    let sums = [];
    function getSize(obj) {
        let size = 0;
        for (let key of Object.keys(obj)) {
            if (typeof obj[key] != "number") {
                let subSize = getSize(obj[key]);
                size += subSize;
                sums.push(subSize);
            }
            else size += obj[key];
        }
        return size;
    }
    getSize(parsed);
    sums = sums.filter(e => e > 8381165)
    return Math.min(...sums);
}

console.log(part1(), part2());