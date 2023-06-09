import { createSlice } from '@reduxjs/toolkit'

// Necessary so that we still know if a token exists after a page refresh
const token =
  localStorage.getItem('token') || sessionStorage.getItem('token') || null

const initialState = {
  token,
}

export const selectToken = (state) => state.user.token

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.token = action.payload
    },
    loggedOut: (state) => {
      state.token = null
    },
  },
})

export const { loggedIn, loggedOut } = userSlice.actions
export default userSlice.reducer
