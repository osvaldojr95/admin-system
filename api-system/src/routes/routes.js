import express from "express";
import authRoutes from "./authRoutes.js";
import customerRoutes from "./customerRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";
import { tokenValidadion } from "../middlewares/tokenValidations.js";

const router = express.Router();
router.use("/signin", authRoutes);
router.use("/customers", tokenValidadion, customerRoutes);
router.use("/appointments", tokenValidadion, appointmentRoutes);

export default router;
