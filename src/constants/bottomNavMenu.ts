import { Compass, HomeIcon, ShoppingBag, Users, Wallet } from "lucide-react";

export const menuItems = [
  { name: "Social", icon: Users, path: "social" },
  { name: "Market", icon: ShoppingBag, path: "market" },
  { name: "Home", icon: HomeIcon, path: "/", isLogo: true },
  { name: "Experiences", icon: Compass, path: "experiences" },
  { name: "Wallet", icon: Wallet, path: "wallet" },
];
