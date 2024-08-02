import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './taskSlice'

function store() {
    const store = configureStore({
      reducer: tasksSlice,
      // preloadedState: [
      //   // { id: 1, title: "Lorem ipsum dolor sit", description: "Incididunt ut labore et dolore magna aliqua. Ut enim", completed: true,  active: false }, 
      //   // { id: 2, title: "Utenim ad minim ven", description: "Kexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", completed: false, active: false}
      // ]
    });
    return store;
  }

  export default store