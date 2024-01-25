import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FETCH_BASE_URL } from '../../utils/constants.ts'

const baseQuery = fetchBaseQuery({
  baseUrl: FETCH_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage?.getItem('token')}`,
    'Content-Type': 'application/json',
  },
})

const attachmentApi = createApi({
  reducerPath: 'attachmentApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllFolderImage: builder.query({
      query: (args: { id: number }) => {
        const { id } = args
        return `file/img/${id}`
      },
    }),
    createAttachment: builder.mutation({
      query: (args: { id: number; data: FormData }) => {
        const { id, data } = args
        return {
          url: `file/img/property/${id}`,
          method: 'POST',
          body: data,
        }
      },
    }),
  }),
})

export const {
  useGetAllFolderImageQuery,
  useLazyGetAllFolderImageQuery,
  useCreateAttachmentMutation,
} = attachmentApi

export default attachmentApi
