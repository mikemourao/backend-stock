import express from "express";
import { getProducts, addProduct ,updateProduct, deleteProduct, getProductById } from "../../controllers/products/products.js"

const router = express.Router()

router.get("/products", getProducts)
router.post("/products", addProduct)
router.put("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)

// Adicione a rota para buscar um produto por ID
router.get("/product", getProductById);

export default router