import express from "express";
import {
  create,
  listAll,
} from "../controllers/appointmentController.js";
import { appointmentValidation } from "../middlewares/appointmentValidations.js";

const router = express.Router();
router.get("/", listAll);
router.post("/", appointmentValidation, create);

export default router;
