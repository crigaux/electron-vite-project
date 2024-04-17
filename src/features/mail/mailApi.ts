import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FETCH_BASE_URL } from '../../utils/constants.ts'
import { PropertySerializerRead } from '../../api/index.ts'

const baseQuery = fetchBaseQuery({
  baseUrl: FETCH_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage?.getItem('token')}`,
    'Content-Type': 'application/json',
  },
})

const mailApi = createApi({
  reducerPath: 'mailApi',
  baseQuery,
  endpoints: (builder) => ({
    confirmationMail: builder.mutation({
      query: (id) => ({
        url: `/mail/mail_confirm`,
        method: 'POST',
        body: id,
      }),
    }),
    resetPasswordMail: builder.mutation({
      query: (id) => ({
        url: `/mail/reset_password`,
        method: 'POST',
        body: id,
      }),
    }),
    subscribeNewsletter: builder.mutation({
      query: (mail) => ({
        url: `/mail/subscribe_newsletter`,
        method: 'POST',
        body: mail,
      }),
    }),
    salesConfirmationBuyer: builder.mutation({
      query: (body: {
        property: PropertySerializerRead
        new_owner: number
      }) => ({
        url: `/mail/sale_confirmation_buyer`,
        method: 'POST',
        body: {
          property: body.property,
          new_owner: body.new_owner,
        },
      }),
    }),
    salesConfirmationSaler: builder.mutation({
      query: (body: {
        property: PropertySerializerRead
        new_owner: number
      }) => ({
        url: `/mail/sale_confirmation_saler`,
        method: 'POST',
        body: {
          property: body.property,
          new_owner: body.new_owner,
        },
      }),
    }),
    rentConfirmationTenant: builder.mutation({
      query: (body: { property: PropertySerializerRead; tenant: number }) => ({
        url: `/mail/rent_confirmation_tenant`,
        method: 'POST',
        body: {
          property: body.property,
          tenant: body.tenant,
        },
      }),
    }),
    rentConfirmationOwner: builder.mutation({
      query: (body: { property: PropertySerializerRead; tenant: number }) => ({
        url: `/mail/rent_confirmation_owner`,
        method: 'POST',
        body: {
          property: body.property,
          tenant: body.tenant,
        },
      }),
    }),
  }),
})

export const {
  useConfirmationMailMutation,
  useResetPasswordMailMutation,
  useSubscribeNewsletterMutation,
  useSalesConfirmationBuyerMutation,
  useSalesConfirmationSalerMutation,
  useRentConfirmationTenantMutation,
  useRentConfirmationOwnerMutation,
} = mailApi

export default mailApi
