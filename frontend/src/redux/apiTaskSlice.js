import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl=  process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/v1' : '/'


export const apiTasksSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      transformResponse: (res) => res.reverse(),
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskCompleted: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.id}/completed`,
        method: "PATCH",
        body: {completed:task.completed},
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskCompletedMutation,
  useDeleteTaskMutation,
} = apiTasksSlice;
