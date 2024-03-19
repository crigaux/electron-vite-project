import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'

export default function useUserListFormik() {
  const initialValues = useMemo(
    () => ({
      searchUser: '',
    }),
    [],
  )

  const usersFormik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: useCallback(async () => null, []),
  })

  return { usersFormik }
}
