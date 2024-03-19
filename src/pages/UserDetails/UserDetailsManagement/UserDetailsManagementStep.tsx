import { useFormikContext } from 'formik'
import { UserSerializerRead } from '../../../api'
import UserDetailsDetailsManagement from './UserDetailsManagement'

export default function UserDetailsManagementStep() {
  const { values } = useFormikContext<UserSerializerRead>()

  return (
    <div className='flex items-center flex-col'>
      <UserDetailsDetailsManagement user={values} />
    </div>
  )
}
