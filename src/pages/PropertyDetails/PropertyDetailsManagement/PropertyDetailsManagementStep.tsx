import { useFormikContext } from 'formik'
import { PropertySerializerRead } from '../../../api/index.ts'
import PropertyDetailsDetailsManagement from './PropertyDetailsManagement.tsx'

export default function PropertyDetailsManagementStep() {
  const { values } = useFormikContext<PropertySerializerRead>()

  return (
    <div className='flex items-center flex-col'>
      <PropertyDetailsDetailsManagement property={values} />
    </div>
  )
}
