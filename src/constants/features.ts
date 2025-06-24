import {
  Award,
  Bell,
  BookOpen,
  ClipboardList,
  MapPin,
  MessageSquare,
  Settings,
  ShoppingCart,
  Star,
} from "lucide-react";

export interface FeatureItem {
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    title: "Map",
    href: "/map",
    desc: "Explore Projects",
    icon: MapPin,
  },
  {
    title: "Demands",
    href: "/demands",
    desc: "opportunities",
    icon: ClipboardList,
  },
  {
    title: "Certification",
    href: "/certification",
    desc: "Validate Practices",
    icon: Award,
  },
  {
    title: "Library",
    href: "/Library",
    desc: "Knowledge",
    icon: BookOpen,
  },
  {
    title: "Notifications",
    href: "/notifications",
    desc: "Alerts & News",
    icon: Bell,
  },
  {
    title: "Basket",
    href: "/cart",
    desc: "Your cart products",
    icon: ShoppingCart,
  },
  {
    title: "Messages",
    href: "/messages",
    desc: "Conversations",
    icon: MessageSquare,
  },
  {
    title: "Favorites",
    href: "/favorites",
    desc: "Your saved items",
    icon: Star,
  },
  {
    title: "Settings",
    href: "/settings",
    desc: "Your profile",
    icon: Settings,
  },
] as const;
