import { FormikProvider } from 'formik'
import useAgentFormik from './hooks/useAgentFormik'
import AgentDetailsManagementStep from './AgentDetailsManagement/AgentDetailsManagementStep'

export default function AgentDetails(): JSX.Element {
  const { agentFormik } = useAgentFormik()

  return (
    <div className='w-11/12 h-full'>
      <FormikProvider value={agentFormik}>
        <AgentDetailsManagementStep />
      </FormikProvider>
    </div>
  )
}
