import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const baseUrl=  process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/v1' : `${backendUrl}/api/v1`;

export const apiTasksSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Tasks"], // This is a tag type that will be used to invalidate the cache
  endpoints: (builder) => ({ // This is where we define our endpoints
    getTasks: builder.query({
      query: () => "/tasks",
      transformResponse: (res) => res.reverse(),
      providesTags: ["Tasks"], // This is a tag that will be used to invalidate the cache. Meaning that any mutation that invalidates the "Tasks" tag will cause this query to refetch.
    }),
    addTask: builder.mutation({ // This is a mutation that will be used to add a new task
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"], // This is a tag that will be used to invalidate the cache
    }),
    updateTaskCompleted: builder.mutation({ // This is a mutation that will be used to update the completed status of a task
      query: (task) => ({
        url: `/tasks/${task.id}/completed`,
        method: "PATCH",
        body: {completed:task.completed},
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({ // This is a mutation that will be used to delete a task
      query: (id ) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
  useGetTasksQuery, 
  useAddTaskMutation,
  useUpdateTaskCompletedMutation,
  useDeleteTaskMutation,
} = apiTasksSlice;
