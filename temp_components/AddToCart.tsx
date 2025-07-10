"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
};

export default function AddToCart({ product }: { product: Product }) {
  const { cartItems, addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const exists = cartItems.some((item) => item.id === product.id);
    setIsInCart(exists);
  }, [cartItems, product.id]);

  const handleAdd = () => {
    if (!isInCart) {
      addToCart(product, 1); // Ajoute avec cartQuantity = 1
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isInCart}
      className={`${
        isInCart
          ? "bg-white text-red-400 cursor-not-allowed hover:bg-red-400 hover:text-white"
          : "text-lama hover:bg-lama hover:text-white"
      }`}
    >
      {isInCart ? "Added" : "Add to Cart"}
    </button>
  );
}
