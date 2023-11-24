import { FormikProvider } from 'formik'
import useAgentListFormik from './hooks/useAgentListFormik'
import AgentsManagement from './AgentsManagement/AgentsManagement'

export default function Agents(): JSX.Element {
  const { agentsFormik } = useAgentListFormik()

  return (
    <FormikProvider value={agentsFormik}>
      <AgentsManagement />
    </FormikProvider>
  )
}
