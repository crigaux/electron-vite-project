import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FETCH_BASE_URL } from '../../utils/constants.ts'

const baseQuery = fetchBaseQuery({
  baseUrl: FETCH_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage?.getItem('token')}`,
    'Content-Type': 'application/json',
  },
})

const feesApi = createApi({
  reducerPath: 'feesApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllAgencyFees: builder.query({
      query: (currentAgency: number) => ({
        url: `/fees/agency/${currentAgency}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllAgencyFeesQuery } = feesApi

export default feesApi
