console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r", "").split(",");
}

function part1() {
    formatFile();
    let sum = 0;
    for (let instruction of input) {
        sum += hash(instruction);
    }
    return sum;
}

function hash(str) {
    let currentValue = 0;
    for (let char of str) {
        hashSteps(char);
    }
    return currentValue;

    function hashSteps(char = '') {
        let asciiCode = char.charCodeAt(0);
        currentValue += asciiCode;
        currentValue *= 17;
        currentValue = currentValue % 256;
    }
}

function part2() {
    formatFile();
    let HASHMAP = {};
    initHASHMAP();
    followInstructions();
    return cumulativeFocusingPower();

    function initHASHMAP() {
        for (let i = 0; i < 256; i++) {
            HASHMAP[i] = [];
        }
    }
    function followInstructions() {
        for (let instruction of input) {
            if (instruction.match("-")) {
                let label = instruction.split("-")[0];
                let boxNum = hash(label);
                removeFromBox(label, boxNum);
            } else {
                let label = instruction.split("=")[0];
                let boxNum = hash(label);
                let power = parseInt(instruction.split("=")[1]);
                addToBox(label, power, boxNum);
            }
        }
        function removeFromBox(label, box) {
            HASHMAP[box] = HASHMAP[box].filter(e => e[0] != label);
        }
        function addToBox(label, power, box) {
            let lens = [label, power];
            if (HASHMAP[box].some(e => e[0] == label)) {
                HASHMAP[box] = HASHMAP[box].map(e => e[0] == label ? lens : e);
            } else {
                HASHMAP[box].push(lens);
            }
        }
    }
    function cumulativeFocusingPower() {
        let sum = 0;
        for (let box of Object.getOwnPropertyNames(HASHMAP)) {
            sum += boxFocusingPower(parseInt(box));
        }
        return sum;
    }
    function boxFocusingPower(box) {
        let sum = 0;
        for (let [i, lens] of HASHMAP[box].entries()) {
            let p_box = box + 1;
            let p_slot = i + 1;
            let p_power = lens[1];
            sum += p_box * p_slot * p_power;
        }
        return sum;
    }
}

console.log(part1(), part2());