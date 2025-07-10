"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/Components/AddToCart";

type Product = {
  id: number;
  name: string;
  image: string | null;
  price: number;
  rating?: number;
  quantity: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
      
      {/* Image with hover opacity effect */}
      <Link href={`/singleproduct/${product.id}`} className="relative w-full h-80 rounded-md overflow-hidden block">
        <Image
          src={product.image || "/product.png"}
          alt={product.name}
          fill
          sizes="25vw"
          className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
        />
        <Image
          src={product.image || "/product.png"}
          alt={product.name}
          fill
          sizes="25vw"
          className="absolute object-cover rounded-md"
        />
      </Link>

      {/* Name and Price */}
      <div className="flex justify-between text-gray-900 font-medium">
        <span className="w-full">{product.name}</span>
        <span>{product.price} FCFA</span>
      </div>

      {/* Add to Cart button */}
      <div className="rounded-2xl ring-1 ring-lama text-red-400 w-max py-2 px-4 text-xs hover:bg-red-400 hover:text-white">
     <AddToCart product={product} />
      </div>
    </div>
  );
}
