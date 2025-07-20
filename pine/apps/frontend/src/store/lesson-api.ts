import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateLessonRequest,
  CreateLessonResponse,
  DeleteLessonRequest,
  ListLessonsResponse,
  UpdateLessonRequest,
} from "@pine/contracts";
import type { RootState } from "./index";
import { instanceToPlain, plainToInstance } from "class-transformer";

export const lessonApi = createApi({
  reducerPath: "lesson-api",
  tagTypes: ["lesson"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003",
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    listLessons: builder.query<ListLessonsResponse, void>({
      query: () => ({
        url: "lesson/list",
      }),
      providesTags: () => [{ type: "lesson", id: "list" }],
      transformResponse: (response) =>
        plainToInstance(ListLessonsResponse, response),
    }),
    createLesson: builder.mutation<CreateLessonResponse, CreateLessonRequest>({
      query: (params) => ({
        url: "lesson/create",
        method: "POST",
        body: instanceToPlain(params),
      }),
      invalidatesTags: (response) => [
        { type: "lesson", id: "list" },
        { type: "lesson", id: response?.id },
      ],
    }),
    updateLesson: builder.mutation<void, UpdateLessonRequest>({
      query: (params) => ({
        url: "lesson/update",
        method: "POST",
        body: instanceToPlain(params),
      }),
      invalidatesTags: (_, __, request) => [
        { type: "lesson", id: "list" },
        { type: "lesson", id: request?.id },
      ],
    }),
    deleteLesson: builder.mutation<void, DeleteLessonRequest>({
      query: (params) => ({
        url: "lesson/delete",
        method: "POST",
        body: instanceToPlain(params),
      }),
      invalidatesTags: (_, __, request) => [
        { type: "lesson", id: "list" },
        { type: "lesson", id: request?.id },
      ],
    }),
  }),
});

export const {
  useListLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;
