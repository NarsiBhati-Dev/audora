"use client";

import Link from "next/link";
import React from "react";
import HoverCard from "./hover-card";
import Image from "next/image";
import { products } from "@/data/ProductsList";
import ProductItem from "./product-item";

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const textColor = scrolled ? "text-black" : "text-zinc-100";
  const buttonBg = scrolled
    ? "bg-black text-white hover:bg-neutral-800"
    : "bg-white text-black hover:bg-neutral-100";

  return (
    <nav className="relative hidden z-50 md:flex justify-between items-center font-semibold pl-12 w-full text-white">
      <ul className="flex space-x-8">
        <li className="relative z-50">
          <HoverCard triggerText={"Product"} className={textColor}>
            <div className="grid grid-cols-2 gap-6 pl-12 ">
              {/* Left column with feature list */}
              <div className="space-y-1 text-sm py-4">
                <h3 className="text-lg font-bold text-black mb-3">Products</h3>
                {products.map((item) => (
                  <ProductItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                  />
                ))}
              </div>

              {/* Right column with image */}
              <div className="bg-zinc-100 w-full p-4 rounded-r-lg space-y-2">
                <Image
                  src="/images/product-preview.webp"
                  alt="Preview"
                  width={200}
                  height={200}
                  className="rounded-md w-full h-84 object-center"
                />
              </div>
            </div>
          </HoverCard>
        </li>
        <li className={`${textColor} cursor-pointer`}>
          <Link href={"/blogs"}>Blogs</Link>
        </li>
        <li className={`${textColor} cursor-pointer`}>
          <Link href={"/pricing"}>Pricing</Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4 text-base font-semibold">
        <Link href="/login" className={` ${textColor}`}>
          Login
        </Link>
        <button className={`rounded-lg cursor-pointer px-4 py-2 ${buttonBg} `}>
          Start for Free
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
