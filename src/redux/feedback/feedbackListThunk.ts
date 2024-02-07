// feedbackListThunk.ts
import { createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setFeedbacks } from "./feedbackListSlice";
import { RootState } from "../store";
import { handleError } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";

interface GetFeedbacksParams {
  startFormationDate: string | null;
  endFormationDate: string | null;
  feedbackStatus: string | null;
}

export const getFeedbacks = createAsyncThunk<
  any,
  GetFeedbacksParams,
  { state: RootState; dispatch: ThunkDispatch<RootState, any, any> }
>("feedback/getFeedbacks", async (params, { dispatch }) => {
  // let timer;
  try {
    // timer = setTimeout(() => {
    //   dispatch(loading(true));
    // }, 1000);
    const response = await axios.get("/feedback/", { params });
    dispatch(loading(false));
    // clearTimeout(timer);
    dispatch(setFeedbacks(response.data.feedbacks));
    return response.data;
  } catch (error) {
    handleError(error, dispatch);
    throw error;
  } finally {
    // clearTimeout(timer);
  }
});
