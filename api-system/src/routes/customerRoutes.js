import express from "express";
import {
  create,
  listAll,
  importFile,
} from "../controllers/customerController.js";
import { customerValidation } from "../middlewares/customerValidations.js";

const router = express.Router();
router.get("/", listAll);
router.post("/", customerValidation, create);
router.post("/import", importFile);


export default router;
