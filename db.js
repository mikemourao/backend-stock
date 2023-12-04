import mysql from "mysql";

export const db = mysql.createConnection({
    host: "db-stock-b.cl4npwhvsnpu.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "TheJimiHendrix6",
    database: "stock_b"
})