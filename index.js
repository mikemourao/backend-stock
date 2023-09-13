import express from "express";
import cors from "cors";
import userRoutes from "./routes/users/users.js";
import productRoutes from "./routes/products/products.js";
import reportsRoutes from "./routes/reports/reports.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", reportsRoutes);

app.listen(8800);