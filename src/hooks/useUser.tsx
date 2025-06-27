"use client";

import { setUser } from "@/store/slice/auth";
import { RootState } from "@/store/store";
import { User } from "@/types/user";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/me");
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      dispatch(setUser(data));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    refetch,
  };
}
