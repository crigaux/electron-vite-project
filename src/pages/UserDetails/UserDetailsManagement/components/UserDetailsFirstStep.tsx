import { useFormikContext } from 'formik'
import { toast } from 'sonner'
import Chart from 'react-apexcharts'
import { CountryModelRead, RoleSerializerRead } from '../../../../api'
import Button from '../../../../components/atoms/Button'
import Typography from '../../../../components/atoms/Typography'
import FormikTextField from '../../../../components/molecules/core/FormikTextField'
import { useCreateAddressMutation } from '../../../../features/address/addressApi'
import { useGetCountriesQuery } from '../../../../features/country/countryApi'
import { useGetRolesQuery } from '../../../../features/role/roleApi'
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../../../../features/user/userApi'
import { setSelectedUserId } from '../../../../features/user/userSlice'
import { useAppDispatch } from '../../../../store/store'
import useGeneratePassword from '../../../../hooks/useGeneratePassword'
import useFormikValidator from '../../../../hooks/useFormikValidator'
import { useResetPasswordMailMutation } from '../../../../features/mail/mailApi'
import { useGetAllOwnerFeesQuery } from '../../../../features/fees/feesApi.ts'
import { MONTHS } from '../../../../constants/constants.ts'
import { useTranslation } from 'react-i18next'

export default function UserDetailsFirstStep({
  user,
}: Readonly<{ user: any }>) {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const ownerFees = useGetAllOwnerFeesQuery(user.user_id)

  const formikContext = useFormikContext<any>()
  const { values } = formikContext

  const formikValidator = useFormikValidator(formikContext)

  const password = useGeneratePassword()

  const currentAgency = JSON.parse(
    localStorage.getItem('user') as string,
  ).agency_id

  const userRoles = useGetRolesQuery({}).data || []

  const userRole = userRoles.find(
    (role: RoleSerializerRead) => role.name === 'USER',
  )?.role_id

  const countryList = useGetCountriesQuery({}).data || []
  const country = countryList.find(
    (country: CountryModelRead) => country.name === 'France',
  )?.country_id

  const [updateUser] = useUpdateUserMutation()
  const [createUser] = useCreateUserMutation()
  const [createAddress] = useCreateAddressMutation()
  const [resetPasswordMail] = useResetPasswordMailMutation()

  const patchUser = async () => {
    let addressId = null
    if (!user?.address_id) {
      const coordonates = await getCoordonates()

      const addressResponse = await createAddress({
        address: values.way,
        city: values.city,
        zipcode: values.zipcode,
        longitude: coordonates?.[0] ?? 0,
        latitude: coordonates?.[1] ?? 0,
      }).unwrap()

      addressId = addressResponse.address_id

      if (!addressResponse) return false
    }

    const response = (await updateUser({
      id: user.user_id,
      name: values.name,
      firstname: values.firstname,
      mail: values.mail,
      phone: values.phone,
      role_id: userRole,
      agency_id: currentAgency,
      ...(addressId && { address_id: addressId }),
    })) as any

    if (response?.error) {
      toast.error(response?.error?.data?.message)
      return false
    }

    return true
  }

  const getCoordonates = async () => {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${values.way} ${values.zipcode} ${values.city}`,
    )
    const result = await response.json()
    const features = result.features
    const coordinates = features[0].geometry.coordinates
    return coordinates
  }

  const postUser = async () => {
    const coordonates = await getCoordonates()

    const addressResponse = await createAddress({
      address: values.way,
      city: values.city,
      zipcode: values.zipcode,
      longitude: coordonates?.[0] ?? 0,
      latitude: coordonates?.[1] ?? 0,
    }).unwrap()

    if (!addressResponse) return false

    const response = (await createUser({
      name: values.name,
      firstname: values.firstname,
      mail: values.mail,
      password: password,
      phone: values.phone,
      role_id: userRole,
      agency_id: currentAgency,
      address_id: addressResponse.address_id,
      newsletter: false,
      country_id: country,
    })) as any

    if (response?.error) {
      toast.error(response?.error?.data?.message)
      return false
    }

    await resetPasswordMail({
      id: response?.data?.user_id,
    })

    toast.success("Création de l'utilisateur réussie, un mail a été envoyé")
    return true
  }

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: MONTHS.map((month) => t(month)),
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '70%',
      },
    },
  }

  const series = [
    {
      name: 'Revenu Mensuel',
      data: ownerFees?.data ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      color: '#4A43EC',
    },
  ]

  return (
    <>
      <div className='w-11/12 flex flex-col items-start my-4'>
        <Typography variant='h1' className='text-center'>
          Profil utilisateur
        </Typography>
        <div className='flex flex-wrap justify-between w-[70%]'>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='firstname'
              label='Prénom'
              placeholder='Prénom...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField name='name' label='Nom' placeholder='Nom...' />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='phone'
              label='Téléphone'
              placeholder='Téléphone...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='mail'
              label='Mail'
              placeholder='jeandupont@mail.fr...'
            />
          </div>
        </div>
        <div className=' flex flex-col justify-center w-full h-full pt-5 mt-4'>
          <div className='w-[70%] mt-4 flex flex-col items-start'>
            <Typography variant='h1' className='text-center'>
              Adresse
            </Typography>
            <div className='flex justify-between w-full mb-4'>
              <div className='w-[45%] mt-4'>
                <FormikTextField
                  name='way'
                  label='Adresse'
                  placeholder='12 rue de la paix'
                />
              </div>
              <div className='w-[12%] mt-4'>
                <FormikTextField
                  name='zipcode'
                  label='Code postal'
                  placeholder='75000'
                />
              </div>
              <div className='w-[23%] mt-4'>
                <FormikTextField
                  name='city'
                  label='Ville'
                  placeholder='Paris'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-2/12 justify-between mt-2'>
        <Button
          text='Quitter'
          onClick={() => dispatch(setSelectedUserId({ selectedUserId: null }))}
        />
        <Button
          text='Sauvegarder'
          onClick={async () => {
            const isValid = await formikValidator(values)

            if (!isValid) return

            const isSaved = user.user_id ? await patchUser() : await postUser()
            if (!isSaved) return
            dispatch(setSelectedUserId({ selectedUserId: null }))
          }}
        />
      </div>
      {ownerFees?.data && (
        <div className='w-11/12 mt-4'>
          <Typography variant='h1' className='text-neutral-900 mb-2'>
            Revenus mensuels
          </Typography>
          <Chart
            options={options}
            series={series}
            type='bar'
            width='900px'
            height='300px'
          />
        </div>
      )}
    </>
  )
}
