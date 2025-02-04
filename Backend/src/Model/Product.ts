import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
  ProductTitle: string;
  description: string;
  stock:number;
  price: number;
  ProductImage: string;
}
export const ProductSchema = new Schema<IProduct>({
  ProductTitle: { type: String, required: true },
  ProductImage: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});
export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
