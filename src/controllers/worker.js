const path = require("path");
const { workerData } = require("worker_threads");
require("ts-node").register();
require(path.resolve(__dirname, workerData.path));

// const {
//   Worker,
//   isMainThread,
//   parentPort,
//   workerData,
// } = require("worker_threads");

// const delayedFetch = (delay) => {
//   const timerObj = setTimeout(() => {}, delay);
// };

// parentPort?.postMessage(delayedFetch(workerData.delay));
