import React from "react";
interface IData {
    _id:string
  title: string;
  price: number;
  image: string;
  description: string;
}
const Card = async () => {
//   const res = await fetch("mongodb://localhost:27017/Furniture/products");
//   console.log(res);
  
//   const data: IData[] = await res.json();
//   return (
//     <div>
//       {data.map((item) => (
//         <div key={item._id}>
//           <div>{item.image}</div>
//           <div>{item.title}</div>
//           <div>{item.description}</div>
//           <div>{item.price}</div>
//         </div>
//       ))}
//     </div>
  // );
};

export default Card;
