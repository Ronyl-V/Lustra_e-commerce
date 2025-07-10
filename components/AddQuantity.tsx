'use client';

import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number; // Stock
};

export default function AddQuantity({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        className="cursor-pointer border px-3 py-1"
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="cursor-pointer border px-3 py-1"
        onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
      >
        +
      </button>
    </div>
  );
}
