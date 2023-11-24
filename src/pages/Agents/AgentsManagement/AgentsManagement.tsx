import { useMemo } from 'react'
import { useFormikContext } from 'formik'
import Searchbar from '../../../components/organisms/Searchbar'
import AgentCard from '../components/AgentCard'
import { RoleSerializerRead, UserSerializerRead } from '../../../api'
import { useGetUserByFilterQuery } from '../../../features/user/userApi'
import { useGetRolesQuery } from '../../../features/role/roleApi'

export default function AgentsManagement(): JSX.Element {
  const { values } = useFormikContext<{ searchAgent: string }>()

  const currentAgency = JSON.parse(
    localStorage.getItem('user') as string,
  ).agency_id

  const roles = useGetRolesQuery({}).data || []
  const agentRole = roles.find(
    (role: RoleSerializerRead) => role.name === 'Agent',
  )

  const agents =
    useGetUserByFilterQuery({ role: agentRole, agency_id: currentAgency })
      .data || []

  const filteredAgents = useMemo(() => {
    if (values.searchAgent?.length < 3) return agents

    return agents.filter(
      (agent: UserSerializerRead) =>
        agent?.name?.toLowerCase()?.includes(values.searchAgent?.toLowerCase()),
    )
  }, [values.searchAgent, agents])
  const handleSearch = ({ search }: { search: string }) => {
    return agents.filter(
      (agent: UserSerializerRead) =>
        agent?.name?.toLowerCase()?.includes(search.toLowerCase()),
    )
  }

  return (
    <div className='w-full h-[calc(100vh-150px)] pt-4'>
      <div className='flex justify-center items-center flex-wrap md:flex-nowrap h-auto w-11/12 md:h-[80px]'>
        <div className='w-full flex justify-center'>
          <Searchbar
            name='searchAgent'
            onClick={() => handleSearch({ search: values.searchAgent })}
          />
        </div>
      </div>
      <div className='flex flex-col gap-4 items-center w-full h-full overflow-scroll no-scrollbar py-4'>
        {filteredAgents.map((agent: UserSerializerRead) => (
          <div key={agent.user_id} className='w-11/12'>
            <AgentCard agent={agent} />
          </div>
        ))}
      </div>
    </div>
  )
}
