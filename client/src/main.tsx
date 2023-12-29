import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { transactionsApi } from './redux/apiSlice.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);
