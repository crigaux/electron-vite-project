import { useFormikContext } from 'formik'
import { PropertySerializerRead } from '../../../api/index.ts'
import Searchbar from '../../../components/organisms/Searchbar.tsx'
import PropertiesList from '../components/PropertiesList.tsx'
import { PropertyFormikType } from '../type.ts'
import Button from '../../../components/atoms/Button.tsx'
import { useAppDispatch } from '../../../store/store.ts'
import { setSelectedPropertyId } from '../../../features/property/propertySlice.ts'

export default function PropertiesManagement({
  properties,
  search,
  isDraft,
  isSold,
  isRented,
  setIsDraft,
  setIsSold,
  setIsRented,
}: {
  properties: PropertySerializerRead[]
  search: ({ search }: { search: string }) => void
  isDraft: boolean
  isSold: boolean
  isRented: boolean
  setIsDraft: (e: boolean) => void
  setIsSold: (e: boolean) => void
  setIsRented: (e: boolean) => void
}): JSX.Element {
  const { values } = useFormikContext<PropertyFormikType>()

  const dispatch = useAppDispatch()

  return (
    <div className='flex flex-col items-center h-full w-[calc(100vw-280px)] pt-5 overflow-auto'>
      <div className='flex justify-center flex-col items-center flex-wrap md:flex-nowrap h-auto w-11/12 md:h-[80px]'>
        <div className='w-full flex justify-center'>
          <Searchbar
            name='search'
            onClick={() =>
              search({
                search: values.search,
              })
            }
          />
          <Button
            text='Ajouter'
            className='ml-5'
            onClick={() =>
              dispatch(setSelectedPropertyId({ selectedPropertyId: -1 }))
            }
          />
        </div>
        <div className='flex flex-row my-2'>
          <div>
            <label
              className='label cursor-pointer flex justify-start 
            items-center w-fit-content p-0 mr-2'
            >
              <input
                checked={isDraft}
                onChange={() => setIsDraft(!isDraft)}
                type='checkbox'
                className='checkbox checkbox-primary mr-2'
              />
              <span className='text-neutral-900 font-normal'>Brouillon</span>
            </label>
          </div>
          <div>
            <label
              className='label cursor-pointer flex justify-start 
            items-center w-fit-content p-0 mr-2'
            >
              <input
                checked={isRented}
                onChange={() => setIsRented(!isRented)}
                type='checkbox'
                className='checkbox checkbox-primary mr-2'
              />
              <span className='text-neutral-900 font-normal'>Location</span>
            </label>
          </div>
          <div>
            <label
              className='label cursor-pointer flex justify-start 
            items-center w-fit-content p-0'
            >
              <input
                checked={isSold}
                onChange={() => setIsSold(!isSold)}
                type='checkbox'
                className='checkbox checkbox-primary mr-2'
              />
              <span className='text-neutral-900 font-normal'>Vente</span>
            </label>
          </div>
        </div>
      </div>
      <PropertiesList mapOpen properties={properties} />
    </div>
  )
}
