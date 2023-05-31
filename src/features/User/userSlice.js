import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
}
export const selectUserLoggedStatus = (state) => state.user.loggedIn

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedInOut: (state) => !state.loggedIn,
  },
})

export const { loggedInOut } = userSlice.actions
export default userSlice.reducer
