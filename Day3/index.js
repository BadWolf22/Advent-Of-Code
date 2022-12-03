const fs = require('fs');

let file = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
file = file.replaceAll("\r","").split("\n");

let rucksacks=[];
let rucksacks2=[];
for (let i=0; i < file.length;i++) {
    rucksacks[i] = [file[i].substring(0, file[i].length/2), file[i].substring(file[i].length/2, file[i].length)];
    rucksacks2[i] = file[i];
}

function part1() {
    let sum = 0;
    for (let rucksack of rucksacks) {
        let common = "";
        for (let char of rucksack[0]) {
            if (rucksack[1].includes(char)) common = char;
        }
        sum += convertToPriority(common);
    }
    return sum;
}

function part2() {
    let sum = 0;
    for (let i = 0; i < rucksacks2.length; i+=3) {
        let common = "";
        for (let char of rucksacks2[i]) {
            if (rucksacks2[i+1].includes(char) && rucksacks2[i+2].includes(char))
                common = char;
        }
        sum += convertToPriority(common);
    }
    return sum;
}

function convertToPriority(letter) {
    let offset = 65-27;
    if (letter > "a") offset = 97-1;
    return letter.charCodeAt(0)-offset;
}

console.log(part1(), part2());