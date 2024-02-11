// groupListThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import {
  setGroupData,
  setFeedbackID,
  Group,
  setRemoveGroup,
} from "./groupListSlice";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";
import { NavigateFunction } from "react-router";

interface GetGroupsRepsonse {
  groups: Group[];
  feedbackID: number;
}

export const getGroupList = createAsyncThunk<GetGroupsRepsonse, { groupCode: string | null, courseNumber: number | null; }>(
  "groupList/getGroupList",
  async ({ groupCode, courseNumber }, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.get<GetGroupsRepsonse>(
        `/group/?groupCode=${groupCode}&courseNumber=${courseNumber}`
      );
      dispatch(setGroupData(response.data.groups));
      dispatch(setFeedbackID(response.data.feedbackID));
      return response.data;
    } catch (error) {
      handleError(error, dispatch);
      return { groups: [], feedbackID: 0 };
    } finally {
      clearTimeout(timer);
    }
  }
);

export const addFeedback = createAsyncThunk<void, { groupID: number, groupCode: string | null, courseNumber: number | null }>(
  "groupList/addFeedback",
  async ({ groupID, groupCode, courseNumber }, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.post(`/group/${groupID}/feedback`);
      // dispatch(setGroupData(response.data.groups));
      // dispatch(setFeedbackID(response.data.feedbackID));
      handleSuccess(response, dispatch);
      dispatch(getGroupList({ groupCode: groupCode, courseNumber: courseNumber }))
    } catch (error: any) {
      handleError(error, dispatch);
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
);
export const deleteFeedback = createAsyncThunk<void, number>(
  "groupList/deleteFeedback",
  async (groupID, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.delete(`/group/${groupID}/feedback`);
      dispatch(setRemoveGroup(groupID));
      handleSuccess(response, dispatch);
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      clearTimeout(timer);
    }
  }
);


export const deleteGroup = createAsyncThunk<void, { groupID: number, groupCode: string | null, courseNumber: number | null }>(
  "groupList/deleteGroup",
  async ({groupID, groupCode, courseNumber}, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.delete(`/group/${groupID}`);
      // dispatch(setGroupData(response.data.groups));
      // dispatch(setFeedbackID(response.data.feedbackID));
      dispatch(getGroupList({ groupCode: groupCode, courseNumber: courseNumber }))
      handleSuccess(response, dispatch);
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      clearTimeout(timer);
    }
  }
);

interface CreateGroupPayload {
  contacts: string;
  group_code: string;
  course: number;
  students: number;
  navigate?: NavigateFunction;
}

export const createGroup = createAsyncThunk<
  GetGroupsRepsonse,
  CreateGroupPayload
>("groupDetails/createGroup", async (payload, { dispatch }) => {
  try {
    const { navigate, ...restPayload } = payload; // Извлекаем navigate из payload
    const timer = setTimeout(() => {
      dispatch(loading(true));
    }, 250);
    const response = await axios.post<GetGroupsRepsonse>(
      `/group/`,
      { ...restPayload } // Используем оставшуюся часть payload
    );
    dispatch(loading(false));
    clearTimeout(timer);
    dispatch(setGroupData(response.data.groups));
    dispatch(setFeedbackID(response.data.feedbackID));

    // Проверяем наличие функции navigate и вызываем ее, если она есть
    if (navigate) {
      navigate("/group");
    }
    handleSuccess(response, dispatch);
    return response.data;
  } catch (error) {
    handleError(error, dispatch);
    throw error;
  }
});
