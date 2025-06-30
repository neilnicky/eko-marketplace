"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, ReactNode } from "react";
import { Button } from "../ui/button";

interface HorizontalScrollerProps {
  children: ReactNode;
  className?: string;
  showScrollButtons?: boolean;
  scrollAmount?: number;
  buttonClassName?: string;
}

export function HorizontalScroller({
  children,
  className = "",
  showScrollButtons = true,
  scrollAmount = 200,
  buttonClassName = "bg-white/80 rounded-full",
}: HorizontalScrollerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {showScrollButtons && (
        <Button
          variant="ghost"
          size="icon"
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 ${buttonClassName}`}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className={`overflow-x-auto scrollbar-hide ${className}`}
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {showScrollButtons && (
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 ${buttonClassName}`}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
