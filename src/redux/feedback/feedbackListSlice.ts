// feedbackSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Feedback {
  feedback_id: number;
  creation_date: string;
  formation_date: string;
  completion_date: string;
  feedback_status: string;
  full_name: string;
}

interface FeedbackState {
  feedbacks: Feedback[];
  startFormationDate: string | null; // Добавлены типы для фильтров
  endFormationDate: string | null;
  feedbackStatus: string | null;
}

const initialState: FeedbackState = {
  feedbacks: [],
  startFormationDate: null,
  endFormationDate: null,
  feedbackStatus: null,
};

const feedbackSlice = createSlice({
  name: "feedbackList",
  initialState,
  reducers: {
    setFeedbacks: (state, action: PayloadAction<Feedback[]>) => {
      state.feedbacks = action.payload;
    },
    setStartFormationDate: (state, action: PayloadAction<string | null>) => {
      state.startFormationDate = action.payload;
    },
    setEndFormationDate: (state, action: PayloadAction<string | null>) => {
      state.endFormationDate = action.payload;
    },
    setFeedbackStatus: (state, action: PayloadAction<string | null>) => {
      state.feedbackStatus = action.payload;
    },
  },
});

export const {
  setFeedbacks,
  setStartFormationDate,
  setEndFormationDate,
  setFeedbackStatus,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
