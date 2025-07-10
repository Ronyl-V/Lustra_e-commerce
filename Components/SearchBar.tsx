"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    if (search === "") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      params.set("page", "1"); // facultatif : revenir à la première page
      router.push(`?${params.toString()}`);
    }
  }, [search]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search.trim());
      params.set("page", "1"); // revenir à la première page
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 h-8 p-2 rounded-md w-[200px] sm:w-[300px]"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 bg-transparent outline-none"
      />
      <button type="submit" className="cursor-pointer">
        <Image src="/search.png" alt="" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
