// groupDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "./groupListSlice";

export interface GroupDetails {
  contacts: string;
  group_code: string;
  group_id: number;
  group_status: string;
  course: number;
  photo: string;
  students: number;
}

interface GroupDetailsState {
  data: GroupDetails | null;
  formData: Group;
}

const initialState: GroupDetailsState = {
  data: null,
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

const groupDetailsSlice = createSlice({
  name: "groupDetails",
  initialState,
  reducers: {
    setGroupDetails: (
      state,
      action: PayloadAction<GroupDetails | null>
    ) => {
      state.data = action.payload;
    },
    setFormData: (state, action: PayloadAction<Group>) => {
      state.formData = action.payload;
    },
  },
});

export const { setGroupDetails, setFormData } = groupDetailsSlice.actions;
export default groupDetailsSlice.reducer;
