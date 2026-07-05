"use client";

import React from "react";
import { Search, ArrowUpDown, ChevronDown } from "lucide-react";
import { usePlayerStore, SortOption } from "@/store/player-store";

export function SearchBar() {
  const searchQuery = usePlayerStore((state) => state.searchQuery);
  const setSearchQuery = usePlayerStore((state) => state.setSearchQuery);
  
  const sortBy = usePlayerStore((state) => state.sortBy);
  const setSortBy = usePlayerStore((state) => state.setSortBy);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Terbaru" },
    { value: "name-asc", label: "Nama A-Z" },
    { value: "name-desc", label: "Nama Z-A" },
    { value: "most-plays", label: "Main Terbanyak" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-text-secondary" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari berdasarkan nama atau ID player..."
          className="block w-full rounded-xl border border-border-custom bg-surface py-2.5 pl-10 pr-4 text-sm text-text-main placeholder-text-secondary focus:border-brand-primary focus:outline-hidden focus:ring-1 focus:ring-brand-primary/30 transition-all"
        />
      </div>

      {/* Sorting Dropdown */}
      <div className="relative flex items-center min-w-[160px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <ArrowUpDown className="h-4 w-4 text-text-secondary" />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="block w-full appearance-none rounded-xl border border-border-custom bg-surface py-2.5 pl-10 pr-10 text-sm text-text-main focus:border-brand-primary focus:outline-hidden focus:ring-1 focus:ring-brand-primary/30 transition-all cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
