import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



// Utility function for determining active state
export const getIsActive = (itemPath: string, currentPath: string): boolean => {
  // Handle home/root path specifically
  if (itemPath === "Home" || itemPath === "/") {
    return currentPath === "/" || currentPath === "/Home";
  }

  // For other paths, check if current path starts with item path
  // Ensure exact matching to avoid false positives
  const normalizedItemPath = itemPath.startsWith("/")
    ? itemPath
    : `/${itemPath}`;
  const normalizedCurrentPath = currentPath || "/";

  return (
    normalizedCurrentPath === normalizedItemPath ||
    normalizedCurrentPath.startsWith(`${normalizedItemPath}/`)
  );
};
