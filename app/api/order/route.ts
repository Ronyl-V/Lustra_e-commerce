import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return NextResponse.json(
      {
        message: "Erreur serveur lors de la récupération des commandes",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, paymentMethod, cartItems, totalAmount } = body;

    console.log("Body reçu:", body); // debug

    // Validation des champs
    if (
      !name ||
      !email ||
      !phone ||
      !paymentMethod ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0 ||
      typeof totalAmount !== "number"
    ) {
      return NextResponse.json(
        { message: "Champs manquants ou invalides" },
        { status: 400 }
      );
    }

    // Création de la commande
    const order = await prisma.order.create({
      data: {
        name,
        email,
        phone,
        paymentMethod,
        total: totalAmount,
        status: "Pending",
        items: {
          create: cartItems.map((item: any) => ({
            productId: Number(item.id),
            name: item.name,
            image: item.image || "",
            price: Number(item.price),
            quantity: Number(item.cartQuantity),
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Erreur enregistrement commande :", error);
    return NextResponse.json(
      { message: "Erreur serveur", detail: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
