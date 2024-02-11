// groupListActions.ts
import { createAction } from "@reduxjs/toolkit";

export const setgroupCode = createAction<string>("groupList/setgroupCode");
export const setGroupData = createAction<any[]>("groupList/setGroupData");
export const setNoResults = createAction<boolean>("groupList/setNoResults");
export const setFeedbackID = createAction<number>("groupList/setFeedbackID");
export const setGroupAdded = createAction<number>(
  "groupList/setGroupAdded"
);
export const setRemoveGroup = createAction<number>(
  "groupList/setRemoveGroup"
);
