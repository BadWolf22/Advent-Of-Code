console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let sum = 0;
    for (let line of input) {
        let info = line.split(" ");
        let permutations = generatePermutations(info[0]);
        let valid = permutations.map(e => validate(e, info[1]));
        let numValid = valid.filter(e => e == true).length;
        sum += numValid;
    }
    return sum;
}

function validate(permutation, key) {
    key = key.split(",").map(e => parseInt(e));
    let contiguous = [];
    let last = ".";
    for (let char of permutation) {
        if (char == "#" && last == ".") contiguous.push(1);
        if (char == "#" && last == "#") contiguous[contiguous.length-1]++;
        last = char;
    }
    let isValid = JSON.stringify(contiguous) == JSON.stringify(key);
    // if (isValid) console.log(permutation, key, contiguous, isValid);
    return isValid;
}

function generatePermutations(format) {
    let base = format.replaceAll("?", "0").split("");
    let permutations = [base.join("")];
    while (true) {
        for (let [i, char] of base.entries()) {
            if (char == '0') {
                base[i] = '1';
                break;
            } else if (char == '1') {
                base[i] = 0;
            }
        }
        if (!base.includes("1")) break;
        permutations.push(base.join(""));
    }
    return permutations.map(e => e.replaceAll("0", ".").replaceAll("1", "#"));
}

// FIXME: I knew it wouldn't work, but this would be the trivial implementation. I foolishly thought part 1 would not take long to run at all.
function part2() {
    formatFile();
    let sum = 0;
    for (let line of input) {
        let info = line.split(" ");
        info[0] = info[0]+"?"+info[0]+"?"+info[0]+"?"+info[0]+"?"+info[0];
        info[1] = info[1]+","+info[1]+","+info[1]+","+info[1]+","+info[1];
        console.log(info)
        let permutations = generatePermutations(info[0]);
        let valid = permutations.map(e => validate(e, info[1]));
        let numValid = valid.filter(e => e == true).length;
        sum += numValid;
    }
    return sum;
}

console.log(part1());
// console.log(part2());