"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DashFilter from "@/app/dashboard/Components/DashFilter";
import DashProductTable from "@/app/dashboard/Components/DashProductTable";
import SearchBar from "../Components/SearchBar";
import SideBar from "../Components/SideBar";
import React, { useState } from "react";

export default function ProductsPage() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      {/* Fixed Sidebar with dynamic width */}
      <div
        className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>

      {/* Main Content shifted right according to sidebar state */}
      <div
        className={`transition-all duration-300 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 space-y-6 ${
          isExpanded ? "ml-64" : "ml-20"
        }`}
      >
        {/* Add Product Button */}
        <div className="flex justify-end mt-2 mr-2">
          <Link href="/dashboard/dashAddProduct">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Product Card */}
        <Card>
          <CardHeader className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="relative w-64">
                <SearchBar />
              </div>
              <DashFilter />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <DashProductTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
