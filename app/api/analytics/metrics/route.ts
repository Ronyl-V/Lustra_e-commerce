import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();
    // Début du mois précédent à minuit (ex: 1er juin 00:00 si maintenant on est en juillet)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);

    // Commandes du mois actuel (depuis le début du mois précédent)
    const currentOrders = await prisma.order.findMany({
      where: { createdAt: { gte: lastMonth } },
      include: { items: true },
    });

    // Commandes avant le mois précédent (tout ce qui est plus vieux)
    const previousOrders = await prisma.order.findMany({
      where: { createdAt: { lt: lastMonth } },
      include: { items: true },
    });

    // Total Revenue
    const currentRevenue = currentOrders.reduce((acc, o) => acc + Number(o.total || 0), 0);
    const previousRevenue = previousOrders.reduce((acc, o) => acc + Number(o.total || 0), 0);
    const revenueChange = previousRevenue
      ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
      : 0;
    const revenueTrend = revenueChange >= 0 ? "up" : "down";

    // Total Sales (quantité d'articles)
    const currentSales = currentOrders.reduce(
      (acc, order) => acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
      0
    );
    const previousSales = previousOrders.reduce(
      (acc, order) => acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
      0
    );
    const salesChange = previousSales
      ? ((currentSales - previousSales) / previousSales) * 100
      : 0;
    const salesTrend = salesChange >= 0 ? "up" : "down";

    // Utilisateurs actifs (uniques par email)
    const currentUsers = new Set(currentOrders.map((order) => order.email)).size;
    const previousUsers = new Set(previousOrders.map((order) => order.email)).size;
    const usersChange = previousUsers
      ? ((currentUsers - previousUsers) / previousUsers) * 100
      : 0;
    const usersTrend = usersChange >= 0 ? "up" : "down";

    // Taux de conversion dynamique (commandes / visiteurs)
    const currentVisitors = currentUsers || 1;
    const previousVisitors = previousUsers || 1;

    const currentConversionRate = (currentOrders.length / currentVisitors) * 100;
    const previousConversionRate = (previousOrders.length / previousVisitors) * 100;

    const conversionChange = previousConversionRate
      ? ((currentConversionRate - previousConversionRate) / previousConversionRate) * 100
      : 0;
    const conversionTrend = conversionChange >= 0 ? "up" : "down";

    return NextResponse.json({
      totalRevenue: currentRevenue,
      revenueChange: revenueChange.toFixed(1),
      revenueTrend,
      totalSales: currentSales,
      salesChange: salesChange.toFixed(1),
      salesTrend,
      activeUsers: currentUsers,
      usersChange: usersChange.toFixed(1),
      usersTrend,
      conversionRate: `${currentConversionRate.toFixed(1)}%`,
      conversionChange: conversionChange.toFixed(1),
      conversionTrend,
    });
  } catch (error) {
    console.error("Erreur dans /api/analytics/metrics :", error);
    return NextResponse.json(
      {
        message: "Erreur serveur",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
