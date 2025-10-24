console.clear();
import * as fs from 'fs';
import { State } from "./State.js";
import { Worker } from "worker_threads";
import { exit } from 'process';

let input;

function formatFile() {
    input = fs.readFileSync("input.txt", { encoding: 'utf8', flag: 'r' });
    input = input.replaceAll("\r","").split("\n");
}


function part1() {
    formatFile();
    let state = new State(input[0], input[1], input[2], input[4]);
    state.execute();
    console.log(state.output.join(","));
}

function part2() {
    formatFile();
    const THREAD_COUNT = 12;
    const increment = 1000000;
    const target = input[4].split(": ")[1];

    let largestInitial = 0;
    let returnVal;

    let threads = THREAD_COUNT;

    function createWorker() {
        var workerTask = new Promise(function (resolve, reject) {
            const worker = new Worker("./worker.js", {
                workerData: { initial: largestInitial, increment: increment, target: target, input: input },
            });
            worker.on("message", e => {
                if (e > 0) {
                    console.log(e)
                    returnVal = e;
                }
                else threads++;
                resolve();
            });
        });
        largestInitial += increment;
        return workerTask;
    }

    setInterval(() => {
        console.log(largestInitial, returnVal);
        if (returnVal != undefined) exit();
    }, 1000);

    setInterval(() => {
        while (threads) {
            createWorker();
            threads--;
        }
    }, 0);
}

console.log(part1(), part2());