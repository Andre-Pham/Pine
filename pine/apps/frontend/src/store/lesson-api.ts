import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreateLessonRequest,
  CreateLessonResponse,
  ListLessonsResponse,
} from '@pine/contracts';

export const lessonApi = createApi({
  reducerPath: 'lesson-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003' }),
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
