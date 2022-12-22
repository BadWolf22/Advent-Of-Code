console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let monkeys = {};
    for (let line of input) {
        line = line.split(": ");
        monkeys[line[0]] = line[1];
    }
    return (function getValue(monkey="root") {
        let exp = monkeys[monkey].split(" ");
        if (exp.length == 1) return parseInt(exp[0]);
        else {
            let first = getValue(exp[0]);
            let second = getValue(exp[2]);
            return eval(`${first} ${exp[1]} ${second}`);
        }
    })();
}

function part2() {
    formatFile();
    let monkeys = {};
    for (let line of input) {
        line = line.split(": ");
        monkeys[line[0]] = line[1];
    }
    monkeys["root"] = monkeys["root"].replace("+", "==");
    monkeys["humn"] = `${3352886133831}`; // FIXME: I had to brute force this... BY HAND???!?!!
    
    function getValue(monkey="root", doit=false) {
        let exp = monkeys[monkey].split(" ");
        if (exp.length == 1) return parseFloat(exp[0]);
        else {
            let first = getValue(exp[0]);
            let second = getValue(exp[2]);
            if (doit) {
                console.log(monkey, exp[0], ":", first, exp[2], ":", second);
                let which = Number.isNaN(first) ? 0 : 2;
                return [exp[which], [second, 0, first][which], exp[1]];
            }
            return eval(`${first} ${exp[1]} ${second}`);
        }
    }

    return getValue("root", true)

    let res = [];
    res.push(getValue("root", true));
    while (res[res.length-1][0] != "humn") {
        res.push(getValue(res[res.length-1][0], true));
    }

    // return res;

    let val;
    while (res.length) {
        let curr = res.shift();
        if (curr[2] == "==") val = curr[1];
        else if (curr[2] == "*") val /= curr[1];
        else if (curr[2] == "/") val *= curr[1];
        else if (curr[2] == "+") val -= curr[1];
        else if (curr[2] == "-") val += curr[1];
    }

    return val;
}

console.log(part1(), part2());