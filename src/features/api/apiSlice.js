import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Creating the RTK baseQuery outside to setup headers with the token
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
    // Gets the user information (first name and last name)
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
      /**
       * Updates the DB with the names object
       * @param {Object} names representing the user first and last names
       * @returns
       */
      query: (names) => ({
        url: '/profile',
        method: 'PUT',
        body: names,
      }),
      transformResponse: (response) => response.body,
    }),
  }),
})

export const { useGetProfileQuery, useUpdateUserNamesMutation } = apiSlice
