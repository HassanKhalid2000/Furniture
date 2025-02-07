import express from "express";
import { GetActiveCartForUser } from "../Services/CartService";
import ValidateJWT, { ExtendRequest } from "../Middleware/ValidateJWT";
const router = express.Router();

router.get("/", ValidateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const cart = await GetActiveCartForUser({ userId });
  res.status(200).send(cart);
});

export default router;
