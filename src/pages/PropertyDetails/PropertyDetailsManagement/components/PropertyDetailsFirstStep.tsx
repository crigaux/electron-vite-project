import { PropertySerializerRead } from '../../../../api'
import Button from '../../../../components/atoms/Button'
import Typography from '../../../../components/atoms/Typography'
import FormikCheckbox from '../../../../components/molecules/core/FormikCheckbox'
import FormikSelect from '../../../../components/molecules/core/FormikSelect'
import FormikTextField from '../../../../components/molecules/core/FormikTextField'
import { setSelectedPropertyId } from '../../../../features/property/propertySlice'
import { useGetPropertyTypesQuery } from '../../../../features/propertyType/propertyTypeApi'
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
}: {
  property: PropertySerializerRead
  images: string[]
  setStep: (step: number) => void
}) {
  const dispatch = useAppDispatch()
  console.log(property)

  const property_types = useGetPropertyTypesQuery({}).data || []

  return (
    images &&
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
        <div className='w-11/12 flex flex-col items-start my-4'>
          <Typography variant='h1' className='text-center'>
            Caractéristiques du bien
          </Typography>
          <div className='mt-4 w-full'>
            <FormikTextField name='name' label='Titre du bien' />
          </div>
          <div className=' flex flex-col justify-center w-full h-full pt-5 mt-4'>
            <div className='flex justify-between mb-4'>
              <div className='w-[22%]'>
                <FormikSelect
                  options={property_types}
                  name='property_type'
                  label='Type de logement'
                />
              </div>
              <div className='w-[22%]'>
                <FormikSelect
                  options={numberList}
                  name='number_room'
                  label='Nombre de pièces'
                />
              </div>
              <div className='w-[22%]'>
                <FormikTextField name='price' label='Prix' />
              </div>
              <div className='w-[22%]'>
                <FormikTextField name='surface' label='Surface' />
              </div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='w-[22%]'>
                <FormikSelect
                  options={numberList}
                  name='bedroom'
                  label='Nombre de chambres'
                />
              </div>
              <div className='w-[22%]'>
                <FormikSelect
                  options={numberList}
                  name='bathroom'
                  label='Nombre de salles de bain'
                />
              </div>
              <div className='w-[22%]'>
                <FormikSelect
                  options={numberList}
                  name='toilet'
                  label='Nomber de toilettes'
                />
              </div>
              <div className='w-[22%]'>
                <FormikSelect
                  options={numberList}
                  name='kitchen'
                  label='Nombre de cuisines'
                />
              </div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='w-[22%]'>
                <FormikSelect
                  options={yearList}
                  name='year'
                  label='Année de construction'
                />
              </div>
              <div className='w-[22%]'>
                <FormikSelect options={dpeList} name='dpe' label='DPE' />
              </div>
              <div className='w-[22%]'>
                <FormikSelect
                  options={surfaceList}
                  name='land_size'
                  label='Taille du terrain'
                />
              </div>
              <div className='w-[22%]' />
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
                  <FormikCheckbox
                    name='top_floor'
                    label='properties.lastFloor'
                  />
                </div>
                <div className={`my-3 whitespace-nowrap mx-1`}>
                  <FormikCheckbox
                    name='life_annuity'
                    label='properties.lifeAnnuity'
                  />
                </div>
                <div className={`my-3 whitespace-nowrap mx-1`}>
                  <FormikCheckbox
                    name='work_done'
                    label='properties.workDone'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-2/12 justify-between'>
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
  )
}
