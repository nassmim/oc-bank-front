import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1/user' }),
  tagTypes: ['User'],
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
      providesTags: ['Profile'],
      query: (token) => ({
        url: '/profile',
        method: 'POST',
        body: {},
        headers: { authorization: `Bearer ${token}` },
      }),
      transformResponse: (response) => response.body,
    }),
    updateUserNames: builder.mutation({
      invalidatesTags: ['Profile'],
      query: ({ names, token }) => ({
        url: '/profile',
        method: 'PUT',
        body: names,
        headers: { authorization: `Bearer ${token}` },
      }),
      transformResponse: (response) => response.body,
    }),
  }),
})
export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateUserNamesMutation,
} = apiSlice
