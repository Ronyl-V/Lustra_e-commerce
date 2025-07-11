import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import AddToCart from "@/components/AddToCart";
import AddQuantity from "@/components/AddQuantity";

export const dynamic = "force-dynamic"; // pour rendre la page dynamique

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // On attend la résolution de params
  const { id } = await params;
  const productId = Number(id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  const lowStockProducts = await prisma.product.findMany({
    where: {
      quantity: { lte: 40 },
      NOT: { id: productId },
    },
    orderBy: { quantity: "asc" },
    take: 4,
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Produit introuvable.
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <div className="font-sans text-gray-800 max-w-7xl mx-auto mt-22 px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image produit */}
        <div>
          <Image
            src={product.image || "/default.jpg"}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg object-contain w-full h-96 mb-6"
          />
        </div>

        {/* Infos produit */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <div className="text-2xl font-bold mb-4">{product.price} FCFA</div>

          <div className="text-sm text-red-500 font-semibold mb-2">
            {product.quantity > 0
              ? `Stock: ${product.quantity}`
              : "Out of stock"}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <AddQuantity product={product} />
            <div className="rounded-2xl ring-1 ring-lama text-red-400 w-max py-2 px-4 text-xs hover:bg-red-400 hover:text-white cursor-pointer">
              <AddToCart product={product} />
            </div>
          </div>

          <div className="border-t border-gray-300">
            <h2 className="mt-4 mb-4 text-xl text-black">Description</h2>
            <p className="text-sm text-gray-600">
              {product.description || "Aucune description disponible pour ce produit."}
            </p>
          </div>
        </div>

        {/* Produits similaires faible stock */}
        {lowStockProducts.length > 0 && (
          <div className="col-span-1 md:col-span-2 mt-10">
            <h3 className="text-lg font-semibold text-black mb-4">
              Other Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {lowStockProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/singleproduct/${p.id}`}
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-64 rounded-md overflow-hidden mb-4">
                    <Image
                      src={p.image || "/default.jpg"}
                      alt={p.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-800">{p.name}</h4>
                    <p className="text-sm text-gray-600">{p.price} FCFA</p>
                  </div>
                  <div className="mt-3 rounded-2xl ring-1 ring-lama text-red-400 w-max py-2 px-4 text-xs hover:bg-red-400 hover:text-white cursor-pointer">
                    <AddToCart product={p} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
