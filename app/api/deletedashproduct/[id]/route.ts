// app/api/deletedashproduct/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE /api/deletedashproduct/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

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
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
