import { configureStore } from '@reduxjs/toolkit/'
import userReducer from '../features/User/userSlice.js'
import { apiSlice } from '../features/api/apiSlice.js'
export default configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
