import express from "express";
import { CreateNewProduct, GetAllProducts } from "../Services/ProductService";
const router = express.Router();

//* Get all products
router.get("/", async (req, res) => {
  try {
    const products = await GetAllProducts();
    res.status(200).send(products);
  } catch (err) {
    console.error("something went wrong! try again later", err);
    res.send("internal server error").status(500)
  }
});
//* Add New Product
router.post("/new-product", async (req, res) => {
  try {
    const { ProductTitle, description, stock, price, ProductImage } = req.body;
    const { data, statusCode } = await CreateNewProduct({
      ProductTitle,
      description,
      stock,
      price,
      ProductImage,
    });
    res.status(statusCode).send(data);
  } catch (err) {
    console.error("something went wrong! try again later", err);
  }
});

export default router;
