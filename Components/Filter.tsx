"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value === "") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 mb-10 flex justify-between flex-wrap gap-4">
      <div className="flex gap-4 flex-wrap items-center">
        {/* Filter by Category */}
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
          defaultValue={searchParams.get("cat") || ""}
        >
          <option value="">All Categories</option>
          <option value="New Arrival">New Arrival</option>
          <option value="Popular">Popular</option>
        </select>

        {/* Filter by Price */}
        <input
          type="number"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl px-3 py-2 pl-2 w-24 ring-1 ring-gray-400"
          defaultValue={searchParams.get("min") || ""}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl px-3 py-2 pl-2 w-24 ring-1 ring-gray-400"
          defaultValue={searchParams.get("max") || ""}
          onChange={handleFilterChange}
        />
      </div>

      <div>
        {/* Sort */}
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
          defaultValue={searchParams.get("sort") || ""}
        >
          <option value="">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
