import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TaskContract } from "@pine/contracts";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  endpoints: (builder) => ({
    listTasks: builder.query<TaskContract[], void>({
      query: () => "tasks",
    }),
    addTask: builder.mutation<TaskContract, Partial<TaskContract>>({
      query: (newTask) => ({
        url: "tasks",
        method: "POST",
        body: newTask,
      }),
    }),
    // (You could add deleteTask and toggleTask mutations similarly)
  }),
});

export const { useListTasksQuery, useAddTaskMutation } = tasksApi;
