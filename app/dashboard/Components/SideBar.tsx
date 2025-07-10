"use client";

import React from "react";
import {
  BarChart3,
  Home,
  ShoppingCart,
  Tag,
  Package,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import NavLink from "@/app/dashboard/NavLink";
import { useRouter } from "next/navigation";

type AppSidebarProps = {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Products", url: "/dashboard/dashproducts", icon: Package },
  { title: "Orders", url: "/dashboard/dashorder", icon: ShoppingCart },
  { title: "Deals", url: "/dashboard/dashdeals", icon: Tag },
  { title: "Analytics", url: "/dashboard/dashanalytics", icon: BarChart3 },
];

const AppSidebar: React.FC<AppSidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {/* Overlay mobile when sidebar open */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <Sidebar
        className={`fixed top-0 left-0 h-screen z-50 bg-white border-r transition-all duration-300 flex flex-col justify-between
          ${isExpanded ? "w-64" : "w-20"}
          lg:relative lg:z-auto`}
      >
        {/* HEADER */}
        <SidebarHeader className="p-4 border-b flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={toggleSidebar}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            {isExpanded && (
              <span className="ml-2 text-lg font-bold text-gray-900">Lustra</span>
            )}
          </div>

          {/* Hamburger icon for mobile */}
          <button
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {isExpanded ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </SidebarHeader>

        {/* CONTENT */}
        <SidebarContent className="px-2 flex-grow overflow-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        href={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
                          !isExpanded ? "justify-center" : ""
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {isExpanded && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter className="p-2 border-t">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full flex items-center text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 ${
              !isExpanded ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-4 w-4 mr-3" />
            {isExpanded && <span>Logout</span>}
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
