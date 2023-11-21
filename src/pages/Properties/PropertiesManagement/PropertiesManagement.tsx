import { useFormikContext } from 'formik'
import { PropertySerializerRead } from '../../../api/index.ts'
import Searchbar from '../../../components/organisms/Searchbar.tsx'
import PropertiesList from '../components/PropertiesList.tsx'
import { PropertyFormikType } from '../type.ts'

export default function PropertiesManagement({
  properties,
  search,
}: {
  properties: PropertySerializerRead[]
  search: ({ search }: { search: string }) => void
}): JSX.Element {
  const { values } = useFormikContext<PropertyFormikType>()

  return (
    <div className='flex flex-col items-center h-full w-[calc(100vw-280px)] pt-5'>
      <div className='flex justify-center items-center flex-wrap md:flex-nowrap h-auto w-11/12 md:h-[80px]'>
        <div className='w-full flex justify-start'>
          <Searchbar
            onClick={() =>
              search({
                search: values.search,
              })
            }
          />
        </div>
      </div>
      <PropertiesList mapOpen properties={properties} />
    </div>
  )
}
