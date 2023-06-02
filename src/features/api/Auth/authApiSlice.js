import { apiSlice } from '../apiSlice.js'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => response.body.token,
    }),
  }),
})

export const { useLoginMutation } = authApiSlice
