import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUserLocation } from "@/hooks/useUserLocation";

export default function SortingSelect() {
  const [sorting, setSorting] = useState("newest");
  const { location } = useUserLocation();

  return (
    <div className="px-2 sm:px-4">
      <Select value={sorting} onValueChange={setSorting}>
        <SelectTrigger className="w-full md:w-48 text-xs">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price_asc">Lowest Price</SelectItem>
          <SelectItem value="price_desc">Highest Price</SelectItem>
          <SelectItem value="best_rated">Best Rated</SelectItem>
          {location?.city && <SelectItem value="closest">Closest</SelectItem>}
        </SelectContent>
      </Select>
    </div>
  );
}
