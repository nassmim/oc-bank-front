import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1/user' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => response.body.token,
    }),
    getProfile: builder.query({
      query: (token) => ({
        url: '/profile',
        method: 'POST',
        body: {},
        headers: { authorization: `Bearer ${token}` },
      }),
      transformResponse: (response) => response.body,
    }),
  }),
})
export const { useLoginMutation, useGetProfileQuery } = apiSlice
