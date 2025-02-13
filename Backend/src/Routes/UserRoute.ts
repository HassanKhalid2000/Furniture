import express from "express";
import { GetAllUsers, Login, Register } from "../Services/UserService";
import { UserModel } from "../Model/UserModel";
const router = express.Router();

//* Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, statusCode } = await Login({ email, password });
  res.status(statusCode).send(data);
});
//* Register
router.post("/signup", async (req, res) => {
  const { fullName, phoneNumber, address, email, password, avatar } = req.body;
  const { data, statusCode } = await Register({
    fullName,
    phoneNumber,
    address,
    email,
    password,
    avatar,
  });
  res.status(statusCode).send(data);
});
//* Get All Users
router.get("/", async (req, res) => {
  const { data, statusCode } = await GetAllUsers();
  res.status(statusCode).send(data);
});

export default router;
