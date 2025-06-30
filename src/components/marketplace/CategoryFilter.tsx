"use client";

import { categoryFilters } from "@/constants/categoryFilters";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectCategory, setCategory } from "@/store/slices/filters";
import { HorizontalScroller } from "./HorizontalScroller";

interface CategoryButtonProps {
  filter: {
    value: string;
    label: string;
    icon: string;
  };
  isActive: boolean;
  onClick: () => void;
}

function CategoryButton({ filter, isActive, onClick }: CategoryButtonProps) {
  return (
    <button
      className={`flex flex-col items-center gap-2 p-3 transition-all min-w-[70px] flex-shrink-0 ${
        isActive ? "text-green-700" : "text-gray-600 hover:text-gray-800"
      }`}
      onClick={onClick}
      aria-label={`Filter by ${filter.label}`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
          isActive ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        <span className="text-2xl" role="img" aria-hidden="true">
          {filter.icon}
        </span>
      </div>
      <span className="text-xs font-medium text-center whitespace-nowrap">
        {filter.label}
      </span>
    </button>
  );
}

export default function CategoryFilter() {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(selectCategory);

  const handleCategoryChange = (categoryValue: string) => {
    dispatch(setCategory(categoryValue));
  };

  return (
    <div className="px-2 sm:px-4">
      <HorizontalScroller
        className="flex items-center gap-3 pb-2 mx-8"
        scrollAmount={200}
        buttonClassName="bg-white/80 rounded-full"
      >
        {categoryFilters.map((filter) => (
          <CategoryButton
            key={filter.value}
            filter={filter}
            isActive={currentCategory === filter.value}
            onClick={() => handleCategoryChange(filter.value)}
          />
        ))}
      </HorizontalScroller>
    </div>
  );
}
