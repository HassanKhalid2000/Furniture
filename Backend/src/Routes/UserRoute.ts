import express from "express";
import { GetAllUsers, Login, Register } from "../Services/UserService";
import { UserModel } from "../Model/UserModel";
const router = express.Router();

//* Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statusCode } = await Login({ email, password });
    res.status(statusCode).json(data);
  } catch (err) {
    console.error(err);
    res.send("Internal server error").status(500);
  }
});
//* Register
router.post("/signup", async (req, res) => {
  try {
    const { fullName, phoneNumber, address, email, password, avatar } =
      req.body;
    const { data, statusCode } = await Register({
      fullName,
      phoneNumber,
      address,
      email,
      password,
      avatar,
    });
    res.status(statusCode).json(data);
  } catch (err) {
    console.error(err);
    res.send("Internal server error").status(500);
  }
});
//* Get All Users
router.get("/", async (req, res) => {
  try {
    const { data, statusCode } = await GetAllUsers();
    res.status(statusCode).send(data);
  } catch (err) {
    console.error(err);
    res.send("Internal server error").status(500);
  }
});

export default router;
