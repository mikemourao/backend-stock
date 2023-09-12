import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "mike",
    password: "TheJimiHendrix6andTheDoors!",
    database: "stock"
})