import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FETCH_BASE_URL } from '../../utils/constants.ts'

const baseQuery = fetchBaseQuery({
  baseUrl: FETCH_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage?.getItem('token')}`,
    'Content-Type': 'application/json',
  },
})

const appointmentTagApi = createApi({
  reducerPath: 'appointmentTagApi',
  baseQuery,
  endpoints: (builder) => ({
    getAppointmentTags: builder.query({
      query: () => 'appointment_tags',
    }),
  }),
})

export const { useGetAppointmentTagsQuery, useLazyGetAppointmentTagsQuery } =
  appointmentTagApi

export default appointmentTagApi
