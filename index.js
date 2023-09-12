import express from "express";
import cors from "cors";
import userRoutes from "./routes/users/users.js";
import productRoutes from "./routes/products/products.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", productRoutes);

app.listen(8800);