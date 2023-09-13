import express from "express";
import { getProductById } from "../../controllers/reports/reports.js";

const router = express.Router()
// Rota para buscar um produto por ID
router.get("/product", getProductById);

export default router