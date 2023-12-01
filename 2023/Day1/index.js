console.clear();
const fs = require('fs');

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r", "").split("\n");
}

function part1() {
    formatFile();
    let sum = 0;
    for (let line of input) {
        let first, second;
        for (let char of line) {
            if (parseInt(char)) {
                if (first == undefined) first = char;
                else second = char;
            }
        }
        if (second == undefined) second = first;
        sum += parseInt(first + second);
    }
    return sum;
}

function part2() {
    formatFile();
    let sum = 0;
    let nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let line of input) {
        let first, second;
        for (let num in nums) {
            let indices = [...line.matchAll(nums[num])];
            for (let match of indices) {
                index = match.index;
                if (index > -1) {
                    let temp;
                    // console.log(num % 10);
                    if (first == undefined || first[1] > index) {
                        temp = first;
                        first = [num % 10, index];
                        if (temp && (second == undefined || second[1] < temp[1])) {
                            second = temp;
                        }
                    } else if (second == undefined || second[1] < index) {
                        temp = second;
                        second = [num % 10, index];
                        if (temp && (first == undefined || first[1] > temp[1])) {
                            first = temp;
                        }
                    }
                }
            }
        }
        if (second == undefined) second = first;
        let cal = first[0].toString() + second[0].toString();
        sum += parseInt(cal);
    }
    return sum;
}

console.log(part1(), part2());