import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import UserRoute from "./Routes/UserRoute";
import ProductRoute from "./Routes/ProductsRoute";
import { SeedInitailProducts } from "./Services/ProductService";
const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/Furniture")
  .then(async () => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
//* Seed Initial Products
SeedInitailProducts();
app.use("/user", UserRoute);
app.use("/product", ProductRoute);
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
