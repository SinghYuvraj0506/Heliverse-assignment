import { createAsyncThunk } from "@reduxjs/toolkit";

interface queryData {
  page?: number;
  search?: string;
  gender?: string;
  available?: string;
  domain?: string;
}

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (data: queryData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.HOST_URL}/api/users?page=${data?.page ?? 1}&search=${data?.search ?? ""}&gender=${data?.gender ?? ""}&available=${data?.available ?? ""}&domain=${data?.domain ?? ""}`
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


export const getUserData = createAsyncThunk(
  "getUserData",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.HOST_URL}/api/users/${data}`
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


export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {

      const response = await fetch(
        `${import.meta.env.HOST_URL}/api/users`,
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


export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {

      const response = await fetch(
        `${import.meta.env.HOST_URL}/api/users/${data?.id}`,
        {
          method:"PUT",
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


export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (data, { rejectWithValue }) => {
    try {

      const response = await fetch(
        `${import.meta.env.HOST_URL}/api/users/${data}`,
        {
          method:"DELETE",
          headers:{
            "Content-type":"application/json"
          }
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
