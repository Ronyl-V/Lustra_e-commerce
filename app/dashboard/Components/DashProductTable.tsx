"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteButton from "./DeleteButton";
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

export default function DashProductTable() {
  const searchParams = useSearchParams();
  const paramString = searchParams.toString();

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products", paramString],
    queryFn: () => fetchProducts(paramString),
  });

  if (isLoading) return <p className="p-4">Chargement...</p>;
  if (isError) return <p className="p-4">Erreur lors du chargement</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
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
            <TableCell>{product.price} FCFA</TableCell>
            <TableCell>{product.quantity}</TableCell>
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
            <TableCell className="flex gap-2">
              <Link href={`/dashboard/dashAddProduct?id=${product.id}`}>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <DeleteButton productId={product.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
