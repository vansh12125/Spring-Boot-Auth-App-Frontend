import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "@/redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
