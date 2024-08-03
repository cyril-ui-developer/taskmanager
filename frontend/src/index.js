import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import store from './redux/store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './redux/apiSlice';

console.log("store", store())
const reduxStore = store();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <BrowserRouter >
        {/* <Provider store={reduxStore}> */}
        <ApiProvider api={apiSlice}>
    <App />
    </ApiProvider>
    {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
