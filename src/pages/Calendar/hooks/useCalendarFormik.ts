import { useFormik } from 'formik'
import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

export default function useCalendarFormik() {
  const initialValues = useMemo(
    () => ({
      property_id: null,
      tag_id: null,
      startDate: '',
      endDate: '',
      note: '',
    }),
    [],
  )

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        tag_id: Yup.number().required(
          'Veuillez sélectionner un type de rendez-vous',
        ),
        startDate: Yup.string().required(
          'Veuillez sélectionner une date de début',
        ),
        endDate: Yup.string().required('Veuillez sélectionner une date de fin'),
      }),
    [],
  )

  const calendarFormik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema,
    onSubmit: useCallback(async () => null, []),
  })

  return { calendarFormik }
}
