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

        if (data[0].type === "Normal") {
            function checkKeyword(str, keyWord) {
                // Converte a string para minúsculas para tornar a comparação insensível a maiúsculas e minúsculas
                const stringMinusc = str.toLowerCase();
    
                // Verifica cada palavra-chave na string
                for (const keyWords of keyWord) {
                    if (stringMinusc.includes(keyWords.toLowerCase())) {
                        return true; 
                    }
                }
                return false; 
            }
    
            const myString = data[0].product_name;
            const myKeyWords = ["fita"];
            const myKeyWordsPaper = ["papel"];
            const myKeyWordsGlue = ["cola"];

    
            const returnTape = checkKeyword(myString, myKeyWords);
            const returnPaper = checkKeyword(myString, myKeyWordsPaper);
            const returnGlue = checkKeyword(myString, myKeyWordsGlue);

            
            const manufacturingCost = (data[0].cost / (returnTape ? 10 : returnPaper ? 50 : returnGlue ? 100 : 20))
            const newData = [{
                id: data[0].id,
                product_name: data[0].product_name,
                type: data[0].type,
                cost: data[0].cost,
                size: data[0].size,
                manufacturing_cost: manufacturingCost
            }]
            return res.status(200).json(newData);
        }

        function checkKeyword(str, keyWord) {
            // Converte a string para minúsculas para tornar a comparação insensível a maiúsculas e minúsculas
            const stringMinusc = str.toLowerCase();

            // Verifica cada palavra-chave na string
            for (const keyWords of keyWord) {
                if (stringMinusc.includes(keyWords.toLowerCase())) {
                    return true; 
                }
            }
            return false; 
        }

        const myString = data[0].product_name;
        const myKeyWords = ["fita"];
        const myKeyWordsPaper = ["papel"];
        const myKeyWordsGlue = ["cola"];

        const returnTape = checkKeyword(myString, myKeyWords);
        const returnPaper = checkKeyword(myString, myKeyWordsPaper);
        const returnGlue = checkKeyword(myString, myKeyWordsGlue);
        
        const manufacturingCost = (data[0].cost / (returnTape ? 10 : returnPaper ? 50 : returnGlue ? 100 : 20))
        const newData = [{
            id: data[0].id,
            product_name: data[0].product_name,
            type: data[0].type,
            cost: data[0].cost,
            size: data[0].size,
            manufacturing_cost: manufacturingCost
        }]

        return res.status(200).json(newData);
    });
};