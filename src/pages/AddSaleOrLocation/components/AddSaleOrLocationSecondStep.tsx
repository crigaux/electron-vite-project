import { useFormikContext } from 'formik'
import { AddSaleOrLocationFormikType } from '../type'
import { useGetUserByIdQuery } from '../../../features/user/userApi'
import Typography from '../../../components/atoms/Typography'
import FormikTextField from '../../../components/molecules/core/FormikTextField'
import { useEffect } from 'react'
import Button from '../../../components/atoms/Button'

export default function AddSaleOrLocationSecondStep({
  setStep,
}: {
  setStep: (step: number) => void
}) {
  const { values, setFieldValue } =
    useFormikContext<AddSaleOrLocationFormikType>()

  const owner = useGetUserByIdQuery(values.selected_property.owner_id)

  useEffect(() => {
    if (owner.data) setFieldValue('owner', owner.data)
  }, [owner])

  return (
    <div className='w-full flex flex-col items-center my-4'>
      <Typography variant='h1' className='text-center'>
        Profil du propriétaire
      </Typography>
      <div className='flex flex-wrap justify-between w-[70%]'>
        <div className='mt-4 w-[45%]'>
          <FormikTextField
            name='owner.firstname'
            label='Prénom'
            placeholder='Prénom...'
          />
        </div>
        <div className='mt-4 w-[45%]'>
          <FormikTextField name='owner.name' label='Nom' placeholder='Nom...' />
        </div>
        <div className='mt-4 w-[45%]'>
          <FormikTextField
            name='owner.phone'
            label='Téléphone'
            placeholder='Téléphone...'
          />
        </div>
        <div className='mt-4 w-[45%]'>
          <FormikTextField
            name='owner.mail'
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
              name='owner.way'
              label='Adresse'
              placeholder='12 rue de la paix'
            />
          </div>
          <div className='w-[12%] mt-4'>
            <FormikTextField
              name='owner.zipcode'
              label='Code postal'
              placeholder='75000'
            />
          </div>
          <div className='w-[23%] mt-4'>
            <FormikTextField
              name='owner.city'
              label='Ville'
              placeholder='Paris'
            />
          </div>
        </div>
      </div>
      <div className='w-2/12 flex justify-between fixed bottom-5'>
        <Button
          text='Retour'
          onClick={() => {
            setStep(1)
          }}
        />
        <Button
          text='Suivant'
          onClick={() => {
            setStep(3)
          }}
        />
      </div>
    </div>
  )
}
