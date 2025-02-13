import { CartModel } from "../Model/CartModel";
import { IOrder, IOrderItem, OrderModel } from "../Model/OrderModel";
import { ProductModel } from "../Model/ProductModel";
import { IUser, UserModel } from "../Model/UserModel";
// try{}catch(err){console.error(err)}
// if(!cart){return{data:"no cart Found",statusCode:400}}

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
  try {
    let cart = await CartModel.findOne({ userId, status: "active" });
    if (!cart) {
      cart = await createActiveCartForUser({ userId });
    }
    return cart;
  } catch (err) {
    console.error(`somthing went rong ${err}`);
  }
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
  if (!cart) {
    return { data: "no cart Found", statusCode: 400 };
  }
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
  try {
    const cart = await GetActiveCartForUser({ userId });
    if (!cart) {
      return { data: "no cart Found", statusCode: 400 };
    }
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
  } catch (err) {
    console.error(err);
    return { data: "Internal Server Error", statusCode: 500 };
  }
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
  try {
    const cart = await GetActiveCartForUser({ userId });
    if (!cart) {
      return { data: "no cart Found", statusCode: 400 };
    }
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
  } catch (err) {
    console.error(err);
    return { data: "Internal Server Error", statusCode: 500 };
  }
};
//* Clear Cart
interface IClearCart {
  userId: string;
}
export const ClearCart = async ({ userId }: IClearCart) => {
  try {
    const cart = await GetActiveCartForUser({ userId });
    if (!cart) {
      return { data: "Cannot find cart", statusCode: 400 };
    }
    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
  } catch (err) {
    console.error(err);
    return { data: "Internal Server Error", statusCode: 500 };
  }
};

interface ICheckout {
  userId: string;
}
export const Checkout = async ({ userId }: ICheckout) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return { data: "user Not Found in Database", statusCode: 400 };
    }
    const cart = await GetActiveCartForUser({ userId });
    if (!cart) {
      return { data: "no cart found", statusCode: 400 };
    }
    const orderItems: IOrderItem[] = [];
    for (const item of cart.items) {
      const product = await ProductModel.findById(item.product);
      if (!product) {
        return { data: "Product not found", statusCode: 400 };
      }
      const orderItem: IOrderItem = {
        ProductTitle: product.ProductTitle,
        description: product.description,
        price: item.unitPrice,
        ProductImage: product.ProductImage,
        quantity: item.quantity,
      };
      orderItems.push(orderItem);
    }
    const order = await OrderModel.create({
      userId,
      orderItems,
      fullName: user.fullName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      totalAmount: cart.totalAmount,
    });
    await order.save();
    cart.status = "completed";
    await cart.save();
    return { data: order, statusCode: 200 };
  } catch (err) {
    console.error(err);
    return { data: "Internal Server Error", statusCode: 500 };
  }
};
