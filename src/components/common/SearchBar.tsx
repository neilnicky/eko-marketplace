"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useCallback, useState } from "react";
import { Input } from "../ui/input";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  searchRoute?: string;
}

export default function SearchBar({
  placeholder = "Search on Ekonavi",
  className = "",
  onSearch,
  searchRoute = "/search",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const executeSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;

      if (onSearch) {
        onSearch(trimmedQuery);
      } else {
        router.push(`${searchRoute}?q=${encodeURIComponent(trimmedQuery)}`);
      }

      setSearchTerm("");
    },
    [onSearch, router, searchRoute]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      executeSearch(searchTerm);
    },
    [executeSearch, searchTerm]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        executeSearch(searchTerm);
      }
    },
    [executeSearch, searchTerm]
  );

  return (
    <div className={`flex-1 min-w-0 max-w-md mx-2 ${className}`}>
      <form onSubmit={handleSubmit} className="relative" role="search">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 bg-background focus:bg-card w-full text-xs sm:text-sm"
          aria-label="Search"
          autoComplete="off"
        />
      </form>
    </div>
  );
}
