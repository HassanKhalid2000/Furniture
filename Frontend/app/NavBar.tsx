"use client";
import Link from "next/link";
import React from "react";
import { FaStore } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const links = [
    { title: "home", path: "/" },
    { title: "about", path: "/About" },
    { title: "furniture", path: "/Furniture" },
    { title: "blog", path: "/Blog" },
    { title: "contact us", path: "/ContactUs" },
  ];
  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <>
      <nav className="flex p-5 text-xl items-center justify-between">
        <div>
          <FaStore />
        </div>
        <div>
          <ul className="flex space-x-20">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  className={
                    link.path === currentPath
                      ? `text-zinc-950`
                      : `text-zinc-500`
                  }
                  href={link.path}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex space-x-5">
          <Link href={"/MyCart"}>
            <MdOutlineShoppingCart />
          </Link>
          <button>
            <FaRegUser />
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
