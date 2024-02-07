// feedbackDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../group/groupListSlice";

interface FeedbackDetails {
  feedback_id: number;
  creation_date: string;
  formation_date: string;
  completion_date: string;
  feedback_status: string;
  full_name: string;
  groups: Group[];
}

interface FeedbackDetailsState {
  data: FeedbackDetails | null;
}

const initialState: FeedbackDetailsState = {
  data: null,
};

const feedbackDetailsSlice = createSlice({
  name: "feedbackDetails",
  initialState,
  reducers: {
    setFeedbackDetails: (
      state,
      action: PayloadAction<FeedbackDetails | null>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setFeedbackDetails } =
  feedbackDetailsSlice.actions;
export default feedbackDetailsSlice.reducer;
