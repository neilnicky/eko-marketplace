"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  selectHasLocation,
  selectSorting,
  setSorting,
} from "@/store/slices/filters";

const sortingOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Lowest Price" },
  { value: "price_desc", label: "Highest Price" },
  { value: "best_rated", label: "Best Rated" },
  { value: "name_asc", label: "A-Z" },
  { value: "name_desc", label: "Z-A" },
];

export default function SortingSelect() {
  const dispatch = useAppDispatch();
  const currentSorting = useAppSelector(selectSorting);
  const hasLocation = useAppSelector(selectHasLocation);

  const handleSortingChange = (value: string) => {
    dispatch(setSorting(value));
  };

  const availableOptions = [
    ...sortingOptions,
    ...(hasLocation ? [{ value: "closest", label: "Closest" }] : []),
  ];

  return (
    <div className="px-2 sm:px-4 ">
      <Select value={currentSorting} onValueChange={handleSortingChange}>
        <SelectTrigger className="w-44 text-xs">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {availableOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
