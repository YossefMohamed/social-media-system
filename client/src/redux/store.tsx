import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlices";

export const store = configureStore({
  reducer: {
    authState: userSlice.reducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
