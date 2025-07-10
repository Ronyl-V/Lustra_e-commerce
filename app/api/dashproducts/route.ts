import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        quantity: parseInt(body.quantity || "0", 10),
        category: body.category || null,
        status: body.status ?? true,
        trackQuantity: body.trackQuantity ?? true,
        allowBackorder: body.allowBackorder ?? false,
        image: body.image || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}
