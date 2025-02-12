import { CartModel } from "../Model/Cart";
import { ProductModel } from "../Model/Product";

//* Create Active Cart For User
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
//* Get Active Cart For User
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
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (existsInCart) {
    return { data: "Item already exits in cart", statusCode: 400 };
  }
  const product = await ProductModel.findById(productId);
  if (!product) {
    return { data: "product not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "low item for stock", statusCode: 400 };
  }
  cart.items.push({ product: productId, quantity, unitPrice: product.price });
  // update total amount
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
//*  Update Item In Cart
interface IUpdateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const UpdateItemInCart = async ({
  userId,
  productId,
  quantity,
}: IUpdateItemInCart) => {
  const cart = await GetActiveCartForUser({ userId });
  const exixstInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!exixstInCart) {
    return { data: "Item Does Not exisits In Cart", statusCode: 400 };
  }
  const product = await ProductModel.findById(productId);
  if (!product) {
    return { data: "Product Not Found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "Low stock for Item", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );
  let total = otherCartItems.reduce((sum, product) => {
    sum += product.unitPrice * product.quantity;
    return sum;
  }, 0);
  exixstInCart.quantity = quantity;
  total += exixstInCart.quantity * exixstInCart.unitPrice;
  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

//* Delete Item From Cart
interface IDeleteItemFromCart {
  userId: string;
  productId: any;
}
export const DeleteItemFromCart = async ({
  userId,
  productId,
}: IDeleteItemFromCart) => {
  const cart = await GetActiveCartForUser({ userId });
  const exisitInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!exisitInCart) {
    return { data: "Item does not exisits in cart", statusCode: 400 };
  }
  const product = await ProductModel.findById(productId);
  if (!product) {
    return { data: "product not found", statusCode: 400 };
  }
  const otherItemsInCart = cart.items.filter(
    (p) => p.product.toString() !== productId
  );
  const total = otherItemsInCart.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  cart.totalAmount = total;
  cart.items = otherItemsInCart;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
//* Clear Cart
interface IClearCart {
  userId: string;
}
export const ClearCart = async ({ userId }: IClearCart) => {
  const cart = await GetActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
