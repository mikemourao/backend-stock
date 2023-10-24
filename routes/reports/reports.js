import express from "express";
import { getProductById, addReport } from "../../controllers/reports/reports.js";

const router = express.Router()
// Rota para buscar um produto por ID
router.get("/product", getProductById);
router.post("/product", addReport);

export default router