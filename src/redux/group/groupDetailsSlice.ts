// groupDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GroupDetails {
  contacts: string;
  group_code: string;
  group_id: number;
  group_status: string;
  course: number;
  pasport_details: string;
  photo: string;
  size: string;
  students: number;
}

interface GroupDetailsState {
  data: GroupDetails | null;
}

const initialState: GroupDetailsState = {
  data: null,
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
  },
});

export const { setGroupDetails } = groupDetailsSlice.actions;
export default groupDetailsSlice.reducer;
