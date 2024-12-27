import express from "express";
import {
  create,
  listAll,
  importFile,
} from "../controllers/customerController.js";
import { customerValidation } from "../middlewares/customerMiddleware.js";
import { uploadMiddeware } from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.get("/", listAll);
router.post("/", customerValidation, create);
router.post("/import", uploadMiddeware, importFile);


export default router;
