import { FormikProvider } from 'formik'
import AgentsManagement from './AgentsManagement/AgentsManagement'
import useAgentListFormik from './hooks/useAgentListFormik'

export default function Agents({
  handleAppointment,
  handleContact,
}: {
  handleAppointment: () => void
  handleContact: () => void
}): JSX.Element {
  const { agentsFormik } = useAgentListFormik()

  return (
    <FormikProvider value={agentsFormik}>
      <AgentsManagement
        handleAppointment={handleAppointment}
        handleContact={handleContact}
      />
    </FormikProvider>
  )
}
