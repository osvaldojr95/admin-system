import express from "express";
import appointmentController from "../controllers/appointmentController.js";
import { appointmentValidation } from "../middlewares/appointmentMiddleware.js";

const router = express.Router();
router.get("/", appointmentController.listAll);
router.post("/", appointmentValidation, appointmentController.create);

export default router;
