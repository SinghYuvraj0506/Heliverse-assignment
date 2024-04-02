import { createAsyncThunk } from "@reduxjs/toolkit";


export const getTeamData = createAsyncThunk(
  "getTeamData",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.HOST_URL}/api/team/${data}`
      );
      const result = await response.json();

      if (result?.statusCode !== 200) {
        rejectWithValue(result?.message);
      }

      return result?.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);


export const createTeam = createAsyncThunk(
  "createTeam",
  async (data, { rejectWithValue }) => {
    try {

      const response = await fetch(
        `${import.meta.env.HOST_URL}/api/team`,
        {
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(data)
        }
      );
      
      const result = await response.json();

      if (result?.statusCode !== 200) {
        rejectWithValue(result?.message);
      }

      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
