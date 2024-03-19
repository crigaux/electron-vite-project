import { useFormik } from 'formik'
import { useCallback, useEffect, useMemo } from 'react'
import * as Yup from 'yup'
import { UserSerializerRead } from '../../../api/index.ts'
import { useAppSelector } from '../../../store/store.ts'
import { useLazyGetUserByIdQuery } from '../../../features/user/userApi.ts'
import { selectedUserId } from '../../../features/user/userSlice.ts'

export default function useUserFormik() {
  // get id from URI path
  const userId = useAppSelector(selectedUserId) as number

  const [triggerUser, userQuery] = useLazyGetUserByIdQuery({})

  useEffect(() => {
    if (userId === -1) return
    if (userId) {
      triggerUser(Number(userId))
    }
  }, [userId])

  const initialValues = useMemo(() => {
    if (userId === -1) return {}

    if (userQuery.data) {
      return userQuery.data
    }
  }, [userQuery.data, userId]) as UserSerializerRead

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Champ obligatoire'),
    firstname: Yup.string().required('Champ obligatoire'),
    mail: Yup.string().email('Email invalide').required('Champ obligatoire'),
    way: Yup.string().required('Champ obligatoire'),
    zipcode: Yup.string().required('Champ obligatoire'),
    city: Yup.string().required('Champ obligatoire'),
  })

  const userFormik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: useCallback(async () => null, []),
  })

  return { userFormik }
}
