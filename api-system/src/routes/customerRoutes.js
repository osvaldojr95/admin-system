import express from "express";
import {
  create,
  listAll,
  importFile,
} from "../controllers/customerController.js";
import { customerValidation } from "../middlewares/customerMiddleware.js";
import { uploadMiddeware } from "../middlewares/uploadMiddleware.js";
import { paginationValidadion } from "../middlewares/paginationMiddleware.js";

const router = express.Router();
router.get("/", paginationValidadion, listAll);
router.post("/", customerValidation, create);
router.post("/import", uploadMiddeware, importFile);


export default router;
