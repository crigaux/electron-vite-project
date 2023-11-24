import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FETCH_BASE_URL } from '../../utils/constants.ts'

const baseQuery = fetchBaseQuery({
  baseUrl: FETCH_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage?.getItem('token')}`,
    'Content-Type': 'application/json',
  },
})

const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery,
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => 'statuses',
    }),
    getStatusById: builder.query({
      query: (id) => `statuses/${id}`,
    }),
  }),
})

export const {
	useGetStatusByIdQuery,
	useLazyGetStatusByIdQuery,
	useGetStatusQuery,
	useLazyGetStatusQuery,
} = statusApi

export default statusApi
