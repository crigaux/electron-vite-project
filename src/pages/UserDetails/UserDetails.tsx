import { FormikProvider } from 'formik'
import useUserFormik from './hooks/useUserFormik'
import UserDetailsManagementStep from './UserDetailsManagement/UserDetailsManagementStep'

export default function UserDetails(): JSX.Element {
  const { userFormik } = useUserFormik()

  return (
    <div className='w-11/12 h-full'>
      <FormikProvider value={userFormik}>
        <UserDetailsManagementStep />
      </FormikProvider>
    </div>
  )
}
