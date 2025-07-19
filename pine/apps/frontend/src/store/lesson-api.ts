import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CreateLessonRequest,
  CreateLessonResponse,
  ListLessonsResponse,
} from '@pine/contracts';
import type { RootState } from './index';
import { instanceToPlain, plainToInstance } from 'class-transformer';

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
      query: () => ({
        url: 'lesson/list',
      }),
      transformResponse: (response) =>
        plainToInstance(ListLessonsResponse, response),
    }),
    createLesson: builder.mutation<CreateLessonResponse, CreateLessonRequest>({
      query: (params) => ({
        url: 'lesson/create',
        method: 'POST',
        body: instanceToPlain(params),
      }),
    }),
  }),
});

export const { useListLessonsQuery, useCreateLessonMutation } = lessonApi;
