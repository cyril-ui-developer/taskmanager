// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import tasksSlice from './redux/taskSlice'

// [
//   { id: 1098754345678, title: "Lorem ipsum dolor sit", description: "Incididunt ut labore et dolore magna aliqua. Ut enim", completed: true,  active: false }, 
//   { id: 2009876543456, title: "Utenim ad minim ven", description: "Kexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", completed: false, active: false}
// ]
export function renderWithProviders(
  ui,
  {
    
    preloadedState ={},
    store = configureStore(
        tasksSlice,
      {preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>      <MemoryRouter>{children}</MemoryRouter></Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}