import express from "express";
import customerController from "../controllers/customerController.js";
import customerImportController from "../controllers/customerImportController.js";
import { customerValidation } from "../middlewares/customerMiddleware.js";
import { uploadMiddeware } from "../middlewares/uploadMiddleware.js";
import { paginationValidadion } from "../middlewares/paginationMiddleware.js";

const router = express.Router();
router.get("/", customerController.listAll);
router.get("/paginated", paginationValidadion, customerController.listAllPaginated);
router.post("/", customerValidation, customerController.create);
router.get("/import", customerImportController.listAll);
router.post("/import", uploadMiddeware, customerImportController.importFile);

export default router;
