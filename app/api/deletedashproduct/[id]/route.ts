// app/api/deletedashproduct/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 🔥 Typage compatible avec Next.js App Router
export async function DELETE(
  req: NextRequest,
  context: any // 👈 solution la plus sûre si erreur persistante
) {
  const id = parseInt(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Erreur suppression :", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
