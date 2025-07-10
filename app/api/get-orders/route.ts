import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc", // Assure-toi que "createdAt" existe bien dans ton modèle `order`
      },
    });

    return NextResponse.json(orders); // OK : retourne un tableau
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
