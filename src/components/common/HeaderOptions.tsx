"use client";

import {
  Bot,
  HelpCircle,
  Home,
  Info,
  LogOut,
  MessageSquare,
  Moon,
  Sun,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTheme from "@/hooks/useTheme";
import SupportDialog from "@/components/common/SupportDialog";

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    href: "/",
    label: "Return to Home",
    icon: Home,
  },
  {
    href: "/ecological-assistant",
    label: "AI Ecological Assistant",
    icon: Bot,
  },
  {
    href: "/about",
    label: "About Ekonavi",
    icon: Info,
  },
  {
    href: "/report-bug",
    label: "Report a Bug",
    icon: HelpCircle,
  },
] as const;

interface HeaderOptionsProps {
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function HeaderOptions({ user }: HeaderOptionsProps) {
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      // Add your logout logic here (e.g., API call, clear tokens)
      // await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error (e.g., show toast notification)
    }
  }, [router]);

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const handleSupportDialogOpen = useCallback(() => {
    setIsSupportDialogOpen(true);
  }, []);

  const { ThemeIcon, themeLabel } = useMemo(() => {
    if (theme === "light") {
      return { ThemeIcon: Moon, themeLabel: "Dark Mode" };
    } else {
      return { ThemeIcon: Sun, themeLabel: "Light Mode" };
    }
  }, [theme]);

  return (
    <>
      <SupportDialog
        isOpen={isSupportDialogOpen}
        onOpenChange={setIsSupportDialogOpen}
      />

      <div className="flex items-center flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Open navigation menu"
            >
              <Image
                src="/assets/ekomart_logo.png"
                alt="Ekonavi Marketplace"
                className="h-10 w-20 object-contain"
                width={427}
                height={423}
                priority
                sizes="(max-width: 768px) 80px, 80px"
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-56" sideOffset={4}>
            {/* Navigation Items */}
            {NAVIGATION_ITEMS.map(({ href, label, icon: Icon }) => (
              <DropdownMenuItem key={href} asChild>
                <Link
                  href={href}
                  className="flex items-center w-full"
                  prefetch={href === "/" ? true : false}
                >
                  <Icon
                    className="mr-2 h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </Link>
              </DropdownMenuItem>
            ))}

            {/* Support Dialog Trigger */}
            <DropdownMenuItem
              onClick={handleSupportDialogOpen}
              className="flex items-center cursor-pointer"
            >
              <MessageSquare
                className="mr-2 h-4 w-4 flex-shrink-0"
                aria-hidden="true"
              />
              <span>Talk to Us</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Theme Toggle */}
            <DropdownMenuItem
              onClick={handleThemeToggle}
              className="flex items-center cursor-pointer"
            >
              <ThemeIcon
                className="mr-2 h-4 w-4 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{themeLabel}</span>
            </DropdownMenuItem>

            {/* Logout - Only show if user is authenticated */}
            {user && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut
                    className="mr-2 h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
