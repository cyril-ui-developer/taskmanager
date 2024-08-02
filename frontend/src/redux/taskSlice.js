import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';

import { getTasks } from '../api/tasks';

export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, thunkApi) => {
    try {
      const tasks = await getTasks();
      console.log("tasks", tasks);
      return tasks;
    } catch (error) {
      const err = error;
      // Response 401 status code for 'jwt expired' or 'Missing authorization header' or 'Invald token'
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

const initialState= {
  tasks: []
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state) => {
      state.fetchStatus.tasks  = true;
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      console.log("testing", state.tasks);
      state.fetchStatus.tasks = false;
    });
    builder.addCase(fetchAllTasks.rejected, (state, action) => {
      state.fetchStatus.tasks  = false;
      state.error.tasks  = action.payload;
    });
  }
  })

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState: [],
//   reducers: {
//     listTasks(state, action) {
//       state = action.payload;
//     },
//     addTask: (state, action) => {
//       const task = {
//         id:action.payload.id,
//         title: action.payload.title, 
//         description: action.payload.description,
//         completed: action.payload.completed,  
//         active: action.payload.active
//       };
//       return [...state, task];
//     },
//     deleteTask(state, action) {
//       state.splice(state[action.payload.id], 1);
//     }
//   }
// });

// this is for dispatch
export const { addTask, deleteTask } = tasksSlice.actions;

// this is for configureStore
export default tasksSlice.reducer