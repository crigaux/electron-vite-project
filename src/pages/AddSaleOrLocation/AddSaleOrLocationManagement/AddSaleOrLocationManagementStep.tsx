import { useEffect, useState } from 'react'
import AddSaleOrLocationManagement from './AddSaleOrLocationManagement'
import {
  CountryModelRead,
  PropertySerializerRead,
  RoleSerializerRead,
  StatusSerializerRead,
  UserSerializerRead,
} from '../../../api'
import {
  useLazyGetPropertyByFilterQuery,
  useUpdatePropertyMutation,
} from '../../../features/property/propertyApi'
import { AddSaleOrLocationFormikType } from '../type'
import { useFormikContext } from 'formik'
import { useGetStatusQuery } from '../../../features/status/statusApi'
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../../../features/user/userApi'
import { toast } from 'sonner'
import useGeneratePassword from '../../../hooks/useGeneratePassword'
import { useCreateAddressMutation } from '../../../features/address/addressApi'
import { useGetCountriesQuery } from '../../../features/country/countryApi'
import {
  useRentConfirmationOwnerMutation,
  useRentConfirmationTenantMutation,
  useResetPasswordMailMutation,
  useSalesConfirmationBuyerMutation,
  useSalesConfirmationSalerMutation,
} from '../../../features/mail/mailApi'
import { useGetRolesQuery } from '../../../features/role/roleApi'
import { useAppDispatch } from '../../../store/store'
import { setSelectedPropertyId } from '../../../features/property/propertySlice'

