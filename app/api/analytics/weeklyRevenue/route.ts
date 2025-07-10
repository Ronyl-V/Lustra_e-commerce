import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfWeek, endOfWeek, subWeeks, format } from "date-fns";

export async function GET() {
  try {
    const currentDate = new Date();

    // Obtenir les 6 dernières semaines
    const weeks = Array.from({ length: 6 }).map((_, i) => {
      const start = startOfWeek(subWeeks(currentDate, i), { weekStartsOn: 1 });
      const end = endOfWeek(subWeeks(currentDate, i), { weekStartsOn: 1 });

      return {
        label: `${format(start, "dd/MM")} - ${format(end, "dd/MM")}`,
        start,
        end,
      };
    }).reverse(); // Afficher de la plus ancienne à la plus récente

    const revenuePerWeek = await Promise.all(
      weeks.map(async (week) => {
        const orders = await prisma.order.findMany({
          where: {
            createdAt: {
              gte: week.start,
              lte: week.end,
            },
            status: "Pending" // ou "Paid", selon ta logique métier
          },
        });

        const total = orders.reduce((acc, order) => acc + Number(order.total), 0);

        return {
          name: week.label,
          revenue: total,
        };
      })
    );

    return NextResponse.json(revenuePerWeek);
  } catch (error) {
    console.error("Erreur API revenus hebdomadaires :", error);
    return NextResponse.json(
      { message: "Erreur serveur", detail: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
