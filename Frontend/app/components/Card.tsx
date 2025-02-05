"use client"
import React, { useEffect, useState } from "react";
const BASE_URL = "http://localhost:3001/Product";
interface IData {
  _id: string;
  stock: number;
  ProductTitle: string;
  price: number;
  ProductImage: string;
  description: string;
}

const Card = () => {
  const [data, setData] = useState<IData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${BASE_URL}`);
      const response: IData[] = await data.json();
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-3 p-5 gap-5 sm:grid-cols-2  ">
        {data.map((item) => (
          <div
            key={item._id}
            className="card rounded-2xl bg-base-100 p-5 col-span-1  shadow-xl"
          >
            <figure>
              <img
                className="h-72"
                src={item.ProductImage}
                alt={item.ProductTitle}
              />
            </figure>
            <div className="card-body">
              <h1 className="card-title ">{item.ProductTitle}</h1>
              <p>{item.description}</p>
              <div className="card-actions flex items-center justify-between ">
                <span className="font-bold">$ {item.price}</span>
                <button className="secbtn mt-5 ">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div> 
    </>
  );
};

export default Card;
