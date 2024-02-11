// additionalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addFeedback, getGroupList, deleteFeedback } from "../group/groupListThunk";
import { getGroupDetails } from "../group/groupDetailsThunk";
import { getFeedbacks } from "../feedback/feedbackListThunk";
import {
  deleteDraftFeedback,
  formFeedback,
  getFeedbackDetails,
} from "../feedback/feedbackDetailsThunk";
export interface INotification {
  id: string;
  message: string;
  isError: boolean;
}

interface AdditionalState {
  loading: boolean;
  notifications: INotification[];
  result: boolean;
}

const initialState: AdditionalState = {
  loading: false,
  notifications: [],
  result: true,
};
function generateUniqueString(): string {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}
const additionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {
    loading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    result(state, action: PayloadAction<boolean>) {
      state.result = action.payload;
    },
    addNotification: (
      state,
      action: PayloadAction<{ message: string; isError?: boolean }>
    ) => {
      state.notifications.push({
        message: action.payload.message,
        id: generateUniqueString(),
        isError: action.payload.isError || false,
      });
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const queue = state.notifications;
      const new_queue = queue.filter((item) => item.id !== id);
      state.notifications = new_queue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFeedback.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addFeedback.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getGroupList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getGroupList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteFeedback.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteFeedback.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getGroupDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getGroupDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getFeedbacks.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getFeedbacks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getFeedbackDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getFeedbackDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDraftFeedback.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDraftFeedback.rejected, (state) => {
        state.loading = false;
      })
      .addCase(formFeedback.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(formFeedback.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { loading, result, addNotification, deleteNotification } =
  additionalSlice.actions;

export default additionalSlice.reducer;
