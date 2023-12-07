console.clear();
const fs = require('fs');

let input;
const TYPES = ["5", "4", "F", "3", "2P", "1P", "H"];

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}

function part1() {
    formatFile();
    let hands = [];
    for (let line of input) {
        hands.push(classifyHand1(line));
    }
    hands.sort(rankHands1);
    return calculateValue(hands);
}

function part2() {
    formatFile();
    let hands = [];
    for (let line of input) {
        hands.push(classifyHand2(line));
    }
    hands.sort(rankHands2);
    return calculateValue(hands);
}

function classifyHand1(hand) {
    let bid = hand.split(" ")[1];
    hand = hand.split(" ")[0];
    let type = "";

    let cards = {};

    for (let char of hand) {
        if (cards[char] == undefined) cards[char] = 1;
        else cards[char]++;
    }

    switch (Object.getOwnPropertyNames(cards).length) {
        case 1: 
            type = TYPES[0];
            break;
        case 2:
            if (Math.max(...Object.values(cards)) == 4) type = TYPES[1];
            else type = TYPES[2];
            break;
        case 3:
            if (Math.max(...Object.values(cards)) == 3) type = TYPES[3];
            else type = TYPES[4];
            break;
        case 4:
            type = TYPES[5];
            break;
        default:
            type = TYPES[6];
            break;
    }

    return {hand, bid, type};
}

function classifyHand2(hand) {
    let bid = hand.split(" ")[1];
    hand = hand.split(" ")[0];
    let type = "";

    let cards = {};

    for (let char of hand) {
        if (cards[char] == undefined) cards[char] = 1;
        else cards[char]++;
    }

    if (cards["J"] != undefined) {
        let keyValues = Object.entries(cards);
        if (keyValues.length != 1) {
            keyValues.sort((a, b) => {
                if (a[1] < b[1]) return  1;
                if (a[1] > b[1]) return -1;
                return 0;
            });
            if (keyValues[0][0] == "J") keyValues.shift();
            cards[keyValues[0][0]] += cards["J"];
            delete cards["J"];
        }
    }

    switch (Object.getOwnPropertyNames(cards).length) {
        case 1: 
            type = TYPES[0];
            break;
        case 2:
            if (Math.max(...Object.values(cards)) == 4) type = TYPES[1];
            else type = TYPES[2];
            break;
        case 3:
            if (Math.max(...Object.values(cards)) == 3) type = TYPES[3];
            else type = TYPES[4];
            break;
        case 4:
            type = TYPES[5];
            break;
        default:
            type = TYPES[6];
            break;
    }

    return {hand, bid, type};
}

function rankHands1(a, b) {
    const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
    if (TYPES.indexOf(a.type) < TYPES.indexOf(b.type)) return -1;
    if (TYPES.indexOf(a.type) > TYPES.indexOf(b.type)) return  1;
    
    for (let i = 0; i < a.hand.length; i++) {
        if (CARDS.indexOf(a.hand[i]) > CARDS.indexOf(b.hand[i])) return -1;
        if (CARDS.indexOf(a.hand[i]) < CARDS.indexOf(b.hand[i])) return  1;
    }
}

function rankHands2(a, b) {
    const CARDS = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]
    if (TYPES.indexOf(a.type) < TYPES.indexOf(b.type)) return -1;
    if (TYPES.indexOf(a.type) > TYPES.indexOf(b.type)) return  1;
    
    for (let i = 0; i < a.hand.length; i++) {
        if (CARDS.indexOf(a.hand[i]) > CARDS.indexOf(b.hand[i])) return -1;
        if (CARDS.indexOf(a.hand[i]) < CARDS.indexOf(b.hand[i])) return  1;
    }
}

function calculateValue(hands) {
    let sum = 0;
    for (let hand in hands) {
        sum += parseInt(hands[hand].bid) * (hands.length-hand);
    }
    return sum;
}

console.log(part1(), part2());