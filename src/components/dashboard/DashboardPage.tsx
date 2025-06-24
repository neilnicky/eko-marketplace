"use client";

import { Suspense } from "react";
import { LoginPrompt } from "./login-prompt";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
// import dynamic from "next/dynamic";
import { useUser } from "@/hooks/useUser";
import { DashboardGreeting } from "./DashboardGreeting";
import DashboardFeatureGrid from "./DashboardFeatureGrid";
import WeatherWidget from "../common/WeatherWidget";

export default function DashboardPage() {
  const { user, loading, refetch } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Loading Ekonavi..." />
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        <DashboardGreeting user={user} />

        {!user && <LoginPrompt onLoginSuccess={() => refetch()} />}

        <Suspense
          fallback={<div className="h-20 bg-muted rounded-lg animate-pulse" />}
        >
          <WeatherWidget />
        </Suspense>

        <DashboardFeatureGrid />
      </div>
    </div>
  );
}
