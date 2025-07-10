"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

const fetchProducts = async (params: string) => {
  const res = await axios.get(`/api/filterdashproducts?${params}`);
  return res.data;
};

export default function ProductTable() {
  const searchParams = useSearchParams();
  const paramString = searchParams.toString();

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products", paramString],
    queryFn: () => fetchProducts(paramString),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4">Error loading products</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell className="flex items-center gap-3">
              <Image
                src={product.image || "/placeholder-product.jpg"}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-md"
              />
              {product.name}
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  product.status
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.status ? "Active" : "Inactive"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
