import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../Model/UserModel";
export interface ExtendRequest extends Request {
  user?: any;
}
const ValidateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader) {
    res.status(403).send("Authorization Header Not Provided");
    return;
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("Token Not Provided");
    return;
  }
  jwt.verify(token, "EDA5BB72B5356FBA727C82C7AA4B8", async (err, payload) => {
    if (err) {
      res.status(403).send(" Invalid Token ");
      return;
    }
    if (!payload) {
      res.status(403).send("Invalid Token Pyload");
      return;
    }
    const userPayload = payload as { email: string };
    const user = await UserModel.findOne({ email: userPayload.email });
    req.user = user;
    next();
  });
};

export default ValidateJWT;
