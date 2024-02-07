// groupDetailsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setGroupDetails } from "./groupDetailsSlice";
import { handleError } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";

interface GroupDetailsResponse {
  group: {
    contacts: string;
    group_code: string;
    group_id: number;
    group_status: string;
    course: number;
    pasport_details: string;
    photo: string;
    size: string;
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
