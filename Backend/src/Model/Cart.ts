import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IProduct } from "./Product";

const cartStatusEnum=["active","completed"]

export interface ICartItem extends Document {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}
export interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true,default:1 },
});

export const CartSchema=new Schema<ICart>({
    userId:{type:Schema.Types.ObjectId,ref:'User',required:true},
    items:{type:[CartItemSchema],required:true},
    totalAmount:{type:Number,required:true},
    status:{type:String,enum:cartStatusEnum,default:"active"}

})
export const CartModel=mongoose.model<ICart>("Cart",CartSchema)















