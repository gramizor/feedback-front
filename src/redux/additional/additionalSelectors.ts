import { RootState } from "../store";
export const selectNotifications = (state: RootState) =>
  state.additional.notifications;
export const selectLoading = (state: RootState) => state.additional.loading;
export const selectResult = (state: RootState) => state.additional.result;
