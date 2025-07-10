"use client";
import React, { useEffect, useState } from "react";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  BarChart3Icon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";

export const MetricsCards = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("/api/analytics/metrics");
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error("Erreur lors du fetch des métriques", err);
      }
    };

    fetchMetrics();
  }, []);

  if (!metrics) return <p>Chargement des données…</p>;

  const metricsData = [
   {
    title: "Total Revenue",
    value: `FCFA ${metrics.totalRevenue?.toLocaleString() ?? "0"}`,
    change: `${metrics.revenueChange ?? 0}%`,
    trend: metrics.revenueTrend ?? "up",
    icon: DollarSignIcon,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Active Users",
    value: metrics.activeUsers ?? 0,
    change: `${metrics.usersChange ?? 0}%`,
    trend: metrics.usersTrend ?? "up",
    icon: UsersIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
    {
      title: "Sales",
      value: metrics.totalSales,
      change: `${metrics.salesChange}%`,
      trend: metrics.salesTrend,
      icon: ShoppingCartIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
  title: "Conversion Rate",
  value: metrics.conversionRate,
  change: `${metrics.conversionChange}%`,
  trend: metrics.conversionTrend,
  icon: BarChart3Icon,
  color: "text-orange-600",
  bgColor: "bg-orange-50",
},

  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => {
        const Icon = metric.icon;
        const isUp = metric.trend === "up";
        return (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
              <div className="flex items-center mt-2">
                {isUp ? (
                  <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    isUp
                      ? "text-green-700 bg-green-50"
                      : "text-red-700 bg-red-50"
                  }`}
                >
                  {metric.change}
                </Badge>
                <span className="text-xs text-slate-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
