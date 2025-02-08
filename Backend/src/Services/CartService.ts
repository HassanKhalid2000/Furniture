import { CartModel } from "../Model/Cart";
import { ProductModel } from "../Model/Product";

interface IcreateActiveCartForUser {
  userId: string;
}
const createActiveCartForUser = async ({
  userId,
}: IcreateActiveCartForUser) => {
  const cart = await CartModel.create({ userId, totalAmount: 0 });

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

//* AddItemToCart
interface IAddItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const AddItemToCart = async ({
  userId,
  productId,
  quantity,
}: IAddItemToCart) => {
  const cart = await GetActiveCartForUser({ userId });
  const existsInCart = cart.items.find((p) => p.product.toString() === productId);
  if (existsInCart) {
    return { data: "Item already exits in cart", statusCode: 400 };
  }
  const product = await ProductModel.findById(productId);
  if (!product) {
    return { data: "product not found", statusCode: 400 };
  }
  if(product.stock<quantity){
    return{data:"low item for stock",statusCode:400}
  }
  cart.items.push({ product: productId, quantity, unitPrice: product.price });
  // update total amount
  cart.totalAmount+=product.price*quantity
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
