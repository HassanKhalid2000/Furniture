import express from "express";
import { CreateNewProduct, GetAllProducts } from "../Services/ProductService";
const router = express.Router();

//* Get all products
router.get("/", async (req, res) => {
  const products = await GetAllProducts();
  res.status(200).send(products);
});
//* Add New Product
router.post("/new-product", async (req, res) => {
  const { ProductTitle, description, stock, price, ProductImage } = req.body;
  const { data, statusCode } = await CreateNewProduct({
    ProductTitle,
    description,
    stock,
    price,
    ProductImage,
  });
  res.status(statusCode).send(data);
});

export default router;
