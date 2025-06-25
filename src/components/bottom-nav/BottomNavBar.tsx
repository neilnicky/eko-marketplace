"use client";

import { menuItems } from "@/constants/bottomNavMenu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import { cn, getIsActive } from "@/lib/utils";

// Types for better type safety
interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
  isLogo?: boolean;
}

interface NavItemProps {
  item: MenuItem;
  isActive: boolean;
}

// Constants
const COMPANY_LOGO = {
  src: "/assets/ekomart_logo.png",
  alt: "Nova Logo",
  width: 427,
  height: 423,
} as const;

const NAVIGATION_CONFIG = {
  height: "h-16",
  maxWidth: "max-w-7xl",
  zIndex: "z-30",
} as const;

// Memoized Logo Navigation Item Component
const LogoNavItem = React.memo<NavItemProps>(({ item, isActive }) => (
  <Link
    href={item.path}
    className="flex flex-col items-center justify-center p-1 flex-1 relative -top-4 group"
    aria-label={`Navigate to ${item.name}`}
    prefetch={true}
  >
    <div
      className={cn(
        "p-2 bg-card rounded-full shadow-lg border border-border group-hover:shadow-xl transition-shadow duration-200",
        isActive ? "border-primary" : ""
      )}
    >
      <div className="relative h-12 w-12">
        <Image
          src={COMPANY_LOGO.src}
          alt={COMPANY_LOGO.alt}
          className="object-contain"
          width={COMPANY_LOGO.width}
          height={COMPANY_LOGO.height}
          sizes="48px"
          priority={true}
          quality={90}
        />
      </div>
    </div>
    <span
      className={`text-xs mt-1 truncate transition-colors duration-200 ${
        isActive
          ? "text-primary font-medium "
          : "text-muted-foreground group-hover:text-foreground"
      }`}
    >
      {item.name}
    </span>
  </Link>
));

LogoNavItem.displayName = "LogoNavItem";

// Memoized Regular Navigation Item Component
const RegularNavItem = React.memo<NavItemProps>(({ item, isActive }) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.path}
      className="flex flex-col items-center justify-center p-1 min-w-0 flex-1 group"
      aria-label={`Navigate to ${item.name}`}
      aria-current={isActive ? "page" : undefined}
      prefetch={true}
    >
      <Icon
        className={`h-5 w-5 transition-colors duration-200 ${
          isActive
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground"
        }`}
        aria-hidden="true"
      />
      <span
        className={`text-xs mt-1 truncate max-w-full transition-colors duration-200 ${
          isActive
            ? "text-primary font-medium"
            : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        {item.name}
      </span>
    </Link>
  );
});

RegularNavItem.displayName = "RegularNavItem";

// Main Bottom Navigation Bar Component
const BottomNavBar: React.FC = () => {
  const pathname = usePathname();

  // Memoize the navigation items with their active states
  const navigationItems = useMemo(() => {
    return menuItems.map((item) => ({
      ...item,
      isActive: getIsActive(item.path, pathname),
    }));
  }, [pathname]);

  // Early return if no menu items
  if (!navigationItems.length) {
    return null;
  }

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 ${NAVIGATION_CONFIG.height} bg-card border-t border-border ${NAVIGATION_CONFIG.zIndex} backdrop-blur-sm bg-card/95`}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div
        className={`flex justify-around items-center h-full ${NAVIGATION_CONFIG.maxWidth} mx-auto px-2`}
      >
        {navigationItems.map((item) => {
          if (item.isLogo) {
            return (
              <LogoNavItem
                key={`logo-${item.name}`}
                item={item}
                isActive={item.isActive}
              />
            );
          }

          return (
            <RegularNavItem
              key={`nav-${item.name}-${item.path}`}
              item={item}
              isActive={item.isActive}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
