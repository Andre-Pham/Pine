import { configureStore } from "@reduxjs/toolkit";
import { lessonApi } from "./lesson-api";
import authReducer from "./auth-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      lessonApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
