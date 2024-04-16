import { useFormikContext } from 'formik'
import Button from '../../../components/atoms/Button'
import FormikCheckbox from '../../../components/molecules/core/FormikCheckbox'
import FormikSelect from '../../../components/molecules/core/FormikSelect'
import FormikTextField from '../../../components/molecules/core/FormikTextField'
import {
  PropertyTypeSerializerRead,
  RoleSerializerRead,
  StatusSerializerRead,
  UserSerializerRead,
} from '../../../api'
import {
  dpeList,
  numberList,
  surfaceList,
  yearList,
} from '../../Properties/constants/constants'
import Typography from '../../../components/atoms/Typography'
import { useGetRolesQuery } from '../../../features/role/roleApi'
import { useGetPropertyTypesQuery } from '../../../features/propertyType/propertyTypeApi'
import { useLazyGetUserByFilterQuery } from '../../../features/user/userApi'
import { useGetStatusQuery } from '../../../features/status/statusApi'
import { useAppDispatch } from '../../../store/store'
import { setSelectedPropertyId } from '../../../features/property/propertySlice'
import { AddSaleOrLocationFormikType } from '../type'
import { useEffect, useState } from 'react'

export default function AddSaleOrLocationFirstStep({
  setStep,
}: {
  setStep: (step: number) => void
}) {
  const dispatch = useAppDispatch()

  const { values, setFieldValue } =
    useFormikContext<AddSaleOrLocationFormikType>()

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
  }, [values?.selected_property])

  useEffect(() => {
    if (getUsersQueryResult.data) {
      setUsers(getUsersQueryResult.data)
    }
  }, [getUsersQueryResult.data])
  const statuses = useGetStatusQuery({}).data || []

  return (
    <div className='w-full flex flex-col items-center mt-6'>
      <div className='w-11/12 flex flex-col items-start my-4'>
        <Typography variant='h1' className='text-center'>
          Caractéristiques du bien
        </Typography>
        <div className='w-full flex justify-between'>
          <div className='mt-4 w-[74%]'>
            <FormikTextField
              name='selected_property.name'
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
              name='selected_property.owner_id'
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
                name='selected_property.property_type'
                label='Type de logement'
                placeholder='Appartement, Maison...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='selected_property.number_room'
                label='Nombre de pièces'
                placeholder='1, 2, 3...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikTextField
                name='selected_property.price'
                label='Prix'
                placeholder='250000'
              />
            </div>
            <div className='w-[22%]'>
              <FormikTextField
                name='selected_property.surface'
                label='Surface'
                placeholder='30m²'
              />
            </div>
          </div>
          <div className='flex justify-between my-4'>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='selected_property.bedroom'
                label='Nombre de chambres'
                placeholder='1, 2, 3...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='selected_property.bathroom'
                label='Nombre de salles de bain'
                placeholder='1, 2, 3...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='selected_property.toilet'
                label='Nomber de toilettes'
                placeholder='1, 2, 3...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={numberList}
                name='selected_property.kitchen'
                label='Nombre de cuisines'
                placeholder='1, 2, 3...'
              />
            </div>
          </div>
          <div className='flex justify-between my-4'>
            <div className='w-[22%]'>
              <FormikSelect
                options={yearList}
                name='selected_property.year_construction'
                label='Année de construction'
                placeholder='2021, 2020, 2019...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={dpeList}
                name='selected_property.dpe'
                label='DPE'
                placeholder='A, B, C...'
              />
            </div>
            <div className='w-[22%]'>
              <FormikSelect
                options={surfaceList}
                name='selected_property.land_size'
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
                name='selected_property.status_id'
                label='Statut'
                placeholder='Location, Vente...'
              />
            </div>
          </div>
          <div className='flex w-full justify-center'>
            <div className=' w-4/5 flex flex-wrap justify-center'>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.elevator'
                  label='properties.elevator'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.terrace'
                  label='properties.terace'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.balcony'
                  label='properties.balcony'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.cellar'
                  label='properties.cellar'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.parking'
                  label='properties.parking'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.garden'
                  label='properties.garden'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.garage'
                  label='properties.garage'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.pool'
                  label='properties.swimmingPool'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.caretaker'
                  label='properties.keeper'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.fiber_deployed'
                  label='properties.fiber'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.duplex'
                  label='properties.duplex'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.ground_floor'
                  label='properties.groundFloor'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.top_floor'
                  label='properties.lastFloor'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.life_annuity'
                  label='properties.lifeAnnuity'
                />
              </div>
              <div className={`my-3 whitespace-nowrap mx-1`}>
                <FormikCheckbox
                  name='selected_property.work_done'
                  label='properties.workDone'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-2/12 flex justify-between fixed bottom-5'>
        <Button
          text='Retour'
          onClick={() => {
            setFieldValue('property_id', null)
            setFieldValue('new_owner_id', null)
            setFieldValue('new_owner', false)
            setFieldValue('tenant_id', null)
            dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
            setStep(1)
          }}
        />
        <Button
          text='Suivant'
          onClick={() => {
            setStep(2)
          }}
        />
      </div>
    </div>
  )
}
