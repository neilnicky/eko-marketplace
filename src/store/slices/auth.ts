import { mockUser } from "@/mockData/user";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  jwt: string;
  user: User | null;
}

export const initAuthState: AuthState = {
  jwt: "",
  isLoggedIn: false,
  isAdmin: false,
  user: mockUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initAuthState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setIsAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
    setJwt(state, action: PayloadAction<string>) {
      state.jwt = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.jwt = "";
      state.user = null;
    },
  },
});

export const { setIsLoggedIn, setIsAdmin, setJwt, setUser, logout } =
  authSlice.actions;

export default authSlice.reducer;
