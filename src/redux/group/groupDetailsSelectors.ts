// groupDetailsSelectors.ts
import { RootState } from "../store";

export const selectGroupDetails = (state: RootState) =>
  state.groupDetails.data;
