// groupDetailsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setGroupDetails } from "./groupDetailsSlice";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";
import { Group } from "./groupListSlice";
import { NavigateFunction } from "react-router-dom";

interface GroupDetailsResponse {
  group:{
  contacts: string;
  group_code: string;
  group_id: number;
  group_status: string;
  course: number;
  photo: string;
  students: number;
  },
}

export const getGroupDetails = createAsyncThunk<
  GroupDetailsResponse,
  string
>("groupDetails/getGroupDetails", async (id, { dispatch }) => {
  try {
    const timer = setTimeout(() => {
      dispatch(loading(true));
    }, 250);
    const response = await axios.get<GroupDetailsResponse>(`/group/${id}`);
    dispatch(loading(false));
    clearTimeout(timer);
    dispatch(setGroupDetails(response.data.group));
    return response.data;
  } catch (error) {
    handleError(error, dispatch);
    throw error;
  }
});

export interface GroupRequest {
  contacts: string;
  group_code: string;
  course: number;
  students: number;
}

interface UpdateGroupPayload {
  id: number;
  group: GroupRequest; // Используем GroupRequest для передачи данных
  navigate?: NavigateFunction | undefined;
}

export const updateGroup = createAsyncThunk<
  GroupDetailsResponse,
  UpdateGroupPayload
>("groupDetails/updateGroup", async (payload, { dispatch }) => {
  try {
    const { navigate, ...restPayload } = payload;
    const timer = setTimeout(() => {
      dispatch(loading(true));
    }, 250);

    const response = await axios.put<GroupDetailsResponse>(
      `/group/${payload.id}`,
      payload.group
    );

    dispatch(loading(false));
    clearTimeout(timer);
    dispatch(setGroupDetails(response.data.group));

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

export const updateGroupImage = createAsyncThunk<
  GroupDetailsResponse,
  { id: number; imageData: FormData }
>(
  "groupDetails/createGroupWithImage",
  async ({ id, imageData }, { dispatch }) => {
    try {
      const timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);

      const response = await axios.post<GroupDetailsResponse>(
        `/group/${id}/image`,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setGroupDetails(response.data.group));
      handleSuccess(response, dispatch);
      return response.data;
    } catch (error) {
      handleError(error, dispatch);
      throw error;
    }
  }
);
