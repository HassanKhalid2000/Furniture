import { IProduct, ProductModel } from "../Model/Product"

//* Get all Products
export const GetAllProducts = async()=>{
    const products = await ProductModel.find();
    if(!products){
        return{data:"No products Found",statusCode:400}
    }
    return{data:products,statusCode:200}

} 

//* Create New Product

export const CreateNewProduct=async({ProductTitle, description, stock, price, ProductImage}:IProduct)=>{
    const newProduct = new ProductModel({ProductTitle, description, stock, price, ProductImage})
    if(!newProduct){
        return {data:"Product Not  Added",statusCode:400}
    }
    await newProduct.save()
    return {data:"Product Added Succsessfully",statusCode:200}
}