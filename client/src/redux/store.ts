import { emptySplitApi } from './emptyApi';
import { configureStore } from '@reduxjs/toolkit';
/**
 * Create a Redux store using configureStore, specifying the root reducer and extending the middleware stack to include additional middleware related to API handling
 * This is an initial set up for redux toolkit, which we will pass in the top level component (main.tsx)
 */
export const store = configureStore({
  reducer: { [emptySplitApi.reducerPath]: emptySplitApi.reducer },
  middleware: (getDefault) => getDefault().concat(emptySplitApi.middleware),
});
