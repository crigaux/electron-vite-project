import { UserSerializerRead } from '../../../api/index.ts'
import AgentDetailsFirstStep from './components/AgentDetailsFirstStep.tsx'

export default function AgentDetailsDetailsManagement({
  agent,
}: {
  agent: UserSerializerRead
}): JSX.Element {
  return agent && <AgentDetailsFirstStep agent={agent} />
}
