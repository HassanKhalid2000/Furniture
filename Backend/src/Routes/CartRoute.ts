import express from "express";
import {
  AddItemToCart,
  Checkout,
  ClearCart,
  DeleteItemFromCart,
  GetActiveCartForUser,
  UpdateItemInCart,
} from "../Services/CartService";
import ValidateJWT, { ExtendRequest } from "../Middleware/ValidateJWT";
const router = express.Router();
//* Get Active Cart For User
router.get("/", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await GetActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch (err) {
    console.error("something went wrong! try again later", err);
  }
});

//* Add Item To Cart
router.post("/items", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { quantity, productId } = req.body;
    const { data, statusCode } = await AddItemToCart({
      quantity,
      userId,
      productId,
    });
    res.status(statusCode).send(data);
  } catch (err) {
    console.error("something went wrong! try again later", err);
  }
});

//* Update Item In Cart
router.put("/items", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;

    const { quantity, productId } = req.body;
    const { data, statusCode } = await UpdateItemInCart({
      userId,
      quantity,
      productId,
    });
    res.status(statusCode).send(data);
  } catch (err) {
    console.error("something went wrong! try again later", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//* Delete Item From Cart
router.delete(
  "/items/:productId",
  ValidateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const { data, statusCode } = await DeleteItemFromCart({
        userId,
        productId,
      });
      res.status(statusCode).send(data);
    } catch (err) {
      console.error("something went wrong! try again later", err);
    }
  }
);
//* Clear Cart
router.delete("/", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { data, statusCode } = await ClearCart({ userId });
    res.status(statusCode).send(data);
  } catch (err) {
    console.error("something went wrong! try again later", err);
  }
});
//* Checkout
router.post("/checkout", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { data, statusCode } = await Checkout({ userId });
    res.status(statusCode).send(data);
  } catch (err) {
    console.error("something went wrong! try again later", err);
  }
});
export default router;
