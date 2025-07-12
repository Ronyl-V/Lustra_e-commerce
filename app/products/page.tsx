import React from "react";
import Image from "next/image";
import Link from "next/link";
import Filter from "@/components/Filter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { isMobileRequest } from "@/lib/isMobile";
import MobileSearchBar from "@/components/MobileSearchBar";

export const dynamic = "force-dynamic";

type Product = NonNullable<Awaited<ReturnType<typeof prisma.product.findFirst>>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const getParam = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const currentPage = parseInt(getParam("page") || "1", 10);
  const category = getParam("cat");
  const min = getParam("min") ? parseFloat(getParam("min")!) : undefined;
  const max = getParam("max") ? parseFloat(getParam("max")!) : undefined;
  const sort = getParam("sort");
  const search = getParam("search");

  const userAgent = typeof window === "undefined" ? undefined : navigator.userAgent;
  const isMobile = isMobileRequest(userAgent);

  const perPage = isMobile ? 2 : 8;

  const whereClause: any = {};
  if (category) whereClause.category = category;
  if (min !== undefined) whereClause.price = { ...whereClause.price, gte: min };
  if (max !== undefined) whereClause.price = { ...whereClause.price, lte: max };
  if (search) whereClause.name = { contains: search, mode: "insensitive" };

  let orderByClause: any = { createdAt: "desc" };
  if (sort) {
    const [direction, field] = sort.split(" ");
    if (
      ["asc", "desc"].includes(direction) &&
      ["price", "name", "createdAt"].includes(field)
    ) {
      orderByClause = { [field]: direction };
    }
  }

  const totalProducts = await prisma.product.count({ where: whereClause });
  const totalPages = Math.ceil(totalProducts / perPage);

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: orderByClause,
    skip: (currentPage - 1) * perPage,
    take: perPage,
  });

  return (
    <>
      <NavBar />

      <div className="py-4 px-4 mt-22 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        {/* Bannière uniquement sur md+ */}
        <div className="hidden md:flex bg-red-50 px-4 justify-between h-64">
          <div className="w-2/3 flex flex-col items-center justify-center gap-8">
            <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
              Grab up to 50% off on
              <br />
              Selected Products
            </h1>
            <button className="cursor-pointer rounded-3xl bg-red-400 text-white w-max py-3 px-5 text-sm">
              Buy Now
            </button>
          </div>
          <div className="relative w-1/3">
            <Image src="/woman.png" alt="" fill className="object-contain" />
          </div>
        </div>

        {/* 🟢 Barre de recherche mobile only */}
        <MobileSearchBar />

        <Filter />

        {/* Affichage des produits */}
        <div className="mt-12 flex gap-x-4 gap-y-12 justify-between flex-wrap">
          {products.length === 0 ? (
            <p className="text-gray-500 text-sm">No products found.</p>
          ) : (
            products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* 🔻 Pagination visible mobile et desktop */}
        <div className="flex justify-center mt-9 items-center gap-2 flex-wrap">
          {/* Page précédente */}
          <Link
            href={`?page=${Math.max(currentPage - 1, 1)}`}
            className={`px-4 py-2 rounded-full text-sm ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>

          {/* Page suivante */}
          <Link
            href={`?page=${Math.min(currentPage + 1, totalPages)}`}
            className={`px-4 py-2 rounded-full text-sm ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
