import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:5000";

export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("token") &&
            JSON.parse(localStorage.getItem("token") || ""),
        },
      };
      const res = await axios.get(`${backendURL}/api/users/`, config);
      console.log(res.data);
      return res.data.token;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
