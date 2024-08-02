import { createSlice } from '@reduxjs/toolkit';
//import { v4 as uuid } from 'uuid';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const task = {
        id:action.payload.id,
        title: action.payload.title, 
        description: action.payload.description,
        completed: action.payload.completed,  
        active: action.payload.active
      };
      return [...state, task];
    },
    deleteTask(state, action) {
      state.splice(state[action.payload.id], 1);
    }
  }
});

// this is for dispatch
export const { addTask, deleteTask } = tasksSlice.actions;

// this is for configureStore
export default tasksSlice