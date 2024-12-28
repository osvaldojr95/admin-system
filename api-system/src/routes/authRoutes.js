import express from "express";
import {
  authValidate,
} from "../middlewares/authMiddleware.js";
import authController from "../controllers/authController.js";

const router = express.Router();
router.post("/", authValidate, authController.signIn);

export default router;
