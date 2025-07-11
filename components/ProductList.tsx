import React from "react";
import { prisma } from "@/lib/prisma";
import List from "./List";

const ProductList = async () => {
  const products = await prisma.product.findMany({
    where: { status: true },
    orderBy: { quantity: "desc" },
    take: 4,
  });

  return (
    <div className="mt-5 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="mb-8 text-2xl font-semibold">Featured Products</h1>
      <List products={products} />
    </div>
  );
};

export default ProductList;
