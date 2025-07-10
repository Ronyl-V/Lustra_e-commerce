"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { MetricsCards } from "@/app/dashboard/Components/MetricsCards";
import { RevenueChart } from "@/app/dashboard/Components/RevenueChart";
import SideBar from "../Components/SideBar";
import React, { useState } from "react";

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      {/* Fixed Sidebar with dynamic width */}
      <div
        className={`fixed left-0 top-0 h-screen z-50 border-r bg-white shadow-md transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>

      {/* Main Content shifted based on sidebar state */}
      <div
        className={`transition-all duration-300 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 ${
          isExpanded ? "ml-64" : "ml-20"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
              <p className="text-slate-600 mt-1">
                Track your business performance and insights
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <MetricsCards />

          {/* Main Charts Section */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <RevenueChart />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Index;
