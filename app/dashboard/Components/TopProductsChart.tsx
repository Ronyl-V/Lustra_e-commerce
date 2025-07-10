"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "iPhone 15", value: 400, color: "#3b82f6" },
  { name: "MacBook Pro", value: 300, color: "#10b981" },
  { name: "AirPods Pro", value: 200, color: "#f59e0b" },
  { name: "iPad Air", value: 150, color: "#ef4444" },
  { name: "Apple Watch", value: 100, color: "#8b5cf6" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-sm font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const TopProductsChart = () => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Best selling products by revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
