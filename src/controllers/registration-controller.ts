import { NextFunction, Request, Response } from "express";
import HttpError from "../models/http-error";
import { Worker, isMainThread, parentPort } from "worker_threads";

const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, message, delay, ...extra } = req.body;

  if (Object.keys(extra).length) {
    const error = new HttpError(
      `unexpected parameter ${Object.keys(extra)}`,
      400
    );
    return next(error);
  }

  if (isMainThread) {
    const worker = new Worker("./src/controllers/worker.js", {
      workerData: {
        delay: +delay,
        path: "./worker.ts",
      },
    });

    worker.on("message", (result) => {
      res.send(`Result from worker: ${result}`);
    });

    worker.on("error", (error: any) => {
      console.error(`Worker error: ${error}`);
      res.status(500).json({ message: "Something went wrong!" });
    });

    worker.on("exit", (code: any) => {
      if (code !== 0) {
        res.status(500).json({ message: "Something went wrong!" });
      }
    });
  }
};

export default registration;
