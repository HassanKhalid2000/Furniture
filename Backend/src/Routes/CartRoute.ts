import express from "express";
import {
  AddItemToCart,
  ClearCart,
  DeleteItemFromCart,
  GetActiveCartForUser,
  UpdateItemInCart,
} from "../Services/CartService";
import ValidateJWT, { ExtendRequest } from "../Middleware/ValidateJWT";
const router = express.Router();

router.get("/", ValidateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const cart = await GetActiveCartForUser({ userId });
  res.status(200).send(cart);
});

//* Add Item To Cart
router.post("/items", ValidateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const { quantity, productId } = req.body;
  const { data, statusCode } = await AddItemToCart({
    quantity,
    userId,
    productId,
  });
  res.status(statusCode).send(data);
});

//* Update Item In Cart
router.put("/items", ValidateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const { quantity, productId } = req.body;
  const { data, statusCode } = await UpdateItemInCart({
    userId,
    quantity,
    productId,
  });
  res.status(statusCode).send(data);
});

//* Delete Item From Cart
router.delete(
  "/items/:productId",
  ValidateJWT,
  async (req: ExtendRequest, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
    const { data, statusCode } = await DeleteItemFromCart({
      userId,
      productId,
    });
    res.status(statusCode).send(data);
  }
);
//* Clear Cart
router.delete('/',ValidateJWT,async(req:ExtendRequest,res)=>{
  const userId=req.user._id;
  const {data,statusCode}= await ClearCart({userId})
  res.status(statusCode).send(data)
}) 
export default router;
