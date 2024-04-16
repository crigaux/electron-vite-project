import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'

export default function useSaleOrLocationFormik() {
  const initialValues = useMemo(
    () => ({
      is_sale: true,
    }),
    [],
  )

  const saleOrLocationFormik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: useCallback(async () => null, []),
  })

  return { saleOrLocationFormik }
}
