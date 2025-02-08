import express from "express";
import { AddItemToCart, GetActiveCartForUser } from "../Services/CartService";
import ValidateJWT, { ExtendRequest } from "../Middleware/ValidateJWT";
const router = express.Router();

router.get("/", ValidateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const cart = await GetActiveCartForUser({ userId });
  res.status(200).send(cart);
});

//* Add Item To Cart
router.post('/items',ValidateJWT,async(req:ExtendRequest,res)=>{
  const userId = req.user._id;
  const {quantity,productId} =req.body
  const{data,statusCode}=await AddItemToCart({quantity,userId,productId})
  res.status(statusCode).send(data)

}) 
export default router;
