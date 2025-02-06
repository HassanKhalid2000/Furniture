import express from "express";
import { GetActiveCartForUser } from "../Services/CartService";
const router = express.Router();

router.get("/", async (req, res) => {
  // TODO: create Middelware
  const cart = await GetActiveCartForUser({ userId: "s" });
  res.status(200).send(cart);
});

export default router;
