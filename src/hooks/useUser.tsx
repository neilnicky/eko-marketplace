"use client";

import { useAppSelector } from "./reduxHooks";

export function useUser() {
  const user = useAppSelector((state) => state.auth.user);
  return { user };
}
