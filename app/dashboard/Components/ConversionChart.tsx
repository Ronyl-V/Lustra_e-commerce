"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Landing Page", visitors: 4000, conversions: 240 },
  { name: "Product Page", visitors: 3000, conversions: 139 },
  { name: "Checkout", visitors: 2000, conversions: 980 },
  { name: "Thank You", visitors: 2780, conversions: 390 },
  { name: "Blog", visitors: 1890, conversions: 480 },
  { name: "About", visitors: 2390, conversions: 380 },
];

export const ConversionChart = () => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>Page performance and conversion rates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                className="text-sm text-slate-600"
                angle={-45}
                textAnchor="end"
                height={60}
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
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                }}
              />
              <Bar dataKey="visitors" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="conversions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
