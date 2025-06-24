"use client";

import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface LoginPromptProps {
  onLoginSuccess?: () => void;
}

export function LoginPrompt({ onLoginSuccess }: LoginPromptProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      //   await UserAPI.login();
      onLoginSuccess?.();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="mb-8 text-center">
        <div className="mb-6">
          <Image
            src="/assets/ekomart_logo.png"
            alt="Ekonavi Logo"
            width={80}
            height={80}
            className="mx-auto mb-4 rounded-lg"
            priority
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
            Welcome to Mercaterra
          </h1>
          <p className="text-lg text-muted-foreground">
            Direct-from-Farm. Fair. Fresh. Local.
          </p>
        </div>
      </header>
      <Card className="mb-8 shadow-xl bg-gradient-to-r from-green-600 to-emerald-500">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold mb-2">
                Join our community!
              </h2>
              <p className="opacity-90">
                Connect with farmers and conscious consumers.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 transition-colors"
              onClick={handleLogin}
              disabled={loading}
              asChild
            >
              <Link href="/auth/signin">
                <LogIn className="h-4 w-4 mr-2" />
                {loading ? "Signing in..." : "Sign In"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
