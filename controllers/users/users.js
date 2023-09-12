import { db } from "../../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM user";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        
        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q =
     "INSERT INTO user (`name`, `password`) VALUES(?)";

    const values = [
        req.body.name,
        req.body.password
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Cadastrado com Sucesso.");
    });
};

export const updateUser = (req, res) => {
    const q =
     "UPDATE user SET `name` = ?, `password` = ? WHERE `id` = ?";

    const values = [
        req.body.name,
        req.body.password
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Atualizado com Sucesso.");
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM user WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Deletado com Sucesso.");
    });
};