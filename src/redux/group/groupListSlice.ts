import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Group {
  contacts: string;
  group_code: string;
  group_id: number;
  group_status: string;
  course: number;
  photo: string;
  students: number;
}

interface GroupListState {
  groupCode: string | null;
  courseNumber: number | null;
  groups: Group[];
  feedbackID: number;
  formData: Group;
}

const initialState: GroupListState = {
  groupCode: "",
  courseNumber: 0,
  groups: [],
  feedbackID: 0,
  formData: {
    contacts: "",
    group_code: "",
    group_id: 0,
    group_status: "",
    course: 0,
    photo: "",
    students: 0,
  },
};

const groupListSlice = createSlice({
  name: "groupList",
  initialState,
  reducers: {
    setgroupCode: (state, action: PayloadAction<string>) => {
      state.groupCode = action.payload;
    },
    setcourseNumber: (state, action: PayloadAction<number | null>) => {
      state.courseNumber = action.payload;
    },
    setFeedbackID: (state, action: PayloadAction<number>) => {
      state.feedbackID = action.payload;
    },
    setGroupData: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    setRemoveGroup: (state, action: PayloadAction<number>) => {
      const { groups } = state;
      const groupIdToRemove = action.payload;

      state.groups = groups.filter(
        (group) => group.group_id !== groupIdToRemove
      );
    },
    setFormData: (state, action: PayloadAction<Group>) => {
      state.formData = action.payload;
    },
  },
});

export const {
  setgroupCode,
  setcourseNumber,
  setGroupData,
  setFeedbackID,
  setRemoveGroup,
  setFormData,
} = groupListSlice.actions;
export default groupListSlice.reducer;

export type { Group, GroupListState };
