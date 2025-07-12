// app/api/deal/route.ts
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
    return NextResponse.json({ error: "Failed to create deal" }, { status: 500 });
  }
}
