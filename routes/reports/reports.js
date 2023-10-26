import express from "express";
import { getProductById, addReport, getReports } from "../../controllers/reports/reports.js";

const router = express.Router()
// Rota para buscar um produto por ID
router.get("/product", getProductById);
router.get("/reports", getReports);
router.post("/reports", addReport);

export default router