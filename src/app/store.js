import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/features/User/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
