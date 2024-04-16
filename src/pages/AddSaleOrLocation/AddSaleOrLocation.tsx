import { FormikProvider } from 'formik'
import AddSaleOrLocationManagementStep from './AddSaleOrLocationManagement/AddSaleOrLocationManagementStep'
import useSaleOrLocationFormik from './hooks/useSaleOrLocationFormik'

export default function AddSalesOrLocation({
  navigateToProperties,
}: {
  navigateToProperties: () => void
}) {
  const { saleOrLocationFormik } = useSaleOrLocationFormik()

  return (
    <FormikProvider value={saleOrLocationFormik}>
      <AddSaleOrLocationManagementStep
        navigateToProperties={navigateToProperties}
      />
    </FormikProvider>
  )
}
