import express from "express";

import registrationController from "../controllers/registration-controller";

const router = express.Router();

router.post("/", registrationController);

export default router;
