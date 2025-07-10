"use client";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type RevenueData = {
  name: string;
  revenue: number;
};

export const RevenueChart = () => {
  const [data, setData] = useState<RevenueData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics/weeklyRevenue");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Erreur lors du fetch des revenus mensuels", err);
      }
    }
    fetchData();
  }, []);

  if (data.length === 0) return <p>Chargement du graphique...</p>;

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-0 shadow-md">
      <div className="px-6">
        <h2 className="font-semibold text-lg">Revenue Overview</h2>
        <p className="text-muted-foreground text-sm">
          Weekly revenue trends
        </p>
      </div>

      <div className="px-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-sm text-slate-600"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-sm text-slate-600"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
