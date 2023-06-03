import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/api/v1/user',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      providesTags: ['Profile'],
      query: () => ({
        url: '/profile',
        method: 'POST',
        body: {},
      }),
      transformResponse: (response) => response.body,
    }),
    updateUserNames: builder.mutation({
      invalidatesTags: ['Profile'],
      query: (names) => ({
        url: '/profile',
        method: 'PUT',
        body: names,
        // headers: { authorization: `Bearer ${token}` },
      }),
      transformResponse: (response) => response.body,
    }),
  }),
})

export const { useGetProfileQuery, useUpdateUserNamesMutation } = apiSlice
