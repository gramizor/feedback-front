// authSelectors.ts
import { RootState } from "../store";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectfull_name = (state: RootState) => state.auth.full_name;
export const selectRole = (state: RootState) => state.auth.role;
export const selectisAdmin = (state: RootState) => state.auth.isAdmin;
