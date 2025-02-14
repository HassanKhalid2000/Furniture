import { UserModel } from "../Model/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//* Get All Users
export const GetAllUsers = async () => {
  const userData = await UserModel.find();
  if (!userData) {
    return { data: "no data found", statusCode: 400 };
  }
  return { data: userData, statusCode: 200 };
};
//* Create New User Account
interface IRegiter {
  fullName: string;
  phoneNumber: number;
  address: string;
  email: string;
  password: string;
  avatar: string;
}
export const Register = async ({
  fullName,
  phoneNumber,
  address,
  email,
  password,
  avatar,
}: IRegiter) => {
  const findUser = await UserModel.findOne({ email });
  if (findUser) {
    return { data: "User Already Exisits", statusCode: 400 };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    fullName,
    phoneNumber,
    address,
    email,
    password: hashedPassword,
    avatar,
  });
  await newUser.save();
  return {
    data: generateJWT({ fullName, phoneNumber, address, email, avatar }),
    statusCode: 200,
  };
};
//* User Login
interface ILogin {
  email: string;
  password: string;
}
export const Login = async ({ email, password }: ILogin) => {
  try{

    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return { data: "wrong email or password", statusCode: 400 };
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return { data: "wrong email or password", statusCode: 400 };
    }
    return {
      data: generateJWT({
        email,
        fullName: findUser.fullName,
        phoneNumber: findUser.phoneNumber,
        address: findUser.address,
        avatar: findUser.avatar,
      }),
      statusCode: 200,
    };
  }catch(err){console.error(err);return{data:"Internal server error",statusCode:500}}
  };
//* Generate JsonWebToken
const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.SECRET_KEY||"");
};
