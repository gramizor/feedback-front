// feedbackListSelectors.ts
import { RootState } from "../store";

export const selectStartFormationDate = (state: RootState) =>
  state.feedbackList.startFormationDate;

export const selectEndFormationDate = (state: RootState) =>
  state.feedbackList.endFormationDate;

export const selectFeedbackStatus = (state: RootState) =>
  state.feedbackList.feedbackStatus;

export const selectFeedbacks = (state: RootState) =>
  state.feedbackList.feedbacks;

export const selectOwnerName = (state: RootState) =>
  state.feedbackList.ownerName;
