"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { mockUser } from "@/mockData/user";

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      //   const userData = await UserAPI.me();
      const userData = mockUser;
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
}
