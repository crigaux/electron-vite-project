import { useFormikContext } from 'formik'
import { PropertySerializerRead } from '../../../../api'
import Button from '../../../../components/atoms/Button'
import Typography from '../../../../components/atoms/Typography'
import FormikTextArea from '../../../../components/molecules/core/FormikTextArea'
import FormikTextField from '../../../../components/molecules/core/FormikTextField'
import { useUpdatePropertyMutation } from '../../../../features/property/propertyApi'
import { setSelectedPropertyId } from '../../../../features/property/propertySlice'
import { useAppDispatch } from '../../../../store/store'

export default function PropertyDetailsSecondStep({
  property,
  images,
  setStep,
}: {
  property: PropertySerializerRead
  images: string[]
  setStep: (step: number) => void
}) {
  const { values } = useFormikContext<PropertySerializerRead>()
  const dispatch = useAppDispatch()

  const [updateProperty] = useUpdatePropertyMutation()

  const patchProperty = async () => {
    const response = await updateProperty({
      id: property.property_id,
      name: values.name,
      description: values.description,
      price: values.price,
      surface: values.surface,
      land_size: values.land_size,
      bathroom: values.bathroom,
      kitchen: values.kitchen,
      toilet: values.toilet,
      bedroom: values.bedroom,
      elevator: values.elevator,
      balcony: values.balcony,
      terrace: values.terrace,
      cellar: values.cellar,
      parking: values.parking,
      number_room: values.number_room,
      pool: values.pool,
      caretaker: values.caretaker,
      fiber_deployed: values.fiber_deployed,
      duplex: values.duplex,
      top_floor: values.top_floor,
      garage: values.garage,
      work_done: values.work_done,
      life_annuity: values.life_annuity,
      ground_floor: values.ground_floor,
      land_size_1: values.land_size_1,
      garden: values.garden,
      updated_at: new Date(),
      dpe: values.dpe,
    }).unwrap()

    if (response.error) return false

    return true
  }
  return (
    property && (
      <>
        <div className='w-full h-[250px] p-1 rounded-md'>
          <img
            src={`https://back-rently.mathieudacheux.fr/public/img/property/${property?.property_id}/${images[0]}`}
            alt='property'
            key={`${property.property_id}-${images[0]}`}
            className='property-image h-full w-full rounded-md object-center'
          />
        </div>
        <div className='w-11/12'>
          <div className=' flex flex-col items-start my-4'>
            <Typography variant='h1' className='text-center'>
              Caractéristiques du bien
            </Typography>
            <div className='w-full flex justify-between'>
              <div className='w-full mt-4'>
                <FormikTextArea name='description' label='Description' />
              </div>
            </div>

            <div className='w-full flex justify-between'>
              <div className='w-[45%] mt-4 flex flex-col items-start'>
                <Typography variant='h1' className='text-center'>
                  Adresse
                </Typography>
                <div className='w-full mt-4'>
                  <FormikTextField name='way' label='Adresse' />
                </div>
                <div className='flex justify-between w-full'>
                  <div className='w-[45%] mt-4'>
                    <FormikTextField name='city' label='Ville' />
                  </div>

                  <div className='w-[45%] mt-4'>
                    <FormikTextField name='zipcode' label='Code postal' />
                  </div>
                </div>
              </div>
              <div className='w-1/2 mt-4'>
                <FormikTextArea name='note' label='Note' height={200} />
              </div>
            </div>
          </div>

          <div className='flex w-full justify-center'>
            <div className='flex w-1/2 justify-between'>
              <Button text='Précédent' onClick={() => setStep(1)} />
              <Button
                text='Sauvegarder'
                onClick={async () => {
                  const isSaved = await patchProperty()
                  if (!isSaved) return
                  dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
                }}
              />
              <Button
                text='Créer un brouillon'
                onClick={() =>
                  dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
                }
              />
            </div>
          </div>
        </div>
      </>
    )
  )
}
