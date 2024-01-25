import { useFormik } from 'formik'
import { useCallback, useEffect, useMemo } from 'react'
import { PropertySerializerRead } from '../../../api/index.ts'
import { useLazyGetPropertyByIdQuery } from '../../../features/property/propertyApi.ts'
import { selectedPropertyId } from '../../../features/property/propertySlice.ts'
import { useAppSelector } from '../../../store/store.ts'

export default function usePropertyFormik() {
  // get id from URI path
  const propertyId = useAppSelector(selectedPropertyId) as number

  const [triggerPoperty, propertyQuery] = useLazyGetPropertyByIdQuery({})

  useEffect(() => {
    if (propertyId === -1) return
    if (propertyId) {
      triggerPoperty(Number(propertyId))
    }
  }, [propertyId])

  const initialValues = useMemo(() => {
    if (propertyId === -1) return {}

    if (propertyQuery.data) {
      return propertyQuery.data
    }
  }, [propertyQuery.data, propertyId]) as PropertySerializerRead

  const propertyFormik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: useCallback(async () => null, []),
  })

  return { propertyFormik }
}
