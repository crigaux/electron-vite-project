import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FETCH_BASE_URL } from '../../utils/constants.ts'

const baseQuery = fetchBaseQuery({
  baseUrl: FETCH_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage?.getItem('token')}`,
    'Content-Type': 'application/json',
  },
})

const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery,
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => 'messages',
    }),
    createMessage: builder.mutation({
      query: (body) => ({
        url: 'messages',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useCreateMessageMutation,
} = messageApi

export default messageApi
