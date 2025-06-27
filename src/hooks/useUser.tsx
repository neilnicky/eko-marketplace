"use client";

import { RootState } from "@/store/store";
import { User } from "@/types/user";
import { useAppSelector } from "./reduxHooks";

export function useUser(): User | null {
  const user = useAppSelector((state: RootState) => state.auth.user);
  return user;
}
