import { useFormikContext } from 'formik'
import { UserSerializerRead } from '../../../api'
import AgentDetailsDetailsManagement from './AgentDetailsDetailsManagement'

export default function AgentDetailsManagementStep() {
  const { values } = useFormikContext<UserSerializerRead>()

  return (
    <div className='flex items-center flex-col'>
      <AgentDetailsDetailsManagement agent={values} />
    </div>
  )
}
