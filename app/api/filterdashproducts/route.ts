import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const sort = searchParams.get("sort"); 
  const search = searchParams.get("search");

  const whereClause: any = {};

  if (status === "active") whereClause.status = true;
  else if (status === "inactive") whereClause.status = false;

  if (category) whereClause.category = category;

  if (min) {
    whereClause.price = { ...whereClause.price, gte: parseFloat(min) };
  }

  if (max) {
    whereClause.price = { ...whereClause.price, lte: parseFloat(max) };
  }

  //  Ajout de la recherche par nom
  if (search) {
    whereClause.name = {
      contains: search,
      mode: "insensitive", // ignore la casse
    };
  }

  let orderByClause: any = { createdAt: "desc" }; // Valeur par défaut
  if (sort) {
    const [order, field] = sort.split(" ");
    if (
      ["asc", "desc"].includes(order) &&
      ["price", "name", "createdAt"].includes(field)
    ) {
      orderByClause = { [field]: order };
    }
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: orderByClause,
  });

  return NextResponse.json(products);
}
