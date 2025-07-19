import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreateLessonRequest,
  CreateLessonResponse,
  ListLessonsResponse,
} from '@pine/contracts';
import type { RootState } from './index'  

export const lessonApi = createApi({
  reducerPath: 'lesson-api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3003',
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    listLessons: builder.query<ListLessonsResponse, void>({
      query: () => 'lesson/list',
    }),
    createLesson: builder.mutation<CreateLessonResponse, CreateLessonRequest>({
      query: (newTask) => ({
        url: 'lesson/create',
        method: 'POST',
        body: newTask,
      }),
    }),
  }),
});

export const { useListLessonsQuery, useCreateLessonMutation } = lessonApi;
