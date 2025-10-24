import { workerData, parentPort } from "worker_threads";
import { State } from "./State.js";

let found = -1;
for (let i = workerData.initial; i < workerData.initial + workerData.increment; i++) {
    let state = new State(`: ${i}`, workerData.input[1], workerData.input[2], workerData.input[4]);
    state.execute();
    let output = state.output.join(",");
    if (output == workerData.target) {
        found = i;
        break;
    }
}
parentPort.postMessage(found);