import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IOrderItem {
  ProductTitle: string;
  description: string;
  price: number;
  ProductImage: string;
  quantity:number
}
export interface IOrder extends Document {
  userId: ObjectId | string;
  address: string;
  fullName: string;
  phoneNumber:  number;
  orderItems: IOrderItem[];
  totalAmount: number;
}
const orederItemSchema = new Schema<IOrderItem>({
  ProductTitle: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  ProductImage: { type: String, required: true },
});
const OrederSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  fullName: { type: String, required: true },
  address: {type: String, required: true  },
  phoneNumber: {type: Number, required: true  },
  orderItems: [orederItemSchema],
  totalAmount: { type: Number, required: true },
});
export const OrderModel = mongoose.model<IOrder>("Order",OrederSchema)
