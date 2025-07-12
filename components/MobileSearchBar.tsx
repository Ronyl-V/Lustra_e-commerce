// components/MobileSearchBar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MobileSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    params.set("search", newSearch);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="block md:hidden mt-4">
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleChange(e);
        }}
        className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm"
      />
    </div>
  );
}