export default function AddSaleOrLocationManagementStep({
  navigateToProperties,
}: {
  navigateToProperties: () => void
}) {
  const dispatch = useAppDispatch()

  const { values } = useFormikContext<AddSaleOrLocationFormikType>()

  const [triggerProperties, propertiesQuery] = useLazyGetPropertyByFilterQuery()

  const [properties, setProperties] = useState<PropertySerializerRead[]>([])
  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation()
  const [createAddress] = useCreateAddressMutation()
  const [updateProperty] = useUpdatePropertyMutation()
  const [resetPasswordMail] = useResetPasswordMailMutation()
  const [saleMailBuyer] = useSalesConfirmationBuyerMutation()
  const [saleMailSaler] = useSalesConfirmationSalerMutation()
  const [rentMailTenant] = useRentConfirmationTenantMutation()
  const [rentMailOwner] = useRentConfirmationOwnerMutation()

  const statuses = useGetStatusQuery({})?.data as StatusSerializerRead[]

  const rent =
    statuses?.find((status) => status.name === 'À louer')?.status_id ?? null
  const buy =
    statuses?.find((status) => status.name === 'À vendre')?.status_id ?? null

  const userRoles = useGetRolesQuery({}).data || []

  const userRole = userRoles.find(
    (role: RoleSerializerRead) => role.name === 'USER',
  )?.role_id

  const currentAgency = JSON.parse(
    localStorage.getItem('user') as string,
  ).agency_id

  useEffect(() => {
    triggerProperties({
      status_id: values?.is_sale === true ? buy : rent,
      withRented: true,
      withSold: true,
    })
  }, [rent, buy, values?.is_sale])

  useEffect(() => {
    if (propertiesQuery.data) {
      setProperties(propertiesQuery.data)
    } else {
      setProperties([])
    }
  }, [propertiesQuery.data])

  const getCoordonates = async (user: any) => {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${user.way} ${user.zipcode} ${user.city}`,
    )
    const result = await response.json()
    const features = result.features
    const coordinates = features[0].geometry.coordinates
    return coordinates
  }

  const countryList = useGetCountriesQuery({}).data || []
  const country = countryList.find(
    (country: CountryModelRead) => country.name === 'France',
  )?.country_id

  const handleSaveProperty = async ({
    property,
    owner,
    tenant,
    newOwner,
  }: {
    property: PropertySerializerRead
    owner: UserSerializerRead
    tenant?: any
    newOwner?: any
  }) => {
    if (values?.is_sale) {
      await updateUser({
        id: owner.user_id,
        name: owner.name,
        firstname: owner.firstname,
        mail: owner.mail,
        phone: owner.phone,
        role_id: owner.role_id,
        agency_id: owner.agency_id,
      })
      if (newOwner?.user_id) {
        await updateUser({
          id: newOwner.user_id,
          name: newOwner.name,
          firstname: newOwner.firstname,
          mail: newOwner.mail,
          phone: newOwner.phone,
          role_id: newOwner.role_id,
          agency_id: newOwner.agency_id,
        })

        const updateResponse = (await updateProperty({
          id: property.property_id,
          owner_id: newOwner.user_id,
        })) as any

        if (updateResponse.error) {
          toast.error(updateResponse.error.data.message)
        }

        if (updateResponse?.data) {
          toast.success('La vente a bien été effectuée')
          navigateToProperties()
          dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
        }

        const buyerMailResult = (await saleMailBuyer({
          property: values.selected_property,
          new_owner: values?.new_owner_id
            ? values?.new_owner_id
            : (values?.new_owner.user_id as number),
        })) as any

        if (buyerMailResult.error) {
          toast.error(buyerMailResult.error.data.message)
        }

        const salerMailResult = (await saleMailSaler({
          property: values.selected_property,
          new_owner: values?.new_owner_id
            ? values?.new_owner_id
            : (values?.new_owner.user_id as number),
        })) as any

        if (salerMailResult.error) {
          toast.error(salerMailResult.error.data.message)
        }
      } else {
        const password = useGeneratePassword()

        const coordonates = await getCoordonates(newOwner)

        const addressResponse = await createAddress({
          address: newOwner?.way,
          city: newOwner?.city,
          zipcode: newOwner?.zipcode,
          longitude: coordonates?.[0] ?? 0,
          latitude: coordonates?.[1] ?? 0,
        }).unwrap()

        const newOwnerIdResult = (await createUser({
          name: newOwner.name,
          firstname: newOwner.firstname,
          mail: newOwner.mail,
          password: password,
          phone: newOwner.phone,
          role_id: userRole,
          agency_id: currentAgency,
          address_id: addressResponse.address_id,
          newsletter: false,
          country_id: country,
        })) as any

        if (newOwnerIdResult?.error) {
          toast.error(newOwnerIdResult?.error?.data?.message)
          return
        }

        await resetPasswordMail({
          id: newOwnerIdResult?.data?.user_id,
        })

        const updateResponse = (await updateProperty({
          id: property.property_id,
          owner_id: newOwnerIdResult?.data.user_id,
        })) as any

        if (updateResponse.error) {
          toast.error(updateResponse.error.data.message)
        }

        if (updateResponse?.data) {
          toast.success('La vente a bien été effectuée')
          navigateToProperties()
          dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
        }

        const buyerMailResult = (await saleMailBuyer({
          property: values.selected_property,
          new_owner: values?.new_owner_id
            ? values?.new_owner_id
            : (values?.new_owner.user_id as number),
        })) as any

        if (buyerMailResult.error) {
          toast.error(buyerMailResult.error.data.message)
        }

        const salerMailResult = (await saleMailSaler({
          property: values.selected_property,
          new_owner: values?.new_owner_id
            ? values?.new_owner_id
            : (values?.new_owner.user_id as number),
        })) as any

        if (salerMailResult.error) {
          toast.error(salerMailResult.error.data.message)
        }
      }
    } else {
      await updateUser({
        id: owner.user_id,
        name: owner.name,
        firstname: owner.firstname,
        mail: owner.mail,
        phone: owner.phone,
        role_id: owner.role_id,
        agency_id: owner.agency_id,
      })
      if (tenant?.user_id) {
        await updateUser({
          id: tenant.user_id,
          name: tenant.name,
          firstname: tenant.firstname,
          mail: tenant.mail,
          phone: tenant.phone,
          role_id: tenant.role_id,
          agency_id: tenant.agency_id,
        })

        const updateResponse = (await updateProperty({
          id: property.property_id,
          tenant_id: tenant.user_id,
        })) as any

        if (updateResponse.error) {
          toast.error(updateResponse.error.data.message)
        }

        if (updateResponse?.data) {
          toast.success('La modification de la location a bien été effectuée')
          navigateToProperties()
          dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
        }

        const ownerMailResult = (await rentMailOwner({
          property: values.selected_property,
          tenant: values?.tenant_id
            ? values?.tenant_id
            : (values?.tenant?.user_id as number),
        })) as any

        if (ownerMailResult.error) {
          toast.error(ownerMailResult.error.data.message)
        }

        const tenantMailResult = (await rentMailTenant({
          property: values.selected_property,
          tenant: values?.tenant_id
            ? values?.tenant_id
            : (values?.tenant?.user_id as number),
        })) as any

        if (tenantMailResult.error) {
          toast.error(tenantMailResult.error.data.message)
        }
      } else {
        const password = useGeneratePassword()

        const coordonates = await getCoordonates(tenant)

        const addressResponse = await createAddress({
          address: tenant?.way,
          city: tenant?.city,
          zipcode: tenant?.zipcode,
          longitude: coordonates?.[0] ?? 0,
          latitude: coordonates?.[1] ?? 0,
        }).unwrap()

        const newTenantIdResult = (await createUser({
          name: tenant?.name,
          firstname: tenant?.firstname,
          mail: tenant?.mail,
          password: password,
          phone: tenant?.phone,
          role_id: userRole,
          agency_id: currentAgency,
          address_id: addressResponse.address_id,
          newsletter: false,
          country_id: country,
        })) as any

        if (newTenantIdResult?.error) {
          toast.error(newTenantIdResult?.error?.data?.message)
          return
        }

        await resetPasswordMail({
          id: newTenantIdResult?.data?.user_id,
        })

        const updateResponse = (await updateProperty({
          id: property.property_id,
          tenant_id: newTenantIdResult?.data.user_id,
        })) as any

        if (updateResponse.error) {
          toast.error(updateResponse.error.data.message)
        }

        if (updateResponse?.data) {
          toast.success('La modification de la location a bien été effectuée')
          navigateToProperties()
          dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
        }

        const ownerMailResult = (await rentMailOwner({
          property: values.selected_property,
          tenant: values?.tenant_id
            ? values?.tenant_id
            : (values?.tenant?.user_id as number),
        })) as any

        if (ownerMailResult.error) {
          toast.error(ownerMailResult.error.data.message)
        }

        const tenantMailResult = (await rentMailTenant({
          property: values.selected_property,
          tenant: values?.tenant_id
            ? values?.tenant_id
            : (values?.tenant?.user_id as number),
        })) as any

        if (tenantMailResult.error) {
          toast.error(tenantMailResult.error.data.message)
        }
      }
    }
  }

  return (
    <AddSaleOrLocationManagement
      properties={properties}
      saveProperty={handleSaveProperty}
    />
  )
}
