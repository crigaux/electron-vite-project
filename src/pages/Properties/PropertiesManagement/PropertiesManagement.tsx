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
}: {
  properties: PropertySerializerRead[]
  search: ({ search }: { search: string }) => void
}): JSX.Element {
  const { values } = useFormikContext<PropertyFormikType>()

  const dispatch = useAppDispatch()

  return (
    <div className='flex flex-col items-center h-full w-[calc(100vw-280px)] overflow-auto'>
      <div className='flex justify-center items-center flex-wrap md:flex-nowrap h-auto w-11/12 md:h-[80px]'>
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
      </div>
      <PropertiesList mapOpen properties={properties} />
    </div>
  )
}
