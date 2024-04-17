import { useEffect, useState } from 'react'
import {
  PropertySerializerRead,
  PropertyTypeSerializerRead,
  RoleSerializerRead,
  StatusSerializerRead,
  UserSerializerRead,
} from '../../../../api'
import Button from '../../../../components/atoms/Button'
import Typography from '../../../../components/atoms/Typography'
import FormikCheckbox from '../../../../components/molecules/core/FormikCheckbox'
import FormikSelect from '../../../../components/molecules/core/FormikSelect'
import FormikTextField from '../../../../components/molecules/core/FormikTextField'
import { setSelectedPropertyId } from '../../../../features/property/propertySlice'
import { useGetPropertyTypesQuery } from '../../../../features/propertyType/propertyTypeApi'
import { useGetRolesQuery } from '../../../../features/role/roleApi'
import { useGetStatusQuery } from '../../../../features/status/statusApi'
import { useLazyGetUserByFilterQuery } from '../../../../features/user/userApi'
import { useAppDispatch } from '../../../../store/store'
import {
  dpeList,
  numberList,
  surfaceList,
  yearList,
} from '../../../Properties/constants/constants'

export default function PropertyDetailsFirstStep({
  property,
  images,
  setStep,
  selectedImage,
  openModal,
}: {
  property: PropertySerializerRead
  images: string[]
  setStep: (step: number) => void
  selectedImage: number
  openModal: () => void
}) {
  const dispatch = useAppDispatch()

  const currentAgency = JSON.parse(
    localStorage.getItem('user') as string,
  ).agency_id

  const roles = useGetRolesQuery({}).data || []
  const property_types = useGetPropertyTypesQuery({}).data || []

  const [users, setUsers] = useState<UserSerializerRead[]>([])

  const [triggerGetUsersQuery, getUsersQueryResult] =
    useLazyGetUserByFilterQuery()

  useEffect(() => {
    triggerGetUsersQuery({
      agency: currentAgency,
      role: roles.find((role: RoleSerializerRead) => role.name === 'USER')
        ?.role_id,
    })
  }, [property])

  useEffect(() => {
    if (getUsersQueryResult.data) {
      setUsers(getUsersQueryResult.data)
    }
  }, [getUsersQueryResult.data])

  const statuses = useGetStatusQuery({}).data || []

  return (
    <>
      <div className='w-5/12 h-[250px] p-1 rounded-md' onClick={openModal}>
        {
          <img
            src={`https://back-rently.mathieudacheux.fr/public/img/property/${property?.property_id}/${images[selectedImage]}`}
            alt='property'
            key={`${property.property_id}-${images[selectedImage]}`}
            className='property-image h-full w-full rounded-md object-center'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src =
                'https://back-rently.mathieudacheux.fr/public/img/property/placeholder.png'
            }}
          />
        }
      </div>
      <div className='w-11/12 flex flex-col items-start my-4'>
        <Typography variant='h1' className='text-center'>
          Caractéristiques du bien
        </Typography>
        <div className='w-full flex justify-between'>
          <div className='mt-4 w-[74%]'>
            <FormikTextField
              name='name'
              label='Titre du bien'
              placeholder='Manoir du lac...'
            />
          </div>
          <div className='mt-4 w-[22%]'>
            <FormikSelect
              options={users.map((user: UserSerializerRead) => ({
                label: `${user.firstname} ${user.name}`,
                value: user.user_id as number,
              }))}
              name='owner_id'
              label='Propriétaire'
              placeholder='Jacques Dupont'
            />
          </div>
        </div>
        <div className=' flex flex-col justify-center w-full h-full pt-5 mt-4'>
          <div className='flex justify-between mb-4'>
            <div className='w-[22%]'>
              <FormikSelect
                options={property_types.map(
                  (property_type: PropertyTypeSerializerRead) => ({
                    label: property_type.label,
                    value: property_type.property_type_id,
                  }),
                )}
                name='property_type'
                label='Type de logement'
                placeholder='Appartement, Maison...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='number_room'
                label='Nombre de pièces'
                placeholder='1, 2, 3...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikTextField name='price' label='Prix' placeholder='250000' />
            </div>
            <div className='w-[22%]'>
              <FormikTextField
                name='surface'
                label='Surface'
                placeholder='30m²'
              />
            </div>
          </div>
          <div className='flex justify-between my-4'>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='bedroom'
                label='Nombre de chambres'
                placeholder='1, 2, 3...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='bathroom'
                label='Nombre de salles de bain'
                placeholder='1, 2, 3...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='toilet'
                label='Nomber de toilettes'
                placeholder='1, 2, 3...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='kitchen'
                label='Nombre de cuisines'
                placeholder='1, 2, 3...'
              />
            </div>
          </div>
          <div className='flex justify-between my-4'>
            <div className='w-[22%]'>
              <FormikSelect
                options={yearList}
                name='year_construction'
                label='Année de construction'
                placeholder='2021, 2020, 2019...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={dpeList}
                name='dpe'
                label='DPE'
                placeholder='A, B, C...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={surfaceList}
                name='land_size'
                label='Taille du terrain'
                placeholder='200m² min'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={statuses.map((status: StatusSerializerRead) => ({
                  label: status.name,
                  value: status.status_id,
                }))}
                name='status_id'
                label='Statut'
                placeholder='Location, Vente...'
              />
            </div>
          </div>
          <div className='flex w-full justify-center'>
            <div className=' w-4/5 flex flex-wrap justify-center'>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='elevator' label='properties.elevator' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='terrace' label='properties.terace' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='balcony' label='properties.balcony' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='cellar' label='properties.cellar' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='parking' label='properties.parking' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='garden' label='properties.garden' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='garage' label='properties.garage' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='pool' label='properties.swimmingPool' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='caretaker' label='properties.keeper' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='fiber_deployed'
                  label='properties.fiber'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='duplex' label='properties.duplex' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='ground_floor'
                  label='properties.groundFloor'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='top_floor' label='properties.lastFloor' />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='life_annuity'
                  label='properties.lifeAnnuity'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox name='work_done' label='properties.workDone' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-2/12 justify-between mt-2'>
        <Button
          text='Quitter'
          onClick={() =>
            dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
          }
        />
        <Button text='Suivant' onClick={() => setStep(2)} />
      </div>
    </>
  )
}
