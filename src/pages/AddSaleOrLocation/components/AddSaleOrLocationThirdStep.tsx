import { useFormikContext } from 'formik'
import { AddSaleOrLocationFormikType } from '../type'
import {
  useGetUserByFilterQuery,
  useLazyGetUserByIdQuery,
} from '../../../features/user/userApi'
import { useEffect } from 'react'
import Typography from '../../../components/atoms/Typography'
import FormikTextField from '../../../components/molecules/core/FormikTextField'
import Button from '../../../components/atoms/Button'
import FormikSelect from '../../../components/molecules/core/FormikSelect'
import { useGetRolesQuery } from '../../../features/role/roleApi'
import {
  PropertySerializerRead,
  RoleSerializerRead,
  UserSerializerRead,
} from '../../../api'

export default function AddSaleOrLocationThirdStep({
  setStep,
  saveProperty,
}: {
  setStep: (step: number) => void
  saveProperty: ({
    property,
    owner,
    tenant,
    newOwner,
  }: {
    property: PropertySerializerRead
    owner: UserSerializerRead
    tenant?: UserSerializerRead | undefined
    newOwner?: UserSerializerRead | undefined
  }) => void
}) {
  const { values, setFieldValue } =
    useFormikContext<AddSaleOrLocationFormikType>()

  const [triggerTenantGetQuery, tenantGetQueryResult] =
    useLazyGetUserByIdQuery()
  const [triggerOwnerGetQuery, ownerGetQueryResult] = useLazyGetUserByIdQuery()

  useEffect(() => {
    if (values.tenant_id) {
      triggerTenantGetQuery(values.tenant_id)
    } else if (values.selected_property.tenant_id) {
      triggerTenantGetQuery(values.selected_property.tenant_id)
    }
  }, [values.selected_property.tenant_id])

  useEffect(() => {
    if (values.new_owner_id) {
      triggerOwnerGetQuery(values.new_owner_id)
    }
  }, [values.new_owner_id])

  useEffect(() => {
    if (ownerGetQueryResult.data && !ownerGetQueryResult?.isLoading)
      setFieldValue('new_owner', ownerGetQueryResult.data)
  }, [ownerGetQueryResult])

  const currentAgency = JSON.parse(
    localStorage.getItem('user') as string,
  ).agency_id

  const roles = useGetRolesQuery({}).data || []

  const users =
    useGetUserByFilterQuery({
      agency: currentAgency,
      role: roles.find((role: RoleSerializerRead) => role.name === 'USER')
        ?.role_id,
    }).data || []

  useEffect(() => {
    if (tenantGetQueryResult.data)
      setFieldValue('tenant', tenantGetQueryResult.data)
  }, [tenantGetQueryResult])

  useEffect(() => {
    if (values?.new_tenant) {
      setFieldValue('tenant', null)
    }
  }, [values?.new_tenant])

  if (!values?.is_sale) {
    return !values?.new_tenant ? (
      <div className='w-full flex flex-col items-center my-4'>
        <div className='w-full my-5 flex justify-center'>
          <FormikSelect
            name='selected_property.tenant_id'
            label='Locataire'
            placeholder='Choisir un locataire...'
            options={users
              .filter(
                (user: UserSerializerRead) =>
                  user?.user_id !== values?.selected_property?.owner_id,
              )
              .map((user: UserSerializerRead) => ({
                label: `${user.firstname} ${user.name}`,
                value: user.user_id,
              }))}
          />
        </div>
        <Typography variant='h1' className='text-center'>
          Profil du locataire
        </Typography>
        <div className='flex flex-wrap justify-between w-[70%]'>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='tenant.firstname'
              label='Prénom'
              placeholder='Prénom...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='tenant.name'
              label='Nom'
              placeholder='Nom...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='tenant.phone'
              label='Téléphone'
              placeholder='Téléphone...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='tenant.mail'
              label='Mail'
              placeholder='jeandupont@mail.fr...'
            />
          </div>
        </div>
        <div className='w-[70%] mt-4 flex flex-col items-start'>
          <Typography variant='h1' className='text-center'>
            Adresse
          </Typography>
          <div className='flex justify-between w-full mb-4'>
            <div className='w-[45%] mt-4'>
              <FormikTextField
                name='tenant.way'
                label='Adresse'
                placeholder='12 rue de la paix'
              />
            </div>
            <div className='w-[12%] mt-4'>
              <FormikTextField
                name='tenant.zipcode'
                label='Code postal'
                placeholder='75000'
              />
            </div>
            <div className='w-[23%] mt-4'>
              <FormikTextField
                name='tenant.city'
                label='Ville'
                placeholder='Paris'
              />
            </div>
          </div>
          <div className='w-full flex flex-col items-center py-2'>
            <Typography variant='h1' className='text-center pb-4'>
              Ou ajouter un nouveau locataire
            </Typography>
            <Button
              text='Ajouter un locataire'
              onClick={() => {
                setFieldValue('selected_property.tenant_id', null)
                setFieldValue('tenant', null)
                setFieldValue('new_tenant', true)
              }}
            />
          </div>
        </div>
        <div className='w-2/12 flex justify-between fixed bottom-5'>
          <Button
            text='Retour'
            onClick={() => {
              setStep(2)
            }}
          />
          <Button
            text='Sauvegarder'
            disabled={!values?.tenant && !values?.tenant_id}
            onClick={() => {
              saveProperty({
                property: values.selected_property,
                owner: values.owner,
                tenant: values.tenant,
              })
            }}
          />
        </div>
      </div>
    ) : (
      <div className='w-full flex flex-col items-center my-4'>
        <Typography variant='h1' className='text-center'>
          Nouveau locataire
        </Typography>
        <div className='flex flex-wrap justify-between w-[70%]'>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='tenant.firstname'
              label='Prénom'
              placeholder='Prénom...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='tenant.name'
              label='Nom'
              placeholder='Nom...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='tenant.phone'
              label='Téléphone'
              placeholder='Téléphone...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='tenant.mail'
              label='Mail'
              placeholder='jeandupont@mail.fr...'
            />
          </div>
        </div>
        <div className='w-[70%] mt-4 flex flex-col items-start'>
          <Typography variant='h1' className='text-center'>
            Adresse
          </Typography>
          <div className='flex justify-between w-full mb-4'>
            <div className='w-[45%] mt-4'>
              <FormikTextField
                name='tenant.way'
                label='Adresse'
                placeholder='12 rue de la paix'
              />
            </div>
            <div className='w-[12%] mt-4'>
              <FormikTextField
                name='tenant.zipcode'
                label='Code postal'
                placeholder='75000'
              />
            </div>
            <div className='w-[23%] mt-4'>
              <FormikTextField
                name='tenant.city'
                label='Ville'
                placeholder='Paris'
              />
            </div>
          </div>
          <div className='w-full flex flex-col items-center py-2'>
            <Typography variant='h1' className='text-center pb-4'>
              Choisir un locataire
            </Typography>
            <Button
              text='Choisir un locataire'
              onClick={() => {
                setFieldValue('selected_property.tenant_id', null)
                setFieldValue('tenant', null)
                setFieldValue('new_tenant', false)
              }}
            />
          </div>
        </div>
        <div className='w-2/12 flex justify-between fixed bottom-5'>
          <Button
            text='Retour'
            onClick={() => {
              setStep(2)
            }}
          />
          <Button
            text='Sauvegarder'
            disabled={!values?.tenant && !values?.tenant_id}
            onClick={() => {
              saveProperty({
                property: values.selected_property,
                owner: values.owner,
                tenant: values.tenant,
              })
            }}
          />
        </div>
      </div>
    )
  } else {
    return !values?.is_new_owner ? (
      <div className='w-full flex flex-col items-center my-4'>
        <div className='w-full my-5 flex justify-center'>
          <FormikSelect
            name='new_owner_id'
            label='Nouveau propriétaire'
            placeholder='Choisir un propriétaire...'
            options={users
              .filter(
                (user: UserSerializerRead) =>
                  user?.user_id !== values?.selected_property?.owner_id,
              )
              .map((user: UserSerializerRead) => ({
                label: `${user.firstname} ${user.name}`,
                value: user.user_id,
              }))}
          />
        </div>
        <Typography variant='h1' className='text-center'>
          Profil du nouveau propriétaire
        </Typography>
        <div className='flex flex-wrap justify-between w-[70%]'>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='new_owner.firstname'
              label='Prénom'
              placeholder='Prénom...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='new_owner.name'
              label='Nom'
              placeholder='Nom...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='new_owner.phone'
              label='Téléphone'
              placeholder='Téléphone...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='new_owner.mail'
              label='Mail'
              placeholder='jeandupont@mail.fr...'
            />
          </div>
        </div>
        <div className='w-[70%] mt-4 flex flex-col items-start'>
          <Typography variant='h1' className='text-center'>
            Adresse
          </Typography>
          <div className='flex justify-between w-full mb-4'>
            <div className='w-[45%] mt-4'>
              <FormikTextField
                name='new_owner.way'
                label='Adresse'
                placeholder='12 rue de la paix'
              />
            </div>
            <div className='w-[12%] mt-4'>
              <FormikTextField
                name='new_owner.zipcode'
                label='Code postal'
                placeholder='75000'
              />
            </div>
            <div className='w-[23%] mt-4'>
              <FormikTextField
                name='new_owner.city'
                label='Ville'
                placeholder='Paris'
              />
            </div>
          </div>
          <div className='w-full flex flex-col items-center py-2'>
            <Typography variant='h1' className='text-center pb-4'>
              Ou ajouter un nouveau propriétaire
            </Typography>
            <Button
              text='Ajouter un propriétaire'
              onClick={() => {
                setFieldValue('new_owner_id', null)
                setFieldValue('new_owner', null)
                setFieldValue('is_new_owner', true)
              }}
            />
          </div>
        </div>
        <div className='w-2/12 flex justify-between fixed bottom-5'>
          <Button
            text='Retour'
            onClick={() => {
              setStep(2)
            }}
          />
          <Button
            text='Sauvegarder'
            disabled={!values?.new_owner_id && !values?.new_owner}
            onClick={() => {
              saveProperty({
                property: values.selected_property,
                owner: values.owner,
                newOwner: values.new_owner,
              })
            }}
          />
        </div>
      </div>
    ) : (
      <div className='w-full flex flex-col items-center my-4'>
        <Typography variant='h1' className='text-center'>
          Nouveau propriétaire
        </Typography>
        <div className='flex flex-wrap justify-between w-[70%]'>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='new_owner.firstname'
              label='Prénom'
              placeholder='Prénom...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='new_owner.name'
              label='Nom'
              placeholder='Nom...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='new_owner.phone'
              label='Téléphone'
              placeholder='Téléphone...'
            />
          </div>
          <div className='mt-4 w-[45%]'>
            <FormikTextField
              name='new_owner.mail'
              label='Mail'
              placeholder='jeandupont@mail.fr...'
            />
          </div>
        </div>
        <div className='w-[70%] mt-4 flex flex-col items-start'>
          <Typography variant='h1' className='text-center'>
            Adresse
          </Typography>
          <div className='flex justify-between w-full mb-4'>
            <div className='w-[45%] mt-4'>
              <FormikTextField
                name='new_owner.way'
                label='Adresse'
                placeholder='12 rue de la paix'
              />
            </div>
            <div className='w-[12%] mt-4'>
              <FormikTextField
                name='new_owner.zipcode'
                label='Code postal'
                placeholder='75000'
              />
            </div>
            <div className='w-[23%] mt-4'>
              <FormikTextField
                name='new_owner.city'
                label='Ville'
                placeholder='Paris'
              />
            </div>
          </div>
          <div className='w-full flex flex-col items-center py-2'>
            <Typography variant='h1' className='text-center pb-4'>
              Choisir un nouveau propriétaire
            </Typography>
            <Button
              text='Choisir un propriétaire'
              onClick={() => {
                setFieldValue('selected_property.owner.user_id', null)
                setFieldValue('new_owner', null)
                setFieldValue('is_new_owner', false)
              }}
            />
          </div>
        </div>
        <div className='w-2/12 flex justify-between fixed bottom-5'>
          <Button
            text='Retour'
            onClick={() => {
              setStep(2)
            }}
          />
          <Button
            text='Sauvegarder'
            disabled={!values?.new_owner_id && !values?.new_owner}
            onClick={() => {
              saveProperty({
                property: values.selected_property,
                owner: values.owner,
                newOwner: values.new_owner,
              })
            }}
          />
        </div>
      </div>
    )
  }
}
