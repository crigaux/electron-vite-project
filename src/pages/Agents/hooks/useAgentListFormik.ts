import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'

export default function useAgentListFormik() {
  const initialValues = useMemo(
    () => ({
      searchAgent: '',
    }),
    [],
  )

  const agentsFormik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: useCallback(async () => null, []),
  })

  return { agentsFormik }
}
