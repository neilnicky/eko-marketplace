"use client";

import { RootState } from "@/store/store";
import { useAppSelector } from "./reduxHooks";

export function useUser() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  return { user };
}
