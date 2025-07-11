"use client";

import { createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot"; // ✅ Import nécessaire

const SidebarContext = createContext<{ state: "expanded" | "collapsed" }>({ state: "expanded" });

export const Sidebar = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <aside className={cn("w-64 h-screen", className)}>{children}</aside>;
};

export const SidebarHeader = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div className={cn("border-b p-4", className)}>{children}</div>
);

export const SidebarContent = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div className={cn("flex-1 overflow-y-auto", className)}>{children}</div>
);

export const SidebarFooter = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div className={cn("border-t p-4", className)}>{children}</div>
);

export const SidebarGroup = ({ children }: { children: ReactNode }) => <div>{children}</div>;

export const SidebarGroupContent = ({ children }: { children: ReactNode }) => <div>{children}</div>;

export const SidebarMenu = ({ children }: { children: ReactNode }) => <ul className="space-y-1">{children}</ul>;

export const SidebarMenuItem = ({ children }: { children: ReactNode }) => <li>{children}</li>;

/* ✅ Composant corrigé avec support de asChild */
type SidebarMenuButtonProps = {
  children: ReactNode;
  isActive?: boolean;
  asChild?: boolean;
};

export const SidebarMenuButton = ({ children, isActive, asChild = false }: SidebarMenuButtonProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "cursor-pointer px-3 py-2 rounded-lg text-sm hover:bg-gray-100 transition",
        isActive ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-700"
      )}
    >
      {children}
    </Comp>
  );
};

// Hook pour gérer l’état étendu ou non
export const useSidebar = () => {
  return useContext(SidebarContext);
};
