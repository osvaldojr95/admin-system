import express from "express";
import {
  authValidate,
} from ".././middlewares/authValidations.js";
import { signIn, } from "../controllers/authController.js";

const router = express.Router();
router.post("/", authValidate, signIn);

export default router;
