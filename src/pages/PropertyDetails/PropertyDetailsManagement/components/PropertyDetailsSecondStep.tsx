import { useFormikContext } from 'formik'
import { PropertySerializerRead } from '../../../../api'
import { toast } from 'sonner'
import Button from '../../../../components/atoms/Button'
import Typography from '../../../../components/atoms/Typography'
import FormikTextArea from '../../../../components/molecules/core/FormikTextArea'
import FormikTextField from '../../../../components/molecules/core/FormikTextField'
import { useCreateAddressMutation } from '../../../../features/address/addressApi'
import {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
} from '../../../../features/property/propertyApi'
import { setSelectedPropertyId } from '../../../../features/property/propertySlice'
import { useAppDispatch } from '../../../../store/store'

export default function PropertyDetailsSecondStep({
  property,
  images,
  setStep,
  selectedImage,
  openModal,
}: Readonly<{
  property: PropertySerializerRead
  images: string[]
  setStep: (step: number) => void
  selectedImage: number
  openModal: () => void
}>) {
  const { values } = useFormikContext<PropertySerializerRead>()
  const dispatch = useAppDispatch()

  const [updateProperty] = useUpdatePropertyMutation()
  const [createProperty] = useCreatePropertyMutation()
  const [createAddress] = useCreateAddressMutation()

  const currentAgency = JSON.parse(
    localStorage.getItem('user') as string,
  ).agency_id

  const patchProperty = async ({ draft }: { draft: boolean }) => {
    const response = (await updateProperty({
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
      status_id: values.status_id,
      ground_floor: values.ground_floor,
      land_size_1: values.land_size_1,
      garden: values.garden,
      updated_at: new Date(),
      dpe: values.dpe,
      year_construction: values.year_construction,
      draft,
    })) as any

    if (response.error) {
      toast.error(response.error.data.message)
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

  const postProperty = async ({ draft }: { draft: boolean }) => {
    const coordonates = await getCoordonates()

    const addressResponse = await createAddress({
      address: values.way,
      city: values.city,
      zipcode: values.zipcode,
      longitude: coordonates?.[0] ?? 0,
      latitude: coordonates?.[1] ?? 0,
    }).unwrap()

    if (!addressResponse) return false

    const response = (await createProperty({
      name: values.name,
      description: values.description,
      price: Number(values.price),
      surface: values.surface,
      land_size: values.land_size,
      bathroom: Number(values.bathroom),
      kitchen: Number(values.kitchen),
      toilet: Number(values.toilet),
      bedroom: Number(values.bedroom),
      elevator: values.elevator ?? false,
      balcony: values.balcony ?? false,
      terrace: values.terrace ?? false,
      cellar: values.cellar ?? false,
      parking: values.parking ?? false,
      number_room: Number(values.number_room),
      pool: values.pool ?? false,
      caretaker: values.caretaker ?? false,
      fiber_deployed: values.fiber_deployed ?? false,
      duplex: values.duplex ?? false,
      top_floor: values.top_floor ?? false,
      garage: values.garage ?? false,
      work_done: values.work_done ?? false,
      life_annuity: values.life_annuity ?? false,
      ground_floor: values.ground_floor ?? false,
      land_size_1: values.land_size_1 ?? 0,
      garden: values.garden ?? false,
      updated_at: new Date(),
      dpe: Number(values.dpe),
      year_construction: values.year_construction,
      property_type: Number(values.property_type),
      owner_id: values.owner_id,
      address_id: addressResponse.address_id,
      status_id: values.status_id,
      agency_id: currentAgency,
      draft,
    })) as any

    if (response.error) {
      toast.error(response.error.data.message)
      return false
    }

    return true
  }

  return (
    <>
      <div className='w-full h-[250px] p-1 rounded-md' onClick={openModal}>
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
      <div className='w-11/12'>
        <div className=' flex flex-col items-start my-4'>
          <Typography variant='h1' className='text-center'>
            Caractéristiques du bien
          </Typography>
          <div className='w-full flex justify-between'>
            <div className='w-full mt-4'>
              <FormikTextArea
                name='description'
                label='Description'
                placeholder='Petite maison en plein centre ville...'
              />
            </div>
          </div>

          <div className='w-full flex justify-between'>
            <div className='w-[45%] mt-4 flex flex-col items-start'>
              <Typography variant='h1' className='text-center'>
                Adresse
              </Typography>
              <div className='w-full mt-4'>
                <FormikTextField
                  name='way'
                  label='Adresse'
                  placeholder='12 rue de la paix'
                />
              </div>
              <div className='flex justify-between w-full'>
                <div className='w-[45%] mt-4'>
                  <FormikTextField
                    name='zipcode'
                    label='Code postal'
                    placeholder='75000'
                  />
                </div>
                <div className='w-[45%] mt-4'>
                  <FormikTextField
                    name='city'
                    label='Ville'
                    placeholder='Paris'
                  />
                </div>
              </div>
            </div>
            <div className='w-1/2 mt-4'>
              <FormikTextArea
                name='note'
                label='Note'
                height={200}
                placeholder='Bonne isolation...'
              />
            </div>
          </div>
        </div>

        <div className='flex w-full justify-center mt-2'>
          <div className='flex w-1/3 justify-between'>
            <Button text='Précédent' onClick={() => setStep(1)} />
            <Button
              text='Sauvegarder'
              onClick={async () => {
                const isSaved = property.property_id
                  ? await patchProperty({ draft: false })
                  : await postProperty({ draft: false })
                if (!isSaved) return
                dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
              }}
            />
            <Button
              text='Brouillon'
              onClick={async () => {
                const isSaved = property.property_id
                  ? await patchProperty({ draft: true })
                  : await postProperty({ draft: true })
                if (!isSaved) return
                dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
