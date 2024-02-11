// feedbackDetailsSelectors.ts
import { RootState } from "../store";

export const selectFeedbackDetails = (state: RootState) =>
  state.feedbackDetails.data;