import { workerData, parentPort } from "worker_threads";

const delayedFetch = (delay: number) => {

  const timerObj = setTimeout(() => {
    
  }, delay)

}

parentPort?.postMessage(delayedFetch(workerData.delay));
