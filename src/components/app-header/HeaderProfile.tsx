"use client";

import { UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "@/types/types";

interface HeaderProfileProps {
  user?: User | null;
  signInHref?: string;
  profileHref?: string;
  className?: string;
}

export default function HeaderProfile({
  user,
  signInHref = "/auth/signin",
  profileHref = "/profile",
  className = "",
}: HeaderProfileProps) {
  if (!user) {
    return (
      <Button variant="outline" className={`text-sm ${className}`} asChild>
        <Link href={signInHref}>Sign In</Link>
      </Button>
    );
  }

  const profileImageSrc = user.profile_picture_url || user.picture;
  const userName = user.full_name || "User";

  return (
    <Button
      variant="ghost"
      className={`p-0 rounded-full h-9 w-9 ${className}`}
      asChild
    >
      <Link href={profileHref} aria-label={`${userName}'s profile`}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden bg-muted">
          {profileImageSrc ? (
            <Image
              src={profileImageSrc}
              alt={`${userName}'s profile picture`}
              width={36}
              height={36}
              className="w-full h-full object-cover"
              priority={false}
              sizes="36px"
            />
          ) : (
            <UserCircle className="h-6 w-6 text-primary" aria-hidden="true" />
          )}
        </div>
      </Link>
    </Button>
  );
}
