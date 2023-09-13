import { db } from "../../db.js";

export const getProductById = (req, res) => {
    const productId = req.query.id; // Obtém o ID da query

    if (!productId) {
        return res.status(400).json("ID do produto não fornecido na query.");
    }

    const q = "SELECT * FROM products WHERE id = ?";

    db.query(q, [productId], (err, data) => {
        if (err) return res.json(err);

        if (data.length === 0) {
            return res.status(404).json("Produto não encontrado.");
        }
        
        const manufacturingCost = (data[0].cost / 50)
        const newData = [{
            id: data[0].id,
            product_name: data[0].product_name,
            type: data[0].type,
            cost: data[0].cost,
            size: data[0].size,
            manufacturing_cost: manufacturingCost
        }]
        
        return res.status(200).json(newData); // Retorna o resultado encontrado com novo valor de manufacturing_cost
    });
};