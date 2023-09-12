import { db } from "../../db.js";

export const getProducts = (_, res) => {
    const q = "SELECT * FROM products";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        
        return res.status(200).json(data);
    });
};

export const addProduct = (req, res) => {
    const q =
     "INSERT INTO products (`product_name`, `type`, `cost`, `size`) VALUES(?)";

    const values = [
        req.body.product_name,
        req.body.type,
        req.body.cost,
        req.body.size
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Cadastrado com Sucesso.");
    });
};

export const updateProduct = (req, res) => {
    const q =
     "UPDATE products SET `product_name` = ?, `type` = ?, `cost` = ?, `size` = ? WHERE `id` = ?";

    const values = [
        req.body.product_name,
        req.body.type,
        req.body.cost,
        req.body.size
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Atualizado com Sucesso.");
    });
};

export const deleteProduct = (req, res) => {
    const q = "DELETE FROM products WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Deletado com Sucesso.");
    });
};

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

        return res.status(200).json(data[0]); // Retorna o primeiro resultado encontrado (deve ser único)
    });
};