import express from "express";
import cors from "cors";
import userRoutes from "./routes/users/users.js";
import productRoutes from "./routes/products/products.js";
import reportsRoutes from "./routes/reports/reports.js";

const app = express();

// Use o parser integrado do express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", reportsRoutes);

app.listen(8800);