import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkAuth } from "./userActions";

const initialState: {
  isAuthenticated: boolean;
  loading: boolean;
  token: string;
} = {
  isAuthenticated: false,
  loading: false,
  token: (localStorage.getItem("token") && localStorage.getItem("token")) || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem("token", "");
      state.isAuthenticated = false;
      state.loading = false;
      state.token = "";
    },
    loginAction: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      console.log(action.payload);
      console.log(action.payload);
      console.log(action.payload);
      state.token = action.payload;
      state.loading = false;
    });
    builder.addCase(checkAuth.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(checkAuth.rejected, (state, action: any) => {
      state.loading = false;
    });
  },
});

export const { logout, loginAction } = userSlice.actions;
