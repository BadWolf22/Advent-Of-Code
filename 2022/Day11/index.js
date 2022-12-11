console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n\n");
}

function part1(rounds, worrying) {
    formatFile();
    let monkeys = {};
    let superModulo = 1;
    for (let monkey of input) {
        let parsed = monkey.split("\n");
        // console.log(parsed);
        let num = parsed[0].split(" ")[1].replace(":", "");
        let startingItems = parsed[1].split(": ")[1].split(", ").map(e=>parseInt(e));
        let operation = parsed[2].split("= ")[1];
        let test = "%"+parsed[3].split("by ")[1]+"==0";
        // TODO: I literally never would have figured this stupid thing out on my own.
        superModulo *= parseInt(parsed[3].split("by ")[1]);
        let ifTrue  = parsed[4].split("monkey ")[1];
        let ifFalse = parsed[5].split("monkey ")[1];
        monkeys[num] = {
            startingItems,
            operation,
            test,
            ifTrue,
            ifFalse,
            inspected: 0
        }
    }
    for (let i = 0; i < rounds; i++) {
        for (let key of Object.keys(monkeys)) {
            let monkey = monkeys[key];
            while (monkey.startingItems.length > 0) {
                let item = monkey.startingItems.shift();
                item = eval(monkey.operation.replaceAll("old", item));
                monkey.inspected++;
                if (worrying) item = Math.floor(item/3);
                else item = item%superModulo;
                let isTrue = eval(item+monkey.test);
                let toMonkey = isTrue ? monkey.ifTrue : monkey.ifFalse;
                monkeys[toMonkey].startingItems.push(item);
            }
        }
    }
    let values = [];
    Object.entries(monkeys).forEach(([a,b]) => values.push(b.inspected));
    let highest = 1;
    for (let i = 0; i < 2; i++) {
        let hi = Math.max(...values);
        highest *= hi;
        values.splice([values.indexOf(hi)], 1);
    }
    return highest;
}

function part2() {
    // formatFile();
    return part1(10000, false);
}

console.log(part1(20, true), part2());