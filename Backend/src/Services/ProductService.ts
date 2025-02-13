import { IProduct, ProductModel } from "../Model/ProductModel";

//* Get all Products
export const GetAllProducts = async () => {
  return await ProductModel.find();
};

//* Create New Product
export const CreateNewProduct = async ({
  ProductTitle,
  description,
  stock,
  price,
  ProductImage,
}: IProduct) => {
  const newProduct = new ProductModel({
    ProductTitle,
    description,
    stock,
    price,
    ProductImage,
  });
  if (!newProduct) {
    return { data: "Product Not  Added", statusCode: 400 };
  }
  await newProduct.save();
  return { data: "Product Added Succsessfully", statusCode: 200 };
};

//* Seed Initial Products
export const SeedInitailProducts = async () => {
  const products = [
    {
      ProductTitle: "chair",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione dicta laudantium, dolor velit enim, veniam labore sed at ",
      stock: 5,
      price: 300,
      ProductImage: "/about-img.jpg",
    },
    {
      ProductTitle: "bed",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione dicta laudantium, dolor velit enim, veniam labore sed at ",
      stock: 2,
      price: 2500,
      ProductImage: "/f2.png",
    },
    {
      ProductTitle: "sopha",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione dicta laudantium, dolor velit enim, veniam labore sed at ",
      stock: 20,
      price: 100,
      ProductImage: "/decoration-img.png",
    },
  ];
  const exsistingProducts = await GetAllProducts();
  if (exsistingProducts.length === 0) {
    await ProductModel.insertMany(products);
  }
};
