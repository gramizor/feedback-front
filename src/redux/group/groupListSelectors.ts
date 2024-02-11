// groupListSelectors.ts
import { RootState } from "../store";

export const selectgroupCode = (state: RootState) =>
  state.groupList.groupCode as string;
export const selectcourseNumber = (state: RootState) =>
  state.groupList.courseNumber as number;
export const selectGroupData = (state: RootState) =>
  state.groupList.groups;
export const selectFeedbackID = (state: RootState) =>
  state.groupList.feedbackID;
export const selectFormData = (state: RootState) => state.groupList.formData;
