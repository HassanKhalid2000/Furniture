"use client";
import Link from "next/link";
import React from "react";

const TabBar = () => {
  return (
    <>
      <div className="text-xl flex gap-5 p-5 ">
        <Link href={"/AdminDashboard/UserDashboard"}>Users</Link>
        <Link href={"/AdminDashboard/ProductDachboard"}>Products</Link>
      </div>
    </>
  );
};

export default TabBar;
