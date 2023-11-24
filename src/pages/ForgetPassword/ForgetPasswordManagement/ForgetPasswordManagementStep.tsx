import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { ForgetPasswordFormik } from '../types.ts'
import { toast } from 'sonner'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import ForgetPasswordManagement from './ForgetPasswordManagement.tsx'
import {
  useLazyGetUserByFilterQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../../features/user/userApi.ts'
import { useResetPasswordMailMutation } from '../../../features/mail/mailApi.ts'
import useFormikValidator from '../../../hooks/useFormikValidator.ts'
import { JWT } from '../types.ts'
import { APP_ROUTES } from '../../../routes/routes.ts'

export default function ForgetPasswordManagementStep(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const formikContext = useFormikContext<ForgetPasswordFormik>()
  const formikValidator = useFormikValidator(formikContext)
  const { values } = formikContext

  const [getUserByFilter] = useLazyGetUserByFilterQuery()
  const [getUserById] = useLazyGetUserByIdQuery()
  const [updateUser] = useUpdateUserMutation()
  const [resetPasswordMail] = useResetPasswordMailMutation()

  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  const isToken = token ? true : false

  const sendResetPasswordMail = async () => {
    const formIsValid = await formikValidator(values)

    if (!formIsValid) return false

    const result: any = await getUserByFilter({
      mail: values.mail,
    })

    if (!result?.data || result?.error) {
      toast.error(result?.error?.data?.message, {
        position: 'bottom-right',
      })
      return false
    }

    await resetPasswordMail({
      id: result?.data[0]?.user_id,
    })

    toast.success(t('connection.emailValidation'), {
      position: 'bottom-right',
    })
    return true
  }

  const updatePassword = async () => {
    const formIsValid = await formikValidator(values)

    if (!formIsValid) return false

    if (!token) {
      toast.error(t('connection.invalidToken'), {
        position: 'bottom-right',
      })
      return false
    }

    const decodedToken: JWT = jwtDecode(token)

    if (Date.now() >= decodedToken.exp * 1000) {
      toast.error(t('connection.expiredToken'), {
        position: 'bottom-right',
      })
      return false
    }

    const result: any = await getUserById(decodedToken.user_id)

    if (!result?.data || result?.error) {
      toast.error(result?.error?.data?.message, {
        position: 'bottom-right',
      })
      return false
    }

    if (result?.data?.user_id !== decodedToken.user_id) {
      toast.error(t('connection.invalidToken'), {
        position: 'bottom-right',
      })
      return false
    }

    const update: any = await updateUser({
      id: decodedToken.user_id,
      password: values.passwordOne,
    })

    if (!update?.data || update?.error) {
      toast.error(update?.error?.data?.message, {
        position: 'bottom-right',
      })
      return false
    }

    toast.success(t('connection.passwordUpdated'), {
      position: 'bottom-right',
    })

    navigate(APP_ROUTES.LOGIN)

    return true
  }

  return (
    <>
      <ForgetPasswordManagement
        sendResetEmail={sendResetPasswordMail}
        updatePassword={updatePassword}
        token={isToken}
      />
    </>
  )
}
