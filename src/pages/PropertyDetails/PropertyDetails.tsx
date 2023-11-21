import { FormikProvider } from 'formik'
import usePropertyFormik from './hooks/usePropertyFormik.ts'
import PropertyDetailsManagementStep from './PropertyDetailsManagement/PropertyDetailsManagementStep.tsx'

export default function PropertyDetails(): JSX.Element {
  const { propertyFormik } = usePropertyFormik()

  return (
    <div className='w-11/12 h-full'>
      <FormikProvider value={propertyFormik}>
        <PropertyDetailsManagementStep />
      </FormikProvider>
    </div>
  )
}
