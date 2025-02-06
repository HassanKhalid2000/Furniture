import { UserModel } from "../Model/User";
import bcrypt from "bcrypt";

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
  return { data: "Account Created Successfuly", statusCode: 200 };
};
//* User Login
interface ILogin {
  email: string;
  password: string;
}
// TODO: Create MiddleWare
export const Login = async ({ email, password }: ILogin) => {
  const findUser = await UserModel.findOne({ email });
  if (!findUser) {
    return { data: "wrong email or password", statusCode: 400 };
  }
  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (!passwordMatch) {
    return { data: "wrong email or password", statusCode: 400 };
  }
  return { data: findUser, statusCode: 200 };
};
