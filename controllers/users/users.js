import { db } from "../../db.js";
import jwt from 'jsonwebtoken';

const secretKey = 'seuSegredo'; // Substitua isso por uma chave secreta forte em um ambiente de produção

export const getUsers = (_, res) => {
    const q = "SELECT * FROM user";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const { name, password } = req.body;

    // Criptografar a senha usando JWT
    const token = jwt.sign({ name, password }, secretKey);

    const q =
        "INSERT INTO user (`name`, `password`, `token`) VALUES(?, ?, ?)";

    const values = [
        name,
        password,
        token
    ];

    db.query(q, values, (err) => {
        if (err) return res.json(err);

        return res.status(200).json({ message: "Cadastrado com Sucesso.", token });
    });
};

export const login = (req, res) => {
    const { name, password } = req.query;
    
    // Verificar o usuário e o token
    const q = "SELECT * FROM user WHERE `name` = ? AND `password` = ?";
    const values = [name, password];
    
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);

        if (data.length === 0) {
            return res.status(401).json({ message: "Usuário ou senha incorretos." });
        }

        // Verificar o token usando JWT
        const storedToken = data[0].token;
        jwt.verify(storedToken, secretKey, (verifyErr) => {
            if (verifyErr) {
                return res.status(401).json({ message: "Token inválido." });
            }

            return res.status(200).json({ message: "Login bem-sucedido." });
        });
    });
};