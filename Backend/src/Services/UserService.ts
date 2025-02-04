import { UserModel } from "../Model/User";
import bcrypt from "bcrypt"


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
interface ILogin{
    email:string;
    password:string;
}
export const Login = async ({email,password}:ILogin) => {
    const findUser = await UserModel.findOne({email})
    if(!findUser){
      return {data:"wrong email or password",statusCode:400}
    }
    const passwordMatch  = password===findUser.password
};
