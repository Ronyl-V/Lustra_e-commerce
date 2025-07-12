import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const latestDeal = await prisma.deal.findFirst({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(latestDeal || null);
  } catch (error) {
    console.error("GET deal error:", error);
    return NextResponse.json({ error: "Failed to fetch deal" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, images, endDate } = body;

    // Validation simple mais efficace
    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      !Array.isArray(images) ||
      images.length === 0 ||
      typeof endDate !== "string" ||
      isNaN(new Date(endDate).getTime())
    ) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    // Création dans la DB
    const newDeal = await prisma.deal.create({
      data: {
        name,
        description,
        images,
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(newDeal);
  } catch (error) {
    console.error("POST deal error:", error);
    let message = "Failed to create deal";
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
