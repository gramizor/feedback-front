//store.ts;
import { configureStore } from "@reduxjs/toolkit";
import authMiddleware from "./auth/authMiddleware";
import authReducer from "./auth/authSlice";
import groupListReducer from "./group/groupListSlice";
import groupDetailsReducer from "./group/groupDetailsSlice";
import feedbackListReducer from "./feedback/feedbackListSlice";
import feedbackDetailsReducer from "./feedback/feedbackDetailsSlice";
import additionalReducer from "./additional/additionalSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    groupList: groupListReducer,
    groupDetails: groupDetailsReducer,
    feedbackList: feedbackListReducer,
    feedbackDetails: feedbackDetailsReducer,
    additional: additionalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
