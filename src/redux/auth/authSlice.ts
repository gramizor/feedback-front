import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  full_name: string | null;
  token: string | null;
  email: string | null;
  role: string | null;
}

const loadAuthState = (): AuthState => {
  const storedState = localStorage.getItem("authState");
  return storedState ? JSON.parse(storedState) : getInitialState();
};

const getInitialState = (): AuthState => {
  return {
    isAuthenticated: false,
    isAdmin: false,
    full_name: null,
    token: null,
    email: null,
    role: null,
  };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        email: string;
        full_name: string;
        role: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.full_name = action.payload.full_name;
      state.role = action.payload.role;
      const isAdmin = state.role === "модератор";
      state.isAdmin = isAdmin;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.token = null;
      state.email = null;
      state.full_name = null;
      state.role = null;
      localStorage.removeItem("authState");
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.token = null;
      state.email = null;
      state.full_name = null;
      state.role = null;
      localStorage.removeItem("authState");
    },
    registerSuccess: (
      state,
      action: PayloadAction<{
        full_name: string;
        token: string;
        email: string;
        role: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.full_name = action.payload.full_name;
      state.role = action.payload.role;
      const isAdmin = state.role === "модератор";
      state.isAdmin = isAdmin;
      localStorage.setItem("authState", JSON.stringify(state));
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess, registerSuccess } =
  authSlice.actions;
export default authSlice.reducer;
