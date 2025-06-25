"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import {
  Briefcase,
  Compass,
  MessageSquare,
  PackageSearch,
  Plus,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

interface CreateAction {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}

const CREATE_ACTIONS: readonly CreateAction[] = [
  { label: "Create Post", href: "/social", icon: MessageSquare },
  { label: "Create Project", href: "/new-project", icon: Briefcase },
  { label: "Create Product", href: "/new-product", icon: ShoppingBag },
  { label: "Create Experience", href: "/new-experience", icon: Compass },
  { label: "Create Demand", href: "/new-demand", icon: PackageSearch },
] as const;

export function CreateFab() {
  const user = useUser();
  // const pathname = usePathname();

  if (!user) {
    return null;
  }

  // // Determine FAB position based on current route
  // const isMarketPage = pathname === '/market';
  // const fabPositionClass = isMarketPage ? 'bottom-40' : 'bottom-24';

  return (
    <div
      className={`fixed right-4 z-50 md:right-6 bottom-24`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-shadow-accent-foreground shadow-xl hover:bg-primary/85"
            aria-label="Create new content"
          >
            <Plus className="h-7 w-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mb-2 w-56">
          {CREATE_ACTIONS.map((action) => (
            <DropdownMenuItem key={action.href} asChild>
              <Link
                href={action.href}
                className="flex cursor-pointer items-center py-2.5"
              >
                <action.icon className="mr-3 h-5 w-5" />
                <span>{action.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
