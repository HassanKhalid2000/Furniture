import { CartModel } from "../Model/Cart";

interface IcreateActiveCartForUser {
  userId: string;
}
const createActiveCartForUser = async ({
  userId,
}: IcreateActiveCartForUser) => {
  const cart = await CartModel.create({ userId , totalAmount:0 });

  await cart.save();
  return cart;
};
interface IGetActiveCartForUser {
  userId: string;
}
export const GetActiveCartForUser = async ({
  userId,
}: IGetActiveCartForUser) => {
  let cart = await CartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createActiveCartForUser({ userId });
  }
  return cart;
};
