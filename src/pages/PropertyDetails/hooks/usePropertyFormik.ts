import { useCallback, useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import { useLazyGetPropertyByIdQuery } from '../../../features/property/propertyApi.ts'
import { PropertySerializerRead } from '../../../api/index.ts'
import { useAppSelector } from '../../../store/store.ts'
import { selectedPropertyId } from '../../../features/property/propertySlice.ts'

export default function usePropertyFormik() {
  // get id from URI path
  const property_id = useAppSelector(selectedPropertyId) as number

  const [triggerPoperty, propertyQuery] = useLazyGetPropertyByIdQuery({})

  useEffect(() => {
    if (property_id) {
      triggerPoperty(Number(property_id))
    }
  }, [property_id])

  const initialValues = useMemo(() => {
    if (propertyQuery.data) {
      return propertyQuery.data
    }
  }, [propertyQuery.data]) as PropertySerializerRead

  const propertyFormik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: useCallback(async () => null, []),
  })

  return { propertyFormik }
}
