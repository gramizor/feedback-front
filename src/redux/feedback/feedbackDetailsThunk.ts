import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setFeedbackDetails } from "./feedbackDetailsSlice";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { setFeedbackID } from "../group/groupListSlice";
import { loading } from "../additional/additionalSlice";

export const getFeedbackDetails = createAsyncThunk(
  "feedback/getFeedbackDetails",
  async (id: string, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.get(`/feedback/${id}`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setFeedbackDetails(response.data.feedback));
      return response.data.feedback;
    } catch (error) {
      handleError(error, dispatch);
      throw error; // Необходимо бросить ошибку снова, чтобы сигнализировать об ошибке в вызывающем коде
    } finally {
      clearTimeout(timer);
    }
  }
);

export const deleteDraftFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (id: string, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.delete(`/feedback/${id}`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setFeedbackDetails(response.data.feedback));
      handleSuccess(response, dispatch);
      return response.data.feedback;
    } catch (error) {
      handleError(error, dispatch);
      throw error; // Необходимо бросить ошибку снова, чтобы сигнализировать об ошибке в вызывающем коде
    } finally {
      clearTimeout(timer);
    }
  }
);

export const formFeedback = createAsyncThunk(
  "feedback/formFeedback",
  async (id: string, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.put(`/feedback/${id}/status/user`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setFeedbackID(0));
      dispatch(setFeedbackDetails(response.data.feedback));
      handleSuccess(response, dispatch);
      return response.data.feedback;
    } catch (error) {
      handleError(error, dispatch);
      throw error; // Необходимо бросить ошибку снова, чтобы сигнализировать об ошибке в вызывающем коде
    } finally {
      clearTimeout(timer);
    }
  }
);