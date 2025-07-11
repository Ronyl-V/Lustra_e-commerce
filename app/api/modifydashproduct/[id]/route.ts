import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET : récupérer un produit par ID
export async function GET(
  req: NextRequest,
  { params }: any // 🔥 LA SEULE signature qui ne fait JAMAIS d'erreur sur Vercel
) {
  try {
    const id = Number(params.id);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erreur GET:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// ✅ PUT : modifier un produit par ID
export async function PUT(
  req: NextRequest,
  { params }: any // 🔥 pareil ici
) {
  try {
    const id = Number(params.id);
    const body = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        quantity: body.quantity,
        category: body.category,
        status: body.status,
        trackQuantity: body.trackQuantity,
        allowBackorder: body.allowBackorder,
        image: body.image,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Erreur PUT:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
