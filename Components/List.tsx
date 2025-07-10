"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import AddToCart from "./AddToCart";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
};

function List({ products }: { products: Product[] }) {
  const { addToCart } = useCart();

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <Link href={`/singleproduct/${product.id}`}>
            <div className="relative w-full h-80">
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
            </div>
          </Link>

          <div className="flex justify-between">
            <span className="font-medium w-full">{product.name}</span>
            <span className="font-semibold">{product.price} FCFA</span>
          </div>

          <div className="rounded-2xl ring-1 ring-lama text-red-400 w-max py-2 px-4 text-xs hover:bg-red-400 hover:text-white">
            {/* Correction ici : ajout de cartQuantity */}
            <AddToCart product={product} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
