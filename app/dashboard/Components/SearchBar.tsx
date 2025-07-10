"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-64">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
        onClick={handleSearch}
      />
      <Input
        className="w-full pl-9"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
    </div>
  );
}
