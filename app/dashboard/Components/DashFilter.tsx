"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());

    if (value === "" || value === null) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-6">
      {/* Filters Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4">
        <select
          name="category"
          className="bg-white px-4 py-2 rounded-lg text-sm border border-gray-300 w-full sm:w-auto"
          onChange={handleFilterChange}
          value={searchParams.get("category") || ""}
        >
          <option value="">All Categories</option>
          <option value="New Arrival">New Arrival</option>
          <option value="Popular">Popular</option>
        </select>

        <input
          type="number"
          name="min"
          placeholder="Min Price"
          className="w-full sm:w-24 px-3 py-2 rounded-lg text-sm border border-gray-300"
          onChange={handleFilterChange}
        />

        <input
          type="number"
          name="max"
          placeholder="Max Price"
          className="w-full sm:w-24 px-3 py-2 rounded-lg text-sm border border-gray-300"
          onChange={handleFilterChange}
        />

        <select
          name="status"
          className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 w-full sm:w-auto"
          onChange={handleFilterChange}
          value={searchParams.get("status") || ""}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Sort Section */}
      <div className="w-full sm:w-auto">
        <select
          name="sort"
          className="bg-white px-4 py-2 rounded-lg text-sm border border-gray-300 w-full"
          onChange={handleFilterChange}
        >
          <option value="">Sort by</option>
          <option value="asc price">Price: Low to High</option>
          <option value="desc price">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
