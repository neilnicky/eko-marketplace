"use client";

import { Suspense } from "react";
import { useUser } from "@/hooks/useUser";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { LoginPrompt } from "./login-prompt";
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
        {/* Show greeting if user exists */}
        {user ? (
          <>
            <DashboardGreeting user={user} />

            <Suspense
              fallback={<div className="h-20 bg-muted rounded-lg animate-pulse" />}
            >
              <WeatherWidget />
            </Suspense>

            <DashboardFeatureGrid />
          </>
        ) : (
          <>
            <LoginPrompt onLoginSuccess={() => refetch()} />

            <Suspense
              fallback={<div className="h-20 bg-muted rounded-lg animate-pulse" />}
            >
              <WeatherWidget />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}
