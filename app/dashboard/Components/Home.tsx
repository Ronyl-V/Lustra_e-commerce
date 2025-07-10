"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsCards } from "@/app/dashboard/Components/MetricsCards";
import SideBar from "../Components/SideBar";
import { RevenueChart } from "./RevenueChart";
import ProductTable from "./ProductTable";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      {/* Sidebar dynamique */}
      <div
        className={`fixed left-0 top-0 h-screen z-50 border-r bg-white shadow-md transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>

      {/* Contenu principal avec marge dynamique */}
      <div
        className={`transition-all duration-300 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 ${
          isExpanded ? "ml-64" : "ml-20"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <MetricsCards />

          {/* Main Charts Section */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart />
                <Card className="border-0 shadow-md">
                  <ProductTable />
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Index;
