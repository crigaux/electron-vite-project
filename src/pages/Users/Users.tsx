import { FormikProvider } from 'formik'
import useUserListFormik from './hooks/useUserListFormik'
import UsersManagement from './UsersManagement/UsersManagement'

export default function Users({
  handleAppointment,
  handleContact,
}: {
  handleAppointment: () => void
  handleContact: () => void
}): JSX.Element {
  const { usersFormik } = useUserListFormik()

  return (
    <FormikProvider value={usersFormik}>
      <UsersManagement
        handleAppointment={handleAppointment}
        handleContact={handleContact}
      />
    </FormikProvider>
  )
}
