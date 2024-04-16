import { useFormikContext } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { RoleSerializerRead, UserSerializerRead } from '../../../api'
import Searchbar from '../../../components/organisms/Searchbar'
import { setSelectedConversationId } from '../../../features/messages/messageSlice'
import { useGetRolesQuery } from '../../../features/role/roleApi'
import {
  useGetUserByFilterQuery,
  useLazyGetUserByFilterQuery,
} from '../../../features/user/userApi'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import AgentCard from '../components/AgentCard'
import Button from '../../../components/atoms/Button'
import {
  selectedUserId,
  setSelectedAgentId,
} from '../../../features/user/userSlice'

export default function AgentsManagement({
  handleAppointment,
  handleContact,
}: {
  handleAppointment: () => void
  handleContact: () => void
}): JSX.Element {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectedUserId) as number

  const { values } = useFormikContext<{ searchAgent: string }>()

  const [users, setUsers] = useState<UserSerializerRead[]>([])

  const [triggerGetUsersQuery, getUsersQueryResults] =
    useLazyGetUserByFilterQuery()

  const currentUser = JSON.parse(
    localStorage.getItem('user') ?? '{}',
  ) as UserSerializerRead

  const currentAgency = JSON.parse(
    localStorage.getItem('user') as string,
  ).agency_id

  const roles = useGetRolesQuery({}).data || []
  const agentRole = roles.find(
    (role: RoleSerializerRead) => role.name === 'AGENT',
  )?.role_id

  useEffect(() => {
    triggerGetUsersQuery({ role: agentRole, agency_id: currentAgency })
  }, [agentRole, currentAgency, userId])

  useEffect(() => {
    if (getUsersQueryResults.data) {
      setUsers(getUsersQueryResults.data)
    }
  }, [getUsersQueryResults.data])

  const filteredAgents = useMemo(() => {
    if (values.searchAgent?.length < 3) return users

    return users.filter((agent: UserSerializerRead) => {
      const fullName = `${agent?.name} ${agent?.firstname}`
      return fullName.toLowerCase().includes(values.searchAgent.toLowerCase())
    })
  }, [values.searchAgent, users])

  const handleSearch = ({ search }: { search: string }) => {
    return users.filter((agent: UserSerializerRead) => {
      const fullName = `${agent?.name} ${agent?.firstname}`
      return fullName.toLowerCase().includes(search.toLowerCase())
    })
  }

  return (
    <div className='w-full h-[calc(100vh-150px)] pt-4'>
      <div className='flex justify-center items-center flex-wrap md:flex-nowrap h-auto w-11/12 md:h-[80px]'>
        <div className='w-full flex justify-center'>
          <Searchbar
            name='searchAgent'
            onClick={() => handleSearch({ search: values.searchAgent })}
          />
          <Button
            text='Ajouter'
            className='ml-5'
            onClick={() =>
              dispatch(setSelectedAgentId({ selectedAgentId: -1 }))
            }
          />
        </div>
      </div>
      <div className='flex flex-col gap-4 items-center w-full h-full overflow-scroll no-scrollbar py-4'>
        {filteredAgents
          .filter((agent) => agent?.user_id !== currentUser?.user_id)
          .map((agent: UserSerializerRead) => (
            <div key={agent.user_id} className='w-11/12'>
              <AgentCard
                agent={agent}
                handleAppointment={handleAppointment}
                handleContact={() => {
                  dispatch(
                    setSelectedConversationId({
                      selectedConversationId: agent.user_id as number,
                    }),
                  )
                  handleContact()
                }}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
