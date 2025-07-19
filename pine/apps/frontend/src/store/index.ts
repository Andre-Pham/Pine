import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './tasksApi';
import { lessonApi } from './lesson-api';
import authReducer from './auth-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(tasksApi.middleware)
      .concat(lessonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
