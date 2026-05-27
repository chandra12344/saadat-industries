"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function ProductSearch({
  categories,
}: {
  categories: { slug: string; name: string; _count: { products: number } }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const activeCategory = searchParams.get("category") || "";

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParams("q", query);
  }

  function clearSearch() {
    setQuery("");
    updateParams("q", "");
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm text-secondary-800 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams("category", "")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-primary-700 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() =>
              updateParams(
                "category",
                activeCategory === cat.slug ? "" : cat.slug
              )
            }
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.slug
                ? "bg-primary-700 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.name} ({cat._count.products})
          </button>
        ))}
      </div>
    </div>
  );
}
