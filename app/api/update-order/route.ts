import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const { orderId, newStatus } = await req.json();

  if (!orderId || !newStatus) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
    return NextResponse.json({ message: "Status updated", order: updatedOrder });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
