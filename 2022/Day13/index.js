console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

let ORDERED = 1;
let UNORDERED = 0;

function compare(left, right) {
    // console.log(left, right);
    if (typeof left == typeof right) {
        if (typeof left == "number") {
            if (left < right) return ORDERED;
            if (right < left) return UNORDERED;
            return undefined;
        } else {
            left = [...left];
            right = [...right];
            while (left.length && right.length) {
                let result = compare(left.shift(), right.shift());
                if (result != undefined) return result;
            }
            if (left.length < right.length) return ORDERED;
            if (left.length > right.length) return UNORDERED;
        }
    } else {
        if (typeof left == "number") left = [left];
        if (typeof right == "number") right = [right];
        return compare(left, right);
    }
}

function part1(results=false) {
    formatFile();
    let pairs = [];
    let i = 0;
    while (input.length) {
        i++;
        let left = JSON.parse(input.shift());
        let right = JSON.parse(input.shift());
        let blank = input.shift();

        let result = compare(left, right);
        if (result == undefined) result = ORDERED;
        pairs.push(result);
    }
    let count = 0;
    for (let i = 0; i < pairs.length; i++) {
        if (pairs[i] == 1) count += i+1;
    }
    if (results) return pairs;
    return count;
}

function part2() {
    formatFile();
    input.push("[[2]]");
    input.push("[[6]]");
    for (let i = 0; i < input.length; i++) {
        if (input[i] == "") input.splice(i,1);
    }
    for (let i = 0; i < input.length; i++) {
        input[i] = JSON.parse(input[i]);
    }
    let sorted = false;
    while (!sorted) {
        let broken = false;
        for (let j = 0; j < input.length-1; j++) {
            let result = compare(input[j], input[j+1]);
            if (!result) {
                let temp = input[j];
                input[j] = input[j+1];
                input[j+1] = temp;
                broken = true;
                break;
            }
        }
        if (!broken) sorted = true;
    }
    let mult = 1;
    for (let i = 0; i < input.length; i++) {
        if (JSON.stringify(input[i]) == "[[2]]" || JSON.stringify(input[i]) == "[[6]]") mult *= i+1;
    }
    return mult;
}

console.log(part1(), part2());